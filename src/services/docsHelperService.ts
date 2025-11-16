export interface DocSection {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  relatedTopics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: string;
}

export interface DocCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  articleCount: number;
}

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  relevanceScore: number;
  url?: string;
}

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  category: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

/**
 * Get documentation categories
 */
export function getDocCategories(): DocCategory[] {
  return [
    {
      id: 'getting-started',
      name: 'Getting Started',
      description: 'Learn the basics of Dialogflow development',
      icon: '🚀',
      articleCount: 12,
    },
    {
      id: 'intents',
      name: 'Intents',
      description: 'Create and manage conversation intents',
      icon: '🎯',
      articleCount: 18,
    },
    {
      id: 'entities',
      name: 'Entities',
      description: 'Extract structured data from user input',
      icon: '🏷️',
      articleCount: 15,
    },
    {
      id: 'contexts',
      name: 'Contexts',
      description: 'Manage conversation state and flow',
      icon: '🔄',
      articleCount: 10,
    },
    {
      id: 'fulfillment',
      name: 'Fulfillment',
      description: 'Connect to external APIs and webhooks',
      icon: '⚡',
      articleCount: 14,
    },
    {
      id: 'integrations',
      name: 'Integrations',
      description: 'Deploy to various platforms',
      icon: '🔌',
      articleCount: 20,
    },
    {
      id: 'best-practices',
      name: 'Best Practices',
      description: 'Tips and guidelines for better agents',
      icon: '⭐',
      articleCount: 16,
    },
    {
      id: 'troubleshooting',
      name: 'Troubleshooting',
      description: 'Common issues and solutions',
      icon: '🔧',
      articleCount: 22,
    },
  ];
}

/**
 * Search documentation
 */
export function searchDocs(query: string): SearchResult[] {
  const allDocs = getAllDocSections();

  if (!query.trim()) {
    return [];
  }

  const searchTerms = query.toLowerCase().split(' ');

  return allDocs
    .map(doc => {
      let score = 0;

      searchTerms.forEach(term => {
        if (doc.title.toLowerCase().includes(term)) score += 5;
        if (doc.content.toLowerCase().includes(term)) score += 2;
        if (doc.tags.some(tag => tag.toLowerCase().includes(term))) score += 3;
      });

      return {
        id: doc.id,
        title: doc.title,
        excerpt: doc.content.substring(0, 150) + '...',
        category: doc.category,
        relevanceScore: score,
      };
    })
    .filter(result => result.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 10);
}

/**
 * Get all documentation sections
 */
