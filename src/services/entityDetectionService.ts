
import { supabase } from "@/integrations/supabase/client";

export interface DetectionOptions {
  language: string;
  minConfidence: number;
  enableSmartSuggestions: boolean;
}

export interface DetectedEntity {
  type: string;
  value: string;
  start: number;
  end: number;
  confidence: number;
}

export interface SmartSuggestion {
  entityType: string;
  suggestedValue: string;
  confidence: number;
  reason: string;
}

export interface DetectionResult {
  entities: DetectedEntity[];
  smartSuggestions?: SmartSuggestion[];
}

// Mock entity detection function - in a real app, this would call an AI service
export const detectEntitiesInText = async (
  text: string, 
  options: DetectionOptions
): Promise<DetectionResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Get available entities from database
  const { data: entities } = await supabase
    .from('entities')
    .select('*, entity_synonyms(synonym)')
    .or('user_id.eq.' + (await supabase.auth.getUser()).data.user?.id + ',entity_type.eq.system');

  const detectedEntities: DetectedEntity[] = [];
  const smartSuggestions: SmartSuggestion[] = [];

  // Simple pattern matching for demo
  const patterns = [
    { type: '@sys.email', pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g },
    { type: '@sys.phone-number', pattern: /\b\d{3}-\d{3}-\d{4}\b|\b\(\d{3}\)\s*\d{3}-\d{4}\b/g },
    { type: '@sys.url', pattern: /https?:\/\/[^\s]+/g },
    { type: '@sys.date-time', pattern: /\b(tomorrow|today|yesterday|next week|last week)\b/gi },
    { type: '@sys.location', pattern: /\b(New York|London|Paris|Tokyo|Sydney|Los Angeles)\b/gi },
    { type: '@sys.person', pattern: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g },
    { type: '@sys.number', pattern: /\b\d+\b/g },
  ];

  patterns.forEach(({ type, pattern }) => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const confidence = Math.random() * 0.4 + 0.6; // Random confidence between 0.6-1.0
      
      if (confidence >= options.minConfidence) {
        detectedEntities.push({
          type,
          value: match[0],
          start: match.index,
          end: match.index + match[0].length,
          confidence
        });
      }
    }
  });

  // Generate smart suggestions based on context
  if (options.enableSmartSuggestions) {
    if (text.toLowerCase().includes('book') && text.toLowerCase().includes('flight')) {
      smartSuggestions.push({
        entityType: '@sys.intent',
        suggestedValue: 'book_flight',
        confidence: 0.85,
        reason: 'Detected booking intent with flight context'
      });
    }
    
    if (text.toLowerCase().includes('call') || text.toLowerCase().includes('contact')) {
      smartSuggestions.push({
        entityType: '@sys.intent',
        suggestedValue: 'contact_request',
        confidence: 0.75,
        reason: 'Detected communication intent'
      });
    }
  }

  return { entities: detectedEntities, smartSuggestions };
};

export const saveConversationLog = async (logData: {
  userInput: string;
  detectedEntities: any[];
  smartSuggestions?: any[];
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
      missing_entities: [],
      confidence_scores: {},
      language: logData.language,
      processed: true
    });
};
