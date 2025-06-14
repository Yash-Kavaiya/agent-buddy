
export interface TrainingPhrase {
  id: string;
  text: string;
  entities: Entity[];
  confidence?: number;
}

export interface Entity {
  id: string;
  entityType: string;
  value: string;
  startIndex: number;
  endIndex: number;
}

export interface Response {
  id: string;
  text: string;
  isRich?: boolean;
  platform?: string;
}

export interface Intent {
  id: string;
  displayName: string;
  description: string;
  trainingPhrases: TrainingPhrase[];
  responses: Response[];
  parameters: Parameter[];
  followupIntents?: string[];
  contexts?: Context[];
  events?: string[];
  priority?: number;
  isFallback?: boolean;
  mlDisabled?: boolean;
  language?: string;
  category?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Parameter {
  id: string;
  name: string;
  entityType: string;
  required: boolean;
  prompts: string[];
  defaultValue?: string;
  isList?: boolean;
}

export interface Context {
  name: string;
  lifespan?: number;
  parameters?: Record<string, any>;
}

export interface IntentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  intent: Partial<Intent>;
  variables?: string[];
}

export interface GenerationConfig {
  intentName: string;
  description: string;
  domain: string;
  language: string;
  phraseCount: number;
  includeEntities: boolean;
  entityTypes: string[];
  tone: 'formal' | 'casual' | 'professional' | 'friendly';
  complexity: 'simple' | 'moderate' | 'complex';
  variations: boolean;
  includeNegatives: boolean;
}
