
import { supabase } from "@/integrations/supabase/client";

export const getEntityAnalytics = async (dateRange: string = "7d") => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  // Calculate date filter
  const daysAgo = parseInt(dateRange.replace('d', ''));
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - daysAgo);

  try {
    // Get entity analytics
    const { data: analyticsData, error } = await supabase
      .from('entity_analytics')
      .select(`
        *,
        entities!inner(
          name,
          display_name,
          category,
          user_id
        )
      `)
      .gte('date_tracked', startDate.toISOString().split('T')[0])
      .or(`entities.user_id.eq.${user.id},entities.entity_type.eq.system`);

    if (error) throw error;

    // Transform data for analytics
    const entities = analyticsData?.map(item => ({
      id: item.entity_id,
      entity_name: item.entities.name,
      entity_display_name: item.entities.display_name,
      usage_count: item.usage_count || 0,
      accuracy_score: item.accuracy_score || 0,
      last_used_at: item.last_used_at || item.created_at,
      category: item.entities.category || 'uncategorized'
    })) || [];

    // Calculate aggregated metrics
    const totalDetections = entities.reduce((sum, e) => sum + e.usage_count, 0);
    const averageAccuracy = entities.length > 0 
      ? entities.reduce((sum, e) => sum + e.accuracy_score, 0) / entities.length 
      : 0;

    // Group by category
    const categoryMap = new Map();
    entities.forEach(entity => {
      const category = entity.category;
      categoryMap.set(category, (categoryMap.get(category) || 0) + entity.usage_count);
    });

    const topCategories = Array.from(categoryMap.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);

    return {
      data: {
        entities: entities.sort((a, b) => b.usage_count - a.usage_count),
        totalDetections,
        averageAccuracy,
        topCategories
      },
      error: null
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return { data: null, error };
  }
};

export const trackEntityUsage = async (entityId: string) => {
  const today = new Date().toISOString().split('T')[0];
  
  // Check if there's an existing record for today
  const { data: existing } = await supabase
    .from('entity_analytics')
    .select('*')
    .eq('entity_id', entityId)
    .eq('date_tracked', today)
    .single();

  if (existing) {
    // Update existing record
    return await supabase
      .from('entity_analytics')
      .update({
        usage_count: (existing.usage_count || 0) + 1,
        last_used_at: new Date().toISOString()
      })
      .eq('id', existing.id);
  } else {
    // Create new record
    return await supabase
      .from('entity_analytics')
      .insert({
        entity_id: entityId,
        usage_count: 1,
        accuracy_score: 0.8, // Default accuracy
        last_used_at: new Date().toISOString(),
        date_tracked: today
      });
  }
};
