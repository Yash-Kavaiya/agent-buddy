
import { supabase } from "@/integrations/supabase/client";

export const getConversationLogs = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  return await supabase
    .from('conversation_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
};

export const createConversationLog = async (logData: {
  userInput: string;
  detectedEntities: any[];
  missingEntities?: any[];
  confidenceScores?: any;
  language: string;
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  return await supabase
    .from('conversation_logs')
    .insert({
      user_id: user.id,
      user_input: logData.userInput,
      detected_entities: logData.detectedEntities,
      missing_entities: logData.missingEntities || [],
      confidence_scores: logData.confidenceScores || {},
      language: logData.language,
      processed: true
    });
};

export const updateConversationLog = async (logId: string, updates: any) => {
  return await supabase
    .from('conversation_logs')
    .update(updates)
    .eq('id', logId);
};

export const deleteConversationLog = async (logId: string) => {
  return await supabase
    .from('conversation_logs')
    .delete()
    .eq('id', logId);
};
