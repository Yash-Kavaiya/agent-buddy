import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Copy, Download, Play, Settings, Cloud, Github, Zap, Database, Cpu, MessageSquare, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WebhookGenerator = () => {
  const [language, setLanguage] = useState("");
  const [authType, setAuthType] = useState("");
  const [functionality, setFunctionality] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [activeTab, setActiveTab] = useState("generator");
  const { toast } = useToast();

  const languages = [
    { value: "nodejs", label: "Node.js", icon: "🟢" },
    { value: "python", label: "Python", icon: "🐍" },
    { value: "java", label: "Java", icon: "☕" },
    { value: "go", label: "Go", icon: "🔵" },
    { value: "dotnet", label: ".NET", icon: "🔷" },
    { value: "ruby", label: "Ruby", icon: "💎" },
    { value: "php", label: "PHP", icon: "🐘" }
  ];

  const authTypes = [
    { value: "oauth2", label: "OAuth2", description: "Industry standard OAuth2 flow" },
    { value: "jwt", label: "JWT", description: "JSON Web Token authentication" },
    { value: "apikey", label: "API Key", description: "Simple API key validation" },
    { value: "basic", label: "Basic Auth", description: "Username/password authentication" }
  ];

  const prebuiltTemplates = [
    // Data Fetching Templates
    { id: "api-fetch", name: "Fetch Data from API", description: "REST API data fetching with error handling", category: "Data Fetching", icon: "🔄" },
    { id: "bigquery", name: "BigQuery Data Fetch", description: "Query and fetch data from Google BigQuery", category: "Data Fetching", icon: "📊" },
    { id: "apigee", name: "Apigee API Gateway", description: "Fetch data through Apigee API management", category: "Data Fetching", icon: "🌐" },
    
    // Database Operations
    { id: "firestore", name: "Firestore CRUD", description: "Create, Read, Update, Delete operations for Firestore", category: "Database", icon: "🔥" },
    { id: "cloudsql-postgres", name: "Cloud SQL PostgreSQL", description: "CRUD operations for PostgreSQL on Google Cloud", category: "Database", icon: "🐘" },
    { id: "cloudsql-mysql", name: "Cloud SQL MySQL", description: "CRUD operations for MySQL on Google Cloud", category: "Database", icon: "🐬" },
    
    // External Services
    { id: "twilio", name: "Twilio Integration", description: "SMS, Voice, and messaging via Twilio API", category: "Communication", icon: "📱" },
    { id: "openai", name: "OpenAI Integration", description: "AI-powered responses using OpenAI GPT models", category: "AI Services", icon: "🤖" },
    
    // Original Templates
    { id: "payment", name: "Payment Processing", description: "Stripe, PayPal webhook handlers", category: "E-commerce", icon: "💳" },
    { id: "notification", name: "Push Notifications", description: "Firebase, OneSignal integrations", category: "Communication", icon: "🔔" },
    { id: "email", name: "Email Service", description: "SendGrid, Mailgun handlers", category: "Communication", icon: "📧" },
    { id: "analytics", name: "Analytics Tracking", description: "Google Analytics, Mixpanel", category: "Analytics", icon: "📈" },
    { id: "social", name: "Social Media", description: "Twitter, Facebook API handlers", category: "Social", icon: "📱" },
    { id: "storage", name: "File Storage", description: "AWS S3, Google Cloud Storage", category: "Storage", icon: "📁" }
  ];

  const starterCodes = {
    nodejs: `// Node.js Express Webhook Starter
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// Webhook signature verification
const verifySignature = (payload, signature, secret) => {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
};

app.post('/webhook', (req, res) => {
  try {
    // Add your webhook logic here
    const payload = JSON.stringify(req.body);
    console.log('Webhook received:', payload);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Webhook server running on port \${PORT}\`);
});`,
    python: `# Python Flask Webhook Starter
from flask import Flask, request, jsonify
import hashlib
import hmac
import json

app = Flask(__name__)

def verify_signature(payload, signature, secret):
    """Verify webhook signature"""
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected_signature)

@app.route('/webhook', methods=['POST'])
def webhook():
    try:
        # Add your webhook logic here
        payload = request.get_json()
        print(f"Webhook received: {json.dumps(payload)}")
        
        return jsonify({"success": True}), 200
    except Exception as e:
        print(f"Webhook error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)`,
    java: `// Java Spring Boot Webhook Starter
@RestController
@RequestMapping("/api")
public class WebhookController {
    
    @PostMapping("/webhook")
    public ResponseEntity<Map<String, Object>> handleWebhook(
        @RequestBody Map<String, Object> payload,
        HttpServletRequest request
    ) {
        try {
            // Add your webhook logic here
            System.out.println("Webhook received: " + payload.toString());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Webhook error: " + e.getMessage());
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Internal server error");
            return ResponseEntity.status(500).body(error);
        }
    }
}`
  };

  const templateCodes = {
    "api-fetch": {
      nodejs: `// API Data Fetching Webhook
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/webhook/fetch-api-data', async (req, res) => {
  try {
    const { apiUrl, headers = {}, method = 'GET' } = req.body;
    
    const response = await axios({
      method,
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      timeout: 10000
    });
    
    console.log('API data fetched successfully:', response.data);
    
    res.status(200).json({
      success: true,
      data: response.data,
      status: response.status
    });
  } catch (error) {
    console.error('API fetch error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      code: error.response?.status || 'NETWORK_ERROR'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`API Fetch webhook server running on port \${PORT}\`);
});`
    },
    "bigquery": {
      nodejs: `// BigQuery Data Fetching Webhook
const express = require('express');
const { BigQuery } = require('@google-cloud/bigquery');
const app = express();

app.use(express.json());

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE
});

app.post('/webhook/bigquery-data', async (req, res) => {
  try {
    const { query, dataset, table } = req.body;
    
    const options = {
      query: query || \`SELECT * FROM \\\`\${dataset}.\${table}\\\` LIMIT 100\`,
      location: 'US',
    };

    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();
    
    console.log('BigQuery data fetched:', rows.length, 'rows');
    
    res.status(200).json({
      success: true,
      data: rows,
      rowCount: rows.length
    });
  } catch (error) {
    console.error('BigQuery error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`BigQuery webhook server running on port \${PORT}\`);
});`
    },
    "firestore": {
      nodejs: `// Firestore CRUD Operations Webhook
const express = require('express');
const admin = require('firebase-admin');
const app = express();

app.use(express.json());

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID
});

const db = admin.firestore();

// Create document
app.post('/webhook/firestore/create', async (req, res) => {
  try {
    const { collection, documentId, data } = req.body;
    
    const docRef = documentId 
      ? db.collection(collection).doc(documentId)
      : db.collection(collection).doc();
    
    await docRef.set({
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.status(200).json({
      success: true,
      documentId: docRef.id,
      message: 'Document created successfully'
    });
  } catch (error) {
    console.error('Firestore create error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Read document
app.post('/webhook/firestore/read', async (req, res) => {
  try {
    const { collection, documentId, limit = 10 } = req.body;
    
    if (documentId) {
      const doc = await db.collection(collection).doc(documentId).get();
      const data = doc.exists ? { id: doc.id, ...doc.data() } : null;
      
      res.status(200).json({
        success: true,
        data
      });
    } else {
      const snapshot = await db.collection(collection).limit(limit).get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      res.status(200).json({
        success: true,
        data,
        count: data.length
      });
    }
  } catch (error) {
    console.error('Firestore read error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Firestore CRUD webhook server running on port \${PORT}\`);
});`
    },
    "twilio": {
      nodejs: `// Twilio Integration Webhook
const express = require('express');
const twilio = require('twilio');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Send SMS
app.post('/webhook/twilio/sms', async (req, res) => {
  try {
    const { to, message, from } = req.body;
    
    const result = await client.messages.create({
      body: message,
      from: from || process.env.TWILIO_PHONE_NUMBER,
      to: to
    });
    
    console.log('SMS sent successfully:', result.sid);
    
    res.status(200).json({
      success: true,
      messageSid: result.sid,
      status: result.status
    });
  } catch (error) {
    console.error('Twilio SMS error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Handle incoming SMS
app.post('/webhook/twilio/incoming', (req, res) => {
  try {
    const { From, Body, MessageSid } = req.body;
    
    console.log('Incoming SMS:', { from: From, body: Body, sid: MessageSid });
    
    // Process incoming message here
    const response = \`Received your message: "\${Body}"\`;
    
    res.set('Content-Type', 'text/xml');
    res.send(\`
      <?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Message>\${response}</Message>
      </Response>
    \`);
  } catch (error) {
    console.error('Twilio webhook error:', error);
    res.status(500).send('Error processing webhook');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Twilio webhook server running on port \${PORT}\`);
});`
    },
    "openai": {
      nodejs: `// OpenAI Integration Webhook
const express = require('express');
const OpenAI = require('openai');
const app = express();

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/webhook/openai/chat', async (req, res) => {
  try {
    const { message, model = 'gpt-4o-mini', maxTokens = 150 } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that provides concise and accurate responses.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: maxTokens,
      temperature: 0.7
    });
    
    const response = completion.choices[0].message.content;
    
    console.log('OpenAI response generated successfully');
    
    res.status(200).json({
      success: true,
      response: response,
      model: model,
      usage: completion.usage
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Generate image with DALL-E
app.post('/webhook/openai/image', async (req, res) => {
  try {
    const { prompt, size = '1024x1024', quality = 'standard' } = req.body;
    
    const image = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: size,
      quality: quality
    });
    
    console.log('Image generated successfully');
    
    res.status(200).json({
      success: true,
      imageUrl: image.data[0].url,
      revisedPrompt: image.data[0].revised_prompt
    });
  } catch (error) {
    console.error('OpenAI image error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`OpenAI webhook server running on port \${PORT}\`);
});`
    }
  };

  const generateWebhookCode = () => {
    let code = "";
    
    if (!language) {
      toast({
        title: "Please select a language",
        description: "Choose a programming language to generate webhook code",
        variant: "destructive"
      });
      return;
    }

    // Base starter code
    code = starterCodes[language] || starterCodes.nodejs;

    // Add authentication if selected
    if (authType) {
      code = addAuthenticationCode(code, authType, language);
    }

    // Add functionality-specific code
    if (functionality) {
      code = addFunctionalityCode(code, functionality, language);
    }

    setGeneratedCode(code);
    toast({
      title: "Webhook code generated!",
      description: "Your webhook code is ready for deployment"
    });
  };

  const addAuthenticationCode = (code, auth, lang) => {
    const authMiddleware = {
      nodejs: {
        oauth2: `
// OAuth2 middleware
const verifyOAuth2Token = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  try {
    // Verify token with OAuth2 provider
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};`,
        jwt: `
// JWT middleware
const jwt = require('jsonwebtoken');
const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};`,
        apikey: `
// API Key middleware
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) return res.status(401).json({ error: 'API key required' });
  
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  next();
};`
      }
    };

    return code + (authMiddleware[lang]?.[auth] || '');
  };

  const addFunctionalityCode = (code, func, lang) => {
    // Add specific functionality based on description
    const functionalitySnippets = {
      nodejs: `
// Custom functionality: ${func}
const handleCustomLogic = async (data) => {
  // Implementation for: ${func}
  console.log('Processing:', data);
  return { processed: true, timestamp: new Date().toISOString() };
};`
    };

    return code + (functionalitySnippets[lang] || '');
  };

  const useTemplate = (templateId) => {
    const template = templateCodes[templateId];
    if (template && language && template[language]) {
      setGeneratedCode(template[language]);
      setSelectedTemplate(templateId);
      toast({
        title: "Template applied!",
        description: `${prebuiltTemplates.find(t => t.id === templateId)?.name} template has been loaded`
      });
    } else if (template) {
      // Default to Node.js if language not selected or not available
      setGeneratedCode(template.nodejs || '');
      setSelectedTemplate(templateId);
      toast({
        title: "Template applied!",
        description: `${prebuiltTemplates.find(t => t.id === templateId)?.name} template has been loaded (Node.js version)`
      });
    } else {
      toast({
        title: "Template not available",
        description: "This template is not yet implemented for the selected language",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Webhook code has been copied to your clipboard"
    });
  };

  const deployToCloud = (platform) => {
    toast({
      title: `Deploy to ${platform}`,
      description: `Deployment instructions for ${platform} will be provided`,
    });
  };

  // Group templates by category
  const groupedTemplates = prebuiltTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {});

  const getCategoryIcon = (category) => {
    const icons = {
      "Data Fetching": <Database className="h-5 w-5 text-blue-500" />,
      "Database": <Database className="h-5 w-5 text-green-500" />,
      "Communication": <MessageSquare className="h-5 w-5 text-purple-500" />,
      "AI Services": <Cpu className="h-5 w-5 text-orange-500" />,
      "E-commerce": <Zap className="h-5 w-5 text-yellow-500" />,
      "Analytics": <Zap className="h-5 w-5 text-red-500" />,
      "Social": <Phone className="h-5 w-5 text-pink-500" />,
      "Storage": <Cloud className="h-5 w-5 text-gray-500" />
    };
    return icons[category] || <Zap className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Webhook Generator</h1>
          <p className="text-xl text-gray-600">
            Generate production-ready webhook code with built-in authentication, error handling, and testing capabilities
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="generator">Code Generator</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Webhook Configuration
                  </CardTitle>
                  <CardDescription>Configure your webhook parameters and generate code</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="language">Programming Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            <span className="flex items-center gap-2">
                              <span>{lang.icon}</span>
                              {lang.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="auth">Authentication Type</Label>
                    <Select value={authType} onValueChange={setAuthType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select authentication" />
                      </SelectTrigger>
                      <SelectContent>
                        {authTypes.map((auth) => (
                          <SelectItem key={auth.value} value={auth.value}>
                            <div>
                              <div className="font-medium">{auth.label}</div>
                              <div className="text-sm text-gray-500">{auth.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="functionality">Functionality Description</Label>
                    <Textarea
                      id="functionality"
                      placeholder="Describe what your webhook should do. E.g., 'Process payment confirmations and update order status'"
                      rows={4}
                      value={functionality}
                      onChange={(e) => setFunctionality(e.target.value)}
                    />
                  </div>

                  <Button onClick={generateWebhookCode} className="w-full" size="lg">
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Webhook Code
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generated Webhook Code</CardTitle>
                  <CardDescription>Production-ready webhook implementation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      value={generatedCode}
                      readOnly
                      rows={20}
                      placeholder="Generated webhook code will appear here..."
                      className="font-mono text-sm"
                    />
                    {generatedCode && (
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => copyToClipboard(generatedCode)}
                          className="flex-1"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Code
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 border-dashed border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">Starter Templates</CardTitle>
                  <CardDescription className="text-blue-600">
                    Basic webhook implementations to get you started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={() => setGeneratedCode(starterCodes.nodejs)}>
                      🟢 Node.js Starter
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => setGeneratedCode(starterCodes.python)}>
                      🐍 Python Starter
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => setGeneratedCode(starterCodes.java)}>
                      ☕ Java Starter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {Object.entries(groupedTemplates).map(([category, templates]) => (
                <div key={category} className="space-y-4">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
                  </div>
                  {templates.map((template) => (
                    <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <span>{template.icon}</span>
                            {template.name}
                          </span>
                          <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                        </CardTitle>
                        <CardDescription className="text-xs">{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          className="w-full" 
                          size="sm"
                          onClick={() => useTemplate(template.id)}
                        >
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Webhook Testing
                  </CardTitle>
                  <CardDescription>Test your webhook with mock data and automated scenarios</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input 
                      id="webhook-url"
                      placeholder="https://your-webhook-url.com/webhook"
                      className="font-mono"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="test-payload">Test Payload (JSON)</Label>
                    <Textarea
                      id="test-payload"
                      placeholder='{"event": "test", "data": {"id": "123", "status": "completed"}}'
                      rows={8}
                      className="font-mono"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Send Test
                    </Button>
                    <Button variant="outline">
                      Load Sample Data
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Test Results</CardTitle>
                  <CardDescription>Response and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-2">Response Status</div>
                      <div className="font-mono text-green-600">200 OK</div>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-2">Response Time</div>
                      <div className="font-mono">142ms</div>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-2">Response Body</div>
                      <div className="font-mono text-sm">{"{"}"success": true{"}"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deployment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => deployToCloud('Google Cloud Platform')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-blue-500" />
                    Google Cloud Platform
                  </CardTitle>
                  <CardDescription>Cloud Functions / Cloud Run / Compute Engine / GKE</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• Serverless & Container options</div>
                    <div>• Auto-scaling capabilities</div>
                    <div>• Global load balancing</div>
                  </div>
                  <Button className="w-full mt-4">Deploy to GCP</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => deployToCloud('AWS Lambda')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-orange-500" />
                    AWS Lambda
                  </CardTitle>
                  <CardDescription>Deploy to AWS serverless functions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• Serverless deployment</div>
                    <div>• Auto-scaling</div>
                    <div>• Pay per execution</div>
                  </div>
                  <Button className="w-full mt-4">Deploy to AWS</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => deployToCloud('Firebase')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-yellow-500" />
                    Firebase Functions
                  </CardTitle>
                  <CardDescription>Deploy to Google Cloud Functions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• Integrated with Firebase</div>
                    <div>• Real-time database</div>
                    <div>• Easy authentication</div>
                  </div>
                  <Button className="w-full mt-4">Deploy to Firebase</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => deployToCloud('GitHub')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    GitHub Actions
                  </CardTitle>
                  <CardDescription>Deploy with CI/CD pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• Automated deployment</div>
                    <div>• Version control</div>
                    <div>• Custom workflows</div>
                  </div>
                  <Button className="w-full mt-4">Setup CI/CD</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => deployToCloud('Ngrok')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-500" />
                    Ngrok Tunnel
                  </CardTitle>
                  <CardDescription>Expose localhost for testing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• Local development</div>
                    <div>• Secure tunneling</div>
                    <div>• Instant testing</div>
                  </div>
                  <Button className="w-full mt-4">Create Tunnel</Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Deployment Configuration</CardTitle>
                <CardDescription>Configure environment variables and deployment settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="env-name">Environment Variable</Label>
                    <Input id="env-name" placeholder="API_KEY" />
                  </div>
                  <div>
                    <Label htmlFor="env-value">Value</Label>
                    <Input id="env-value" type="password" placeholder="your-secret-key" />
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Add Environment Variable
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WebhookGenerator;
