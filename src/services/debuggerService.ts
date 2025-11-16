import { supabase } from "@/integrations/supabase/client";

export interface DebugSession {
  id: string;
  input: string;
  intent: string | null;
  confidence: number;
  entities: DetectedEntity[];
  response: string;
  timestamp: string;
  fulfillment?: string;
  context?: ContextData[];
  parameters?: Record<string, any>;
  sessionId?: string;
}

export interface DetectedEntity {
  type: string;
  value: string;
  confidence: number;
  startIndex?: number;
  endIndex?: number;
}

export interface ContextData {
  name: string;
  lifespanCount: number;
  parameters: Record<string, any>;
}

export interface DebugLog {
  id: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  timestamp: string;
  details?: any;
}

export interface IntentMatch {
  intentName: string;
  confidence: number;
  trainingPhrases?: string[];
  parameters?: Record<string, any>;
}

/**
 * Simulate intent detection for debugging
 */
export async function detectIntent(input: string): Promise<DebugSession> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get user's intents from database
    const { data: intents } = await supabase
      .from('intents')
      .select('id, display_name, domain')
      .eq('user_id', user.id);

    // Simulate intent matching (in real implementation, would use ML model)
    const matchedIntent = intents && intents.length > 0
      ? intents[Math.floor(Math.random() * intents.length)]
      : null;

    // Simulate entity detection
    const entities = await detectEntitiesInText(input, user.id);

    const debugSession: DebugSession = {
      id: crypto.randomUUID(),
      input,
      intent: matchedIntent?.display_name || null,
      confidence: Math.random() * 0.3 + 0.7, // 0.7 to 1.0
      entities,
      response: matchedIntent
        ? `Detected intent: ${matchedIntent.display_name}`
        : "I'm not sure I understand. Could you rephrase?",
      timestamp: new Date().toISOString(),
      sessionId: `session-${Date.now()}`,
      parameters: {},
      context: [],
    };

    // Log the conversation
    await supabase.from('conversation_logs').insert({
      user_id: user.id,
      user_input: input,
      detected_entities: entities,
      confidence_scores: { intent: debugSession.confidence },
      processed: true,
    });

    return debugSession;
  } catch (error) {
    console.error('Error detecting intent:', error);
    return getMockDebugSession(input);
  }
}

/**
 * Detect entities in text
 */
async function detectEntitiesInText(text: string, userId: string): Promise<DetectedEntity[]> {
  try {
    const { data: entities } = await supabase
      .from('entities')
      .select('display_name, entity_type')
      .eq('user_id', userId);

    if (!entities || entities.length === 0) {
      return [];
    }

    const detected: DetectedEntity[] = [];

    // Simple pattern matching (in real implementation, would use NLP)
    entities.forEach(entity => {
      const regex = new RegExp(entity.display_name, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        detected.push({
          type: entity.entity_type || entity.display_name,
          value: match[0],
          confidence: Math.random() * 0.2 + 0.8,
          startIndex: match.index,
          endIndex: match.index + match[0].length,
        });
      }
    });

    return detected;
  } catch (error) {
    console.error('Error detecting entities:', error);
    return [];
  }
}

/**
 * Get mock debug session for development
 */
function getMockDebugSession(input: string): DebugSession {
  return {
    id: crypto.randomUUID(),
    input,
    intent: 'book_appointment',
    confidence: 0.92,
    entities: [
      { type: 'date', value: 'tomorrow', confidence: 0.95 },
      { type: 'time', value: '2pm', confidence: 0.88 },
    ],
    response: 'I can help you book an appointment for tomorrow at 2pm.',
    timestamp: new Date().toISOString(),
    sessionId: `session-${Date.now()}`,
    parameters: {
      date: 'tomorrow',
      time: '2pm',
    },
    context: [
      {
        name: 'appointment-context',
        lifespanCount: 5,
        parameters: { date: 'tomorrow', time: '2pm' },
      },
    ],
  };
}

/**
 * Get debug logs
 */
