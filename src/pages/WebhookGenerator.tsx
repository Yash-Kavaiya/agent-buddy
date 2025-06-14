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
import { Copy, Download, Play, Settings, Cloud, Github, Zap } from "lucide-react";
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
    { id: "payment", name: "Payment Processing", description: "Stripe, PayPal webhook handlers", category: "E-commerce" },
    { id: "notification", name: "Push Notifications", description: "Firebase, OneSignal integrations", category: "Communication" },
    { id: "email", name: "Email Service", description: "SendGrid, Mailgun handlers", category: "Communication" },
    { id: "analytics", name: "Analytics Tracking", description: "Google Analytics, Mixpanel", category: "Analytics" },
    { id: "social", name: "Social Media", description: "Twitter, Facebook API handlers", category: "Social" },
    { id: "storage", name: "File Storage", description: "AWS S3, Google Cloud Storage", category: "Storage" }
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
                    3 Basic webhook implementations to get you started
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

              {prebuiltTemplates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {template.name}
                      <Badge variant="secondary">{template.category}</Badge>
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        setSelectedTemplate(template.id);
                        toast({
                          title: "Template selected",
                          description: `${template.name} template will be applied to your webhook`
                        });
                      }}
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
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
