
import { Intent, GenerationConfig, TrainingPhrase, Entity, Response } from "@/types/intent";

// Mock AI service - in production, this would call actual AI APIs like Gemini
export const generateIntent = async (config: GenerationConfig): Promise<Intent> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const baseTrainingPhrases: string[] = [];
  
  // Generate training phrases based on the description and domain
  const variations = generateTrainingPhraseVariations(config);
  
  const trainingPhrases: TrainingPhrase[] = variations.slice(0, config.phraseCount).map((text, index) => ({
    id: `phrase_${index + 1}`,
    text,
    entities: config.includeEntities ? extractEntities(text, config.entityTypes) : [],
    confidence: Math.random() * 0.3 + 0.7 // Random confidence between 0.7 and 1.0
  }));

  const responses: Response[] = generateResponses(config);

  const intent: Intent = {
    id: `intent_${Date.now()}`,
    displayName: config.intentName,
    description: config.description,
    trainingPhrases,
    responses,
    parameters: [],
    language: config.language,
    category: config.domain,
    tags: [config.domain, config.tone],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return intent;
};

const generateTrainingPhraseVariations = (config: GenerationConfig): string[] => {
  const { description, domain, tone, complexity, variations } = config;
  
  // Base patterns based on common intent structures
  const basePatterns = [
    `I want to ${description.toLowerCase()}`,
    `I need to ${description.toLowerCase()}`,
    `Can you help me ${description.toLowerCase()}`,
    `I would like to ${description.toLowerCase()}`,
    `How can I ${description.toLowerCase()}`,
    `I'm looking to ${description.toLowerCase()}`,
    `Please help me ${description.toLowerCase()}`,
    `I'd like to ${description.toLowerCase()}`
  ];

  const domainSpecificPatterns = getDomainSpecificPatterns(domain, description);
  const toneVariations = applyToneVariations([...basePatterns, ...domainSpecificPatterns], tone);
  const complexityVariations = applyComplexityVariations(toneVariations, complexity);
  
  let allVariations = [...basePatterns, ...domainSpecificPatterns, ...toneVariations, ...complexityVariations];
  
  if (variations) {
    allVariations = [...allVariations, ...generateAdditionalVariations(allVariations)];
  }

  // Remove duplicates and return
  return Array.from(new Set(allVariations));
};

const getDomainSpecificPatterns = (domain: string, description: string): string[] => {
  const patterns: Record<string, string[]> = {
    healthcare: [
      `I need to schedule an appointment`,
      `Can I book a consultation`,
      `I want to see a doctor`,
      `I need medical assistance`,
      `Book me an appointment with ${domain}`
    ],
    ecommerce: [
      `I want to buy something`,
      `Show me products`,
      `I'm looking for items`,
      `Add to cart`,
      `I want to purchase`
    ],
    banking: [
      `Check my balance`,
      `Transfer money`,
      `I need account information`,
      `Help with banking`,
      `Financial assistance needed`
    ],
    support: [
      `I need help`,
      `Technical support required`,
      `I have a problem`,
      `Something is not working`,
      `Can you assist me`
    ]
  };

  return patterns[domain.toLowerCase()] || [];
};

const applyToneVariations = (phrases: string[], tone: string): string[] => {
  const toneModifiers: Record<string, (phrase: string) => string[]> = {
    formal: (phrase) => [
      `Could you please ${phrase.toLowerCase()}`,
      `I would appreciate assistance with ${phrase.toLowerCase()}`,
      `I require ${phrase.toLowerCase()}`
    ],
    casual: (phrase) => [
      `Hey, ${phrase.toLowerCase()}`,
      `${phrase.toLowerCase()} please`,
      `${phrase.toLowerCase()} thanks`
    ],
    friendly: (phrase) => [
      `Hi! ${phrase}`,
      `Hello, ${phrase.toLowerCase()}`,
      `${phrase} :)`
    ],
    professional: (phrase) => [
      `I need assistance with ${phrase.toLowerCase()}`,
      `Please provide support for ${phrase.toLowerCase()}`,
      `I require professional help with ${phrase.toLowerCase()}`
    ]
  };

  const modifier = toneModifiers[tone];
  if (!modifier) return phrases;

  return phrases.flatMap(phrase => modifier(phrase));
};

const applyComplexityVariations = (phrases: string[], complexity: string): string[] => {
  if (complexity === 'simple') {
    return phrases.map(phrase => phrase.split(' ').slice(0, 5).join(' '));
  }
  
  if (complexity === 'complex') {
    return phrases.map(phrase => 
      `${phrase} and I would also like to ensure that everything is handled properly with all the necessary details`
    );
  }
  
  return phrases; // moderate complexity
};

const generateAdditionalVariations = (baseVariations: string[]): string[] => {
  const synonyms: Record<string, string[]> = {
    'want': ['need', 'require', 'would like', 'wish'],
    'help': ['assist', 'support', 'aid'],
    'can': ['could', 'would', 'may'],
    'please': ['kindly', 'if you could']
  };

  return baseVariations.flatMap(phrase => {
    const variations: string[] = [];
    Object.entries(synonyms).forEach(([word, syns]) => {
      if (phrase.toLowerCase().includes(word)) {
        syns.forEach(syn => {
          variations.push(phrase.replace(new RegExp(word, 'gi'), syn));
        });
      }
    });
    return variations;
  });
};

const extractEntities = (text: string, entityTypes: string[]): Entity[] => {
  const entities: Entity[] = [];
  
  // Simple entity extraction patterns
  const patterns: Record<string, RegExp> = {
    '@sys.person': /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g,
    '@sys.date-time': /\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}:\d{2})\b/gi,
    '@sys.number': /\b\d+\b/g,
    '@sys.email': /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    '@sys.phone-number': /\b\d{3}-\d{3}-\d{4}\b/g
  };

  entityTypes.forEach(entityType => {
    const pattern = patterns[entityType];
    if (pattern) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        entities.push({
          id: `entity_${entities.length + 1}`,
          entityType,
          value: match[0],
          startIndex: match.index,
          endIndex: match.index + match[0].length
        });
      }
    }
  });

  return entities;
};

const generateResponses = (config: GenerationConfig): Response[] => {
  const responses = [
    "I'd be happy to help you with that. Let me get that information for you.",
    "Sure! I can assist you with that request.",
    "Of course! I'll help you with that right away.",
    "I understand what you need. Let me take care of that for you."
  ];

  return responses.map((text, index) => ({
    id: `response_${index + 1}`,
    text
  }));
};