export function getAllDocSections(): DocSection[] {
  return [
    {
      id: '1',
      title: 'Creating Your First Intent',
      category: 'getting-started',
      content: `Intents are the fundamental building blocks of your Dialogflow agent. An intent represents a purpose or goal the user has in mind when they say something to your agent.

To create an intent:
1. Navigate to the Intents section in the Dialogflow console
2. Click "Create Intent"
3. Add training phrases - examples of what users might say
4. Define responses - what your agent should reply
5. Save your intent

Best practices:
- Add at least 10-20 training phrases per intent
- Use diverse phrasing and vocabulary
- Include both formal and casual language
- Test your intent with real user queries`,
      tags: ['intents', 'beginner', 'tutorial'],
      relatedTopics: ['Training Phrases', 'Intent Parameters', 'Responses'],
      difficulty: 'beginner',
      lastUpdated: '2024-11-01',
    },
    {
      id: '2',
      title: 'Understanding Entity Types',
      category: 'entities',
      content: `Entities extract structured data from user input. Dialogflow provides two types of entities:

System Entities:
- Pre-built entities like @sys.date, @sys.time, @sys.number
- No configuration needed
- Automatically recognized

Custom Entities:
- Define your own entity types
- Add synonyms for better matching
- Use regex patterns for advanced matching

Entity extraction helps you capture specific information like dates, locations, product names, or any domain-specific data your application needs.`,
      tags: ['entities', 'system-entities', 'custom-entities'],
      relatedTopics: ['Parameters', 'Intent Matching', 'Fulfillment'],
      difficulty: 'intermediate',
      lastUpdated: '2024-10-28',
    },
    {
      id: '3',
      title: 'Working with Contexts',
      category: 'contexts',
      content: `Contexts allow you to maintain conversation state across multiple turns. They enable your agent to remember information and provide contextually relevant responses.

Input Contexts: Required contexts for an intent to match
Output Contexts: Contexts set after an intent is matched

Lifespan: Number of conversation turns a context remains active (default: 5)

Use cases:
- Following up on previous questions
- Collecting information across multiple turns
- Creating conversation flows
- Handling clarification requests`,
      tags: ['contexts', 'conversation-flow', 'state-management'],
      relatedTopics: ['Intent Matching', 'Follow-up Intents', 'Session Management'],
      difficulty: 'intermediate',
      lastUpdated: '2024-10-25',
    },
    {
      id: '4',
      title: 'Setting Up Webhook Fulfillment',
      category: 'fulfillment',
      content: `Webhook fulfillment allows your agent to call external APIs and return dynamic responses.

Setup steps:
1. Create a webhook endpoint (Node.js, Python, etc.)
2. Enable fulfillment in your intent
3. Configure the webhook URL in Dialogflow settings
4. Handle the JSON request in your webhook
5. Return a properly formatted JSON response

Your webhook receives:
- Detected intent name
- Extracted parameters
- Original user query
- Session ID

You should return:
- Fulfillment text (response)
- Optional: output contexts, follow-up event`,
      tags: ['fulfillment', 'webhook', 'api', 'integration'],
      relatedTopics: ['Cloud Functions', 'API Integration', 'Dynamic Responses'],
      difficulty: 'advanced',
      lastUpdated: '2024-11-10',
    },
    {
      id: '5',
      title: 'Training Phrase Best Practices',
      category: 'best-practices',
      content: `Quality training phrases are essential for accurate intent matching.

Guidelines:
- Aim for 10-50 training phrases per intent
- Include variations in phrasing and word order
- Mix formal and casual language
- Add both questions and statements
- Include misspellings for common words
- Use different sentence structures

What to avoid:
- Duplicate or very similar phrases
- Overly specific phrases that won't generalize
- Phrases that could match multiple intents
- Incomplete or fragmented sentences

Test regularly with real user inputs and add variations based on what users actually say.`,
      tags: ['best-practices', 'training-phrases', 'intent-matching'],
      relatedTopics: ['Intent Design', 'Testing', 'User Research'],
      difficulty: 'beginner',
      lastUpdated: '2024-11-05',
    },
    {
      id: '6',
      title: 'Debugging Low Confidence Scores',
      category: 'troubleshooting',
      content: `Low confidence scores indicate your agent isn't sure which intent matches the user input.

Common causes:
1. Insufficient training phrases
2. Overlapping intents
3. Ambiguous user input
4. Missing entities

Solutions:
- Add more diverse training phrases
- Review intent boundaries and merge similar intents
- Use contexts to disambiguate
- Add required parameters
- Implement fallback intents
- Use entity validation

Monitor your confidence scores and aim for above 0.8 for production intents.`,
      tags: ['troubleshooting', 'confidence', 'debugging'],
      relatedTopics: ['Intent Matching', 'Training Phrases', 'Testing'],
      difficulty: 'intermediate',
      lastUpdated: '2024-11-08',
    },
  ];
}

/**
 * Get document by ID
 */
export function getDocById(id: string): DocSection | null {
  return getAllDocSections().find(doc => doc.id === id) || null;
}

/**
 * Get documents by category
 */
export function getDocsByCategory(category: string): DocSection[] {
  return getAllDocSections().filter(doc => doc.category === category);
}

/**
 * Get code examples
 */
export function getCodeExamples(): CodeExample[] {
  return [
    {
      id: '1',
      title: 'Basic Webhook Handler (Node.js)',
      description: 'Simple webhook fulfillment using Express.js',
      language: 'javascript',
      code: `const express = require('express');
const app = express();

app.post('/webhook', (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  const parameters = req.body.queryResult.parameters;

  let responseText = '';

  if (intentName === 'book_appointment') {
    const date = parameters.date;
    const time = parameters.time;
    responseText = \`I've booked your appointment for \${date} at \${time}\`;
  }

  res.json({
    fulfillmentText: responseText
  });
});

app.listen(3000);`,
      category: 'fulfillment',
    },
    {
      id: '2',
      title: 'Entity Extraction with Dialogflow',
      description: 'Extract and validate entities from user input',
      language: 'javascript',
      code: `function extractEntities(queryResult) {
  const parameters = queryResult.parameters;
  const entities = {};

  // Extract date entity
  if (parameters.date) {
    entities.date = parameters.date;
  }

  // Extract custom entity
  if (parameters.product_name) {
    entities.productName = parameters.product_name;
  }

  // Validate entities
  if (!entities.date) {
    throw new Error('Date is required');
  }

  return entities;
}`,
      category: 'entities',
    },
    {
      id: '3',
      title: 'Context Management',
      description: 'Set and read contexts in webhook',
      language: 'javascript',
      code: `function handleContexts(req, res) {
  const session = req.body.session;
  const contexts = req.body.queryResult.outputContexts;

  // Read context parameter
  const orderContext = contexts.find(c =>
    c.name.endsWith('/contexts/order-context')
  );

  const orderId = orderContext?.parameters?.order_id;

  // Set new context
  const newContext = {
    name: \`\${session}/contexts/order-confirmed\`,
    lifespanCount: 5,
    parameters: {
      order_id: orderId,
      confirmed_at: new Date().toISOString()
    }
  };

  res.json({
    fulfillmentText: 'Order confirmed!',
    outputContexts: [newContext]
  });
}`,
      category: 'contexts',
    },
    {
      id: '4',
      title: 'Python Webhook with Flask',
      description: 'Webhook fulfillment using Python Flask',
      language: 'python',
      code: `from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    req = request.get_json()
    intent_name = req['queryResult']['intent']['displayName']
    parameters = req['queryResult']['parameters']

    response_text = ""

    if intent_name == "book_appointment":
        date = parameters.get('date')
        time = parameters.get('time')
        response_text = f"Appointment booked for {date} at {time}"

    return jsonify({
        'fulfillmentText': response_text
    })

if __name__ == '__main__':
    app.run(port=5000)`,
      category: 'fulfillment',
    },
  ];
}

