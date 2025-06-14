
export interface PlaybookInstruction {
  id: string;
  name: string;
  description: string;
  steps: PlaybookStep[];
  goals: PlaybookGoal[];
  tools: PlaybookTool[];
  examples: PlaybookExample[];
  contextVariables: ContextVariable[];
  performance: PlaybookPerformance;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlaybookStep {
  id: string;
  title: string;
  description: string;
  prompt: string;
  order: number;
  isRequired: boolean;
  dependencies: string[];
  expectedOutput: string;
  validationRules: ValidationRule[];
}

export interface PlaybookGoal {
  id: string;
  objective: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  measurable: boolean;
  successCriteria: string[];
}

export interface PlaybookTool {
  id: string;
  name: string;
  type: 'webhook' | 'function' | 'api' | 'integration';
  description: string;
  parameters: ToolParameter[];
  usage: string;
  examples: string[];
}

export interface ToolParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

export interface PlaybookExample {
  id: string;
  title: string;
  scenario: string;
  userInput: string;
  expectedResponse: string;
  conversation: ConversationTurn[];
}

export interface ConversationTurn {
  speaker: 'user' | 'agent';
  message: string;
  context?: Record<string, any>;
}

export interface ContextVariable {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  defaultValue?: any;
  required: boolean;
  scope: 'session' | 'conversation' | 'global';
}

export interface ValidationRule {
  id: string;
  type: 'length' | 'format' | 'content' | 'structure';
  constraint: string;
  errorMessage: string;
}

export interface PlaybookPerformance {
  tokenCount: number;
  estimatedLatency: number;
  complexity: 'low' | 'medium' | 'high';
  optimization: OptimizationSuggestion[];
}

export interface OptimizationSuggestion {
  type: 'token_reduction' | 'prompt_clarity' | 'performance' | 'structure';
  suggestion: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
}

export interface PlaybookTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  scenario: string;
  template: Partial<PlaybookInstruction>;
  variables: string[];
  tags: string[];
}

export interface PlaybookConfig {
  playbookName: string;
  description: string;
  scenario: string;
  domain: string;
  complexity: 'simple' | 'moderate' | 'complex';
  goals: string[];
  toolsRequired: string[];
  maxTokens: number;
  language: string;
  includeExamples: boolean;
  validationLevel: 'basic' | 'standard' | 'strict';
}
