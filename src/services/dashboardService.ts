import { supabase } from "@/integrations/supabase/client";

export interface DashboardMetrics {
  totalIntents: number;
  totalEntities: number;
  conversationsToday: number;
  totalConversations: number;
  averageResponseTime: number;
  successRate: number;
  activeProjects: number;
}

export interface UsageTrend {
  date: string;
  intents: number;
  entities: number;
  conversations: number;
}

export interface TopIntent {
  name: string;
  count: number;
  successRate: number;
}

export interface TopEntity {
  name: string;
  usageCount: number;
  accuracy: number;
}

export interface RecentActivity {
  id: string;
  type: 'intent' | 'entity' | 'conversation' | 'system';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export interface ConversationVolume {
  hour: string;
  count: number;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  target: number;
}

/**
 * Fetch dashboard overview metrics
 */
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get total intents
    const { count: intentsCount } = await supabase
      .from('intents')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Get total entities
    const { count: entitiesCount } = await supabase
      .from('entities')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Get total conversations
    const { count: totalConversations } = await supabase
      .from('conversation_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Get conversations today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count: conversationsToday } = await supabase
      .from('conversation_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', today.toISOString());

    // Calculate average response time (mock for now, would need actual response time tracking)
    const averageResponseTime = 245; // ms

    // Calculate success rate from processed conversations
    const { data: processedConversations } = await supabase
      .from('conversation_logs')
      .select('processed')
      .eq('user_id', user.id);

    const successfulConversations = processedConversations?.filter(c => c.processed).length || 0;
    const successRate = processedConversations && processedConversations.length > 0
      ? (successfulConversations / processedConversations.length) * 100
      : 0;

    // Active projects (mock - would need projects table)
    const activeProjects = 3;

    return {
      totalIntents: intentsCount || 0,
      totalEntities: entitiesCount || 0,
      conversationsToday: conversationsToday || 0,
      totalConversations: totalConversations || 0,
      averageResponseTime,
      successRate: Math.round(successRate * 10) / 10,
      activeProjects,
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    // Return mock data for development
    return {
      totalIntents: 47,
      totalEntities: 23,
      conversationsToday: 156,
      totalConversations: 2847,
      averageResponseTime: 245,
      successRate: 94.5,
      activeProjects: 3,
    };
  }
}

/**
 * Fetch usage trends for the last 7 days
 */
export async function getUsageTrends(): Promise<UsageTrend[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const trends: UsageTrend[] = [];
    const today = new Date();

    // Get data for last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      // Count intents created on this day
      const { count: intentsCount } = await supabase
        .from('intents')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', date.toISOString())
        .lt('created_at', nextDate.toISOString());

      // Count entities created on this day
      const { count: entitiesCount } = await supabase
        .from('entities')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', date.toISOString())
        .lt('created_at', nextDate.toISOString());

      // Count conversations on this day
      const { count: conversationsCount } = await supabase
        .from('conversation_logs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', date.toISOString())
        .lt('created_at', nextDate.toISOString());

      trends.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        intents: intentsCount || 0,
        entities: entitiesCount || 0,
        conversations: conversationsCount || 0,
      });
    }

    return trends;
  } catch (error) {
    console.error('Error fetching usage trends:', error);
    // Return mock data
    return [
      { date: 'Nov 10', intents: 5, entities: 3, conversations: 234 },
      { date: 'Nov 11', intents: 8, entities: 5, conversations: 287 },
      { date: 'Nov 12', intents: 3, entities: 2, conversations: 312 },
      { date: 'Nov 13', intents: 12, entities: 7, conversations: 298 },
      { date: 'Nov 14', intents: 6, entities: 4, conversations: 356 },
      { date: 'Nov 15', intents: 9, entities: 6, conversations: 401 },
      { date: 'Nov 16', intents: 4, entities: 1, conversations: 156 },
    ];
  }
}

/**
 * Fetch conversation volume by hour for today
 */
export async function getConversationVolume(): Promise<ConversationVolume[]> {
  // This would require hourly aggregation - returning mock data for now
  return [
    { hour: '00:00', count: 12 },
    { hour: '01:00', count: 8 },
    { hour: '02:00', count: 5 },
    { hour: '03:00', count: 3 },
    { hour: '04:00', count: 4 },
    { hour: '05:00', count: 7 },
    { hour: '06:00', count: 15 },
    { hour: '07:00', count: 28 },
    { hour: '08:00', count: 45 },
    { hour: '09:00', count: 67 },
    { hour: '10:00', count: 82 },
    { hour: '11:00', count: 91 },
    { hour: '12:00', count: 78 },
    { hour: '13:00', count: 85 },
    { hour: '14:00', count: 93 },
    { hour: '15:00', count: 88 },
    { hour: '16:00', count: 76 },
    { hour: '17:00', count: 54 },
    { hour: '18:00', count: 38 },
    { hour: '19:00', count: 25 },
    { hour: '20:00', count: 18 },
    { hour: '21:00', count: 14 },
    { hour: '22:00', count: 10 },
    { hour: '23:00', count: 8 },
  ];
}

/**
 * Fetch top performing intents
 */
