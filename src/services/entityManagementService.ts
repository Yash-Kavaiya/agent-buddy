
import { supabase } from "@/integrations/supabase/client";

export interface Entity {
  id: string;
  name: string;
  display_name: string;
  entity_type: 'system' | 'custom';
  description?: string;
  category?: string;
  synonyms?: string[];
}

export const getEntities = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('entities')
    .select(`
      *,
      entity_synonyms(synonym)
    `)
    .or(`user_id.eq.${user.id},entity_type.eq.system`)
    .order('entity_type', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching entities:', error);
    return { data: null, error };
  }

  // Transform the data to include synonyms as an array
  const entitiesWithSynonyms = data?.map(entity => ({
    ...entity,
    synonyms: entity.entity_synonyms?.map((s: any) => s.synonym) || []
  }));

  return { data: entitiesWithSynonyms, error: null };
};

export const createEntity = async (entityData: {
  name: string;
  display_name: string;
  description?: string;
  category?: string;
  entity_type: 'custom';
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  return await supabase
    .from('entities')
    .insert({
      ...entityData,
      user_id: user.id
    })
    .select()
    .single();
};

export const updateEntity = async (entityId: string, updates: Partial<Entity>) => {
  return await supabase
    .from('entities')
    .update(updates)
    .eq('id', entityId)
    .select()
    .single();
};

export const deleteEntity = async (entityId: string) => {
  return await supabase
    .from('entities')
    .delete()
    .eq('id', entityId);
};

export const addEntitySynonym = async (entityId: string, synonym: string) => {
  return await supabase
    .from('entity_synonyms')
    .insert({
      entity_id: entityId,
      synonym,
      language: 'en',
      auto_generated: false,
      confidence_score: 1.0
    })
    .select();
};

export const removeEntitySynonym = async (synonymId: string) => {
  return await supabase
    .from('entity_synonyms')
    .delete()
    .eq('id', synonymId);
};
