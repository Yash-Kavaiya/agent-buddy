
import { supabase } from "@/integrations/supabase/client";
import { Intent, TrainingPhrase, Entity } from "@/types/intent";

export interface DatabaseIntent {
  id: string;
  user_id: string;
  display_name: string;
  description: string | null;
  domain: string | null;
  language: string;
  phrase_count: number;
  tone: string | null;
  complexity: string | null;
  include_entities: boolean;
  include_variations: boolean;
  include_negatives: boolean;
  entity_types: string[];
  created_at: string;
  updated_at: string;
}

export const saveIntent = async (intent: Intent, config: any): Promise<{ data: DatabaseIntent | null; error: any }> => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: { message: "User not authenticated" } };
    }

    // Insert intent
    const { data: intentData, error: intentError } = await supabase
      .from('intents')
      .insert({
        user_id: user.id,
        display_name: intent.displayName,
        description: intent.description,
        domain: intent.category,
        language: intent.language || 'en',
        phrase_count: intent.trainingPhrases.length,
        tone: config.tone,
        complexity: config.complexity,
        include_entities: config.includeEntities,
        include_variations: config.variations,
        include_negatives: config.includeNegatives,
        entity_types: config.entityTypes || []
      })
      .select()
      .single();

    if (intentError) {
      console.error('Error saving intent:', intentError);
      return { data: null, error: intentError };
    }

    // Insert training phrases
    const phrasesToInsert = intent.trainingPhrases.map(phrase => ({
      intent_id: intentData.id,
      text: phrase.text,
      confidence: phrase.confidence
    }));

    const { data: phrasesData, error: phrasesError } = await supabase
      .from('training_phrases')
      .insert(phrasesToInsert)
      .select();

    if (phrasesError) {
      console.error('Error saving training phrases:', phrasesError);
      return { data: null, error: phrasesError };
    }

    // Insert entities for each phrase
    const entitiesToInsert: any[] = [];
    intent.trainingPhrases.forEach((phrase, index) => {
      const phraseId = phrasesData[index].id;
      phrase.entities.forEach(entity => {
        entitiesToInsert.push({
          phrase_id: phraseId,
          entity_type: entity.entityType,
          value: entity.value,
          start_index: entity.startIndex,
          end_index: entity.endIndex
        });
      });
    });

    if (entitiesToInsert.length > 0) {
      const { error: entitiesError } = await supabase
        .from('phrase_entities')
        .insert(entitiesToInsert);

      if (entitiesError) {
        console.error('Error saving entities:', entitiesError);
        return { data: null, error: entitiesError };
      }
    }

    return { data: intentData, error: null };
  } catch (error) {
    console.error('Unexpected error saving intent:', error);
    return { data: null, error };
  }
};

export const getUserIntents = async (): Promise<{ data: DatabaseIntent[] | null; error: any }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: { message: "User not authenticated" } };
    }

    const { data, error } = await supabase
      .from('intents')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    return { data, error };
  } catch (error) {
    console.error('Error fetching user intents:', error);
    return { data: null, error };
  }
};

export const getIntentWithDetails = async (intentId: string): Promise<{ data: any | null; error: any }> => {
  try {
    const { data: intent, error: intentError } = await supabase
      .from('intents')
      .select('*')
      .eq('id', intentId)
      .single();

    if (intentError) {
      return { data: null, error: intentError };
    }

    const { data: phrases, error: phrasesError } = await supabase
      .from('training_phrases')
      .select(`
        *,
        phrase_entities (*)
      `)
      .eq('intent_id', intentId);

    if (phrasesError) {
      return { data: null, error: phrasesError };
    }

    return { 
      data: {
        ...intent,
        training_phrases: phrases
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Error fetching intent details:', error);
    return { data: null, error };
  }
};

export const deleteIntent = async (intentId: string): Promise<{ error: any }> => {
  try {
    const { error } = await supabase
      .from('intents')
      .delete()
      .eq('id', intentId);

    return { error };
  } catch (error) {
    console.error('Error deleting intent:', error);
    return { error };
  }
};