/**
 * Get frequently asked questions
 */
export function getFAQs(): FAQ[] {
  return [
    {
      id: '1',
      question: 'How many training phrases should I add per intent?',
      answer: 'Aim for at least 10-20 training phrases per intent, but more is better. Include diverse phrasings, different word orders, and both formal and casual language. Quality matters more than quantity.',
      category: 'intents',
      helpful: 156,
    },
    {
      id: '2',
      question: 'What is a good confidence score?',
      answer: 'A confidence score above 0.8 (80%) is generally good for production. Scores between 0.6-0.8 may work but should be monitored. Below 0.6 indicates the agent is uncertain and you should improve training data.',
      category: 'troubleshooting',
      helpful: 203,
    },
    {
      id: '3',
      question: 'How do I handle multiple languages?',
      answer: 'Dialogflow supports multi-language agents. You can either create separate agents for each language or use a single agent with language-specific training phrases. The agent will detect the input language automatically.',
      category: 'getting-started',
      helpful: 89,
    },
    {
      id: '4',
      question: 'When should I use contexts vs parameters?',
      answer: 'Use parameters to extract specific data from a single user input (like dates, names, numbers). Use contexts to maintain state across multiple conversation turns and to control conversation flow.',
      category: 'contexts',
      helpful: 134,
    },
    {
      id: '5',
      question: 'How can I test my webhook locally?',
      answer: 'Use ngrok or a similar tool to create a public URL for your local server. Set this URL as your webhook endpoint in Dialogflow. This allows you to test and debug your webhook during development.',
      category: 'fulfillment',
      helpful: 178,
    },
    {
      id: '6',
      question: 'What are system entities?',
      answer: 'System entities are pre-built entities provided by Dialogflow for common data types like @sys.date, @sys.time, @sys.number, @sys.email, etc. They require no configuration and work across languages.',
      category: 'entities',
      helpful: 112,
    },
  ];
}

/**
 * Get quick links
 */
export interface QuickLink {
  title: string;
  description: string;
  url: string;
  category: string;
}

export function getQuickLinks(): QuickLink[] {
  return [
    {
      title: 'Dialogflow Documentation',
      description: 'Official Dialogflow documentation from Google',
      url: 'https://cloud.google.com/dialogflow/docs',
      category: 'official',
    },
    {
      title: 'API Reference',
      description: 'Complete API reference for Dialogflow',
      url: 'https://cloud.google.com/dialogflow/docs/reference',
      category: 'official',
    },
    {
      title: 'Community Forum',
      description: 'Ask questions and get help from the community',
      url: 'https://stackoverflow.com/questions/tagged/dialogflow',
      category: 'community',
    },
    {
      title: 'YouTube Tutorials',
      description: 'Video tutorials and walkthroughs',
      url: 'https://www.youtube.com/results?search_query=dialogflow+tutorial',
      category: 'learning',
    },
  ];
}

/**
 * Get related topics
 */
export function getRelatedTopics(currentTopic: string): DocSection[] {
  const allDocs = getAllDocSections();
  const currentDoc = allDocs.find(doc => doc.id === currentTopic);

  if (!currentDoc) {
    return [];
  }

  return allDocs
    .filter(doc =>
      doc.id !== currentTopic &&
      (doc.category === currentDoc.category ||
        doc.tags.some(tag => currentDoc.tags.includes(tag)))
    )
    .slice(0, 3);
}

/**
 * Get popular articles
 */
export function getPopularArticles(): DocSection[] {
  return getAllDocSections().slice(0, 5);
}
