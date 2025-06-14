
import { PlaybookInstruction, PlaybookConfig, PlaybookTemplate, PlaybookStep, PlaybookGoal, PlaybookTool, PlaybookExample, ContextVariable, PlaybookPerformance, OptimizationSuggestion } from "@/types/playbook";

export const generatePlaybook = async (config: PlaybookConfig): Promise<PlaybookInstruction> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  const steps = generateSteps(config);
  const goals = generateGoals(config);
  const tools = generateTools(config);
  const examples = generateExamples(config);
  const contextVariables = generateContextVariables(config);
  const performance = analyzePerformance(steps, config);

  const playbook: PlaybookInstruction = {
    id: `playbook_${Date.now()}`,
    name: config.playbookName,
    description: config.description,
    steps,
    goals,
    tools,
    examples,
    contextVariables,
    performance,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return playbook;
};

const generateSteps = (config: PlaybookConfig): PlaybookStep[] => {
  const baseSteps: Partial<PlaybookStep>[] = [
    {
      title: "Initial Context Setup",
      description: "Establish the conversation context and user intent",
      prompt: `You are a helpful assistant working in the ${config.domain} domain. Your goal is to ${config.goals[0] || 'assist the user'}. 
      
Context: ${config.scenario}
      
Always maintain a professional and helpful tone while gathering necessary information to complete the user's request.`,
      order: 1,
      isRequired: true,
      dependencies: [],
      expectedOutput: "Context established and user intent identified",
      validationRules: []
    },
    {
      title: "Information Gathering",
      description: "Collect required information from the user",
      prompt: `Based on the user's request, gather the following information:
- Primary objective
- Specific requirements
- Any constraints or preferences
- Timeline if applicable

Ask clarifying questions if needed to ensure you have complete information.`,
      order: 2,
      isRequired: true,
      dependencies: ["step_1"],
      expectedOutput: "All required information collected",
      validationRules: []
    },
    {
      title: "Solution Processing",
      description: "Process the information and formulate a solution",
      prompt: `Using the gathered information, formulate a comprehensive solution that:
1. Addresses the user's primary objective
2. Considers all requirements and constraints
3. Provides step-by-step guidance
4. Includes relevant examples when helpful`,
      order: 3,
      isRequired: true,
      dependencies: ["step_2"],
      expectedOutput: "Solution formulated and validated",
      validationRules: []
    }
  ];

  if (config.complexity === 'complex') {
    baseSteps.push({
      title: "Advanced Processing",
      description: "Handle complex scenarios with multiple variables",
      prompt: `For complex scenarios, ensure you:
- Break down complex tasks into manageable steps
- Identify potential edge cases
- Provide alternative approaches if needed
- Validate each step before proceeding`,
      order: 4,
      isRequired: true,
      dependencies: ["step_3"],
      expectedOutput: "Complex scenario handled appropriately",
      validationRules: []
    });
  }

  return baseSteps.map((step, index) => ({
    id: `step_${index + 1}`,
    title: step.title!,
    description: step.description!,
    prompt: step.prompt!,
    order: step.order!,
    isRequired: step.isRequired!,
    dependencies: step.dependencies!,
    expectedOutput: step.expectedOutput!,
    validationRules: step.validationRules!
  }));
};

const generateGoals = (config: PlaybookConfig): PlaybookGoal[] => {
  return config.goals.map((goal, index) => ({
    id: `goal_${index + 1}`,
    objective: goal,
    description: `Primary objective: ${goal}`,
    priority: index === 0 ? 'high' : 'medium',
    measurable: true,
    successCriteria: [
      "User request successfully addressed",
      "All required information gathered",
      "Solution provided is actionable",
      "User confirms understanding"
    ]
  }));
};

const generateTools = (config: PlaybookConfig): PlaybookTool[] => {
  const commonTools = [
    {
      name: "Webhook Integration",
      type: "webhook" as const,
      description: "Call external APIs for data retrieval or processing",
      parameters: [
        { name: "endpoint", type: "string", required: true, description: "API endpoint URL" },
        { name: "method", type: "string", required: true, description: "HTTP method" },
        { name: "headers", type: "object", required: false, description: "Request headers" },
        { name: "body", type: "object", required: false, description: "Request body" }
      ],
      usage: "Use when external data or processing is required",
      examples: ["Fetch user profile", "Submit form data", "Validate information"]
    },
    {
      name: "Data Function",
      type: "function" as const,
      description: "Execute custom business logic",
      parameters: [
        { name: "input", type: "object", required: true, description: "Function input parameters" },
        { name: "context", type: "object", required: false, description: "Additional context" }
      ],
      usage: "Use for custom calculations or data transformations",
      examples: ["Calculate pricing", "Format data", "Apply business rules"]
    }
  ];

  return commonTools.map((tool, index) => ({
    id: `tool_${index + 1}`,
    ...tool
  }));
};