export async function getDebugLogs(): Promise<DebugLog[]> {
  // In production, this would fetch from a logging service
  return [
    {
      id: '1',
      level: 'info',
      message: 'Intent detection started',
      timestamp: new Date(Date.now() - 5000).toISOString(),
    },
    {
      id: '2',
      level: 'debug',
      message: 'Processing natural language input',
      timestamp: new Date(Date.now() - 4000).toISOString(),
      details: { inputLength: 42 },
    },
    {
      id: '3',
      level: 'info',
      message: 'Intent matched with 92% confidence',
      timestamp: new Date(Date.now() - 3000).toISOString(),
    },
    {
      id: '4',
      level: 'warning',
      message: 'Low confidence on entity extraction',
      timestamp: new Date(Date.now() - 2000).toISOString(),
      details: { entity: 'date', confidence: 0.65 },
    },
    {
      id: '5',
      level: 'info',
      message: 'Response generated successfully',
      timestamp: new Date(Date.now() - 1000).toISOString(),
    },
  ];
}

/**
 * Get intent matching details
 */
export async function getIntentMatches(input: string): Promise<IntentMatch[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data: intents } = await supabase
      .from('intents')
      .select('display_name, domain')
      .eq('user_id', user.id)
      .limit(5);

    if (!intents || intents.length === 0) {
      return getMockIntentMatches();
    }

    return intents.map((intent, index) => ({
      intentName: intent.display_name,
      confidence: Math.max(0.5, 0.95 - index * 0.1),
      trainingPhrases: [],
      parameters: {},
    }));
  } catch (error) {
    console.error('Error getting intent matches:', error);
    return getMockIntentMatches();
  }
}

function getMockIntentMatches(): IntentMatch[] {
  return [
    {
      intentName: 'book_appointment',
      confidence: 0.92,
      trainingPhrases: [
        'I want to book an appointment',
        'Schedule a meeting',
        'Book a slot for tomorrow',
      ],
      parameters: { date: 'date-time', service: 'string' },
    },
    {
      intentName: 'check_availability',
      confidence: 0.78,
      trainingPhrases: [
        'What slots are available',
        'Show me availability',
        'When can I come in',
      ],
      parameters: { date: 'date-time' },
    },
    {
      intentName: 'cancel_appointment',
      confidence: 0.65,
      trainingPhrases: [
        'Cancel my appointment',
        'I need to cancel',
        'Remove my booking',
      ],
      parameters: { booking_id: 'string' },
    },
  ];
}

/**
 * Validate intent configuration
 */
export interface IntentValidationResult {
  intentName: string;
  isValid: boolean;
  issues: string[];
  warnings: string[];
}

export async function validateIntent(intentId: string): Promise<IntentValidationResult> {
  try {
    const { data: intent } = await supabase
      .from('intents')
      .select('*, training_phrases(*)')
      .eq('id', intentId)
      .single();

    if (!intent) {
      return {
        intentName: 'Unknown',
        isValid: false,
        issues: ['Intent not found'],
        warnings: [],
      };
    }

    const issues: string[] = [];
    const warnings: string[] = [];

    // Validate training phrases
    const phrases = intent.training_phrases || [];
    if (phrases.length < 5) {
      warnings.push(`Only ${phrases.length} training phrases. Recommended: 10+`);
    }

    // Check for diversity
    const uniqueWords = new Set(
      phrases.flatMap((p: any) => p.text.toLowerCase().split(' '))
    );
    if (uniqueWords.size < phrases.length * 2) {
      warnings.push('Training phrases lack diversity');
    }

    return {
      intentName: intent.display_name,
      isValid: issues.length === 0,
      issues,
      warnings,
    };
  } catch (error) {
    console.error('Error validating intent:', error);
    return {
      intentName: 'Error',
      isValid: false,
      issues: ['Failed to validate intent'],
      warnings: [],
    };
  }
}

/**
 * Get session history
 */
export async function getSessionHistory(sessionId: string): Promise<DebugSession[]> {
  // Mock implementation - would fetch from database in production
  return [
    getMockDebugSession('Hello'),
    getMockDebugSession('I want to book an appointment'),
    getMockDebugSession('Tomorrow at 2pm'),
  ];
}