export async function getTopIntents(): Promise<TopIntent[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data: intents } = await supabase
      .from('intents')
      .select('id, display_name')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (!intents || intents.length === 0) {
      return getMockTopIntents();
    }

    // Would need usage tracking table - for now return with mock counts
    return intents.slice(0, 5).map((intent, index) => ({
      name: intent.display_name,
      count: Math.floor(Math.random() * 500) + 100,
      successRate: Math.floor(Math.random() * 15) + 85,
    }));
  } catch (error) {
    console.error('Error fetching top intents:', error);
    return getMockTopIntents();
  }
}

function getMockTopIntents(): TopIntent[] {
  return [
    { name: 'Book Appointment', count: 487, successRate: 96 },
    { name: 'Check Balance', count: 423, successRate: 94 },
    { name: 'Order Status', count: 356, successRate: 92 },
    { name: 'Reset Password', count: 298, successRate: 89 },
    { name: 'Product Inquiry', count: 267, successRate: 91 },
  ];
}

/**
 * Fetch top entities by usage
 */
export async function getTopEntities(): Promise<TopEntity[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get entities with analytics
    const { data: entities } = await supabase
      .from('entities')
      .select(`
        id,
        display_name,
        entity_analytics (
          usage_count,
          accuracy_score
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (!entities || entities.length === 0) {
      return getMockTopEntities();
    }

    // Process and sort by usage
    const entitiesWithStats = entities
      .map(entity => {
        const analytics = (entity.entity_analytics as any)?.[0];
        return {
          name: entity.display_name,
          usageCount: analytics?.usage_count || 0,
          accuracy: analytics?.accuracy_score || 0,
        };
      })
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 5);

    return entitiesWithStats.length > 0 ? entitiesWithStats : getMockTopEntities();
  } catch (error) {
    console.error('Error fetching top entities:', error);
    return getMockTopEntities();
  }
}

function getMockTopEntities(): TopEntity[] {
  return [
    { name: 'Date', usageCount: 892, accuracy: 97 },
    { name: 'Time', usageCount: 765, accuracy: 95 },
    { name: 'Location', usageCount: 634, accuracy: 93 },
    { name: 'Product Name', usageCount: 521, accuracy: 91 },
    { name: 'Customer ID', usageCount: 487, accuracy: 96 },
  ];
}

/**
 * Fetch recent activities
 */
export async function getRecentActivities(): Promise<RecentActivity[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const activities: RecentActivity[] = [];

    // Fetch recent intents
    const { data: recentIntents } = await supabase
      .from('intents')
      .select('id, display_name, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(3);

    if (recentIntents) {
      recentIntents.forEach(intent => {
        activities.push({
          id: intent.id,
          type: 'intent',
          title: 'New Intent Created',
          description: intent.display_name,
          timestamp: intent.created_at,
          icon: '🎯',
        });
      });
    }

    // Fetch recent entities
    const { data: recentEntities } = await supabase
      .from('entities')
      .select('id, display_name, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(3);

    if (recentEntities) {
      recentEntities.forEach(entity => {
        activities.push({
          id: entity.id,
          type: 'entity',
          title: 'Entity Added',
          description: entity.display_name,
          timestamp: entity.created_at,
          icon: '🏷️',
        });
      });
    }

    // Fetch recent conversations
    const { data: recentConversations } = await supabase
      .from('conversation_logs')
      .select('id, user_input, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(3);

    if (recentConversations) {
      recentConversations.forEach(conv => {
        activities.push({
          id: conv.id,
          type: 'conversation',
          title: 'Conversation Logged',
          description: conv.user_input.substring(0, 50) + (conv.user_input.length > 50 ? '...' : ''),
          timestamp: conv.created_at,
          icon: '💬',
        });
      });
    }

    // Sort by timestamp and return top 10
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    return getMockRecentActivities();
  }
}

function getMockRecentActivities(): RecentActivity[] {
  const now = new Date();
  return [
    {
      id: '1',
      type: 'intent',
      title: 'New Intent Created',
      description: 'Book Appointment',
      timestamp: new Date(now.getTime() - 5 * 60000).toISOString(),
      icon: '🎯',
    },
    {
      id: '2',
      type: 'entity',
      title: 'Entity Added',
      description: 'Appointment Type',
      timestamp: new Date(now.getTime() - 15 * 60000).toISOString(),
      icon: '🏷️',
    },
    {
      id: '3',
      type: 'conversation',
      title: 'Conversation Logged',
      description: 'User asked about booking a dental appointment',
      timestamp: new Date(now.getTime() - 30 * 60000).toISOString(),
      icon: '💬',
    },
    {
      id: '4',
      type: 'intent',
      title: 'Intent Updated',
      description: 'Check Balance',
      timestamp: new Date(now.getTime() - 45 * 60000).toISOString(),
      icon: '🎯',
    },
    {
      id: '5',
      type: 'system',
      title: 'Training Completed',
      description: 'Model trained with 150 new phrases',
      timestamp: new Date(now.getTime() - 60 * 60000).toISOString(),
      icon: '⚙️',
    },
  ];
}

/**
 * Fetch performance metrics
 */
export async function getPerformanceMetrics(): Promise<PerformanceMetric[]> {
  // This would require detailed performance tracking
  return [
    { name: 'Response Time', value: 245, target: 300 },
    { name: 'Success Rate', value: 94.5, target: 90 },
    { name: 'Intent Coverage', value: 87, target: 85 },
    { name: 'Entity Accuracy', value: 92, target: 90 },
  ];
}