const generateExamples = (config: PlaybookConfig): PlaybookExample[] => {
  if (!config.includeExamples) return [];

  return [
    {
      id: "example_1",
      title: "Successful Interaction",
      scenario: config.scenario,
      userInput: "I need help with my request",
      expectedResponse: "I'd be happy to help you with that. Let me gather some information to provide the best assistance.",
      conversation: [
        { speaker: "user", message: "I need help with my request" },
        { speaker: "agent", message: "I'd be happy to help you with that. Let me gather some information to provide the best assistance." },
        { speaker: "user", message: "I'm looking for information about..." },
        { speaker: "agent", message: "Great! I can help you with that. Let me provide you with the relevant information." }
      ]
    }
  ];
};

const generateContextVariables = (config: PlaybookConfig): ContextVariable[] => {
  return [
    {
      id: "var_1",
      name: "user_intent",
      type: "string",
      description: "The primary intent of the user",
      required: true,
      scope: "conversation"
    },
    {
      id: "var_2",
      name: "session_context",
      type: "object",
      description: "Session-specific context data",
      required: false,
      scope: "session"
    },
    {
      id: "var_3",
      name: "conversation_history",
      type: "array",
      description: "History of the current conversation",
      required: false,
      scope: "conversation"
    }
  ];
};

const analyzePerformance = (steps: PlaybookStep[], config: PlaybookConfig): PlaybookPerformance => {
  const totalTokens = steps.reduce((sum, step) => sum + step.prompt.length / 4, 0); // Rough token estimation
  const estimatedLatency = steps.length * 200 + (config.complexity === 'complex' ? 500 : 0);
  
  const optimization: OptimizationSuggestion[] = [];
  
  if (totalTokens > config.maxTokens * 0.8) {
    optimization.push({
      type: "token_reduction",
      suggestion: "Consider reducing prompt length or combining steps",
      impact: "high",
      effort: "medium"
    });
  }
  
  if (estimatedLatency > 3000) {
    optimization.push({
      type: "performance",
      suggestion: "Consider parallel processing or step optimization",
      impact: "medium",
      effort: "high"
    });
  }

  return {
    tokenCount: Math.round(totalTokens),
    estimatedLatency,
    complexity: config.complexity as 'low' | 'medium' | 'high',
    optimization
  };
};

export const getPlaybookTemplates = (): PlaybookTemplate[] => {
  return [
    {
      id: "template_1",
      name: "Customer Support",
      category: "Support",
      description: "Handle customer inquiries and support requests",
      scenario: "Customer needs assistance with product or service",
      template: {
        description: "Comprehensive customer support playbook",
        goals: [
          { id: "goal_1", objective: "Resolve customer inquiry", description: "Primary support goal", priority: "high", measurable: true, successCriteria: ["Issue resolved", "Customer satisfied"] }
        ]
      },
      variables: ["customer_name", "issue_type", "priority"],
      tags: ["support", "customer-service", "help"]
    },
    {
      id: "template_2",
      name: "Sales Qualification",
      category: "Sales",
      description: "Qualify and nurture sales leads",
      scenario: "Potential customer showing interest in products/services",
      template: {
        description: "Sales lead qualification and nurturing playbook",
        goals: [
          { id: "goal_1", objective: "Qualify lead", description: "Determine lead quality", priority: "high", measurable: true, successCriteria: ["Lead scored", "Next steps defined"] }
        ]
      },
      variables: ["lead_source", "budget", "timeline", "decision_maker"],
      tags: ["sales", "lead-qualification", "conversion"]
    },
    {
      id: "template_3",
      name: "Onboarding Assistant",
      category: "Onboarding",
      description: "Guide new users through onboarding process",
      scenario: "New user needs guidance getting started",
      template: {
        description: "User onboarding and setup assistance playbook",
        goals: [
          { id: "goal_1", objective: "Complete onboarding", description: "Guide user through setup", priority: "high", measurable: true, successCriteria: ["Setup completed", "User activated"] }
        ]
      },
      variables: ["user_type", "plan_level", "integration_needs"],
      tags: ["onboarding", "setup", "getting-started"]
    }
  ];
};

export const validatePlaybook = (playbook: PlaybookInstruction): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!playbook.name || playbook.name.trim().length === 0) {
    errors.push("Playbook name is required");
  }

  if (!playbook.steps || playbook.steps.length === 0) {
    errors.push("At least one step is required");
  }

  if (!playbook.goals || playbook.goals.length === 0) {
    errors.push("At least one goal must be defined");
  }

  playbook.steps.forEach((step, index) => {
    if (!step.prompt || step.prompt.trim().length === 0) {
      errors.push(`Step ${index + 1}: Prompt is required`);
    }
    if (step.prompt && step.prompt.length > 2000) {
      errors.push(`Step ${index + 1}: Prompt is too long (max 2000 characters)`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};
