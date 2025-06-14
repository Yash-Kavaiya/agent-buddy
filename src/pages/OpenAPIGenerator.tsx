
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  FileText, 
  Download, 
  Eye, 
  Settings, 
  Zap, 
  Code, 
  Globe, 
  TestTube,
  GitBranch,
  Play,
  Copy,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WebhookEndpoint {
  id: string;
  name: string;
  path: string;
  method: string;
  description: string;
  parameters: Parameter[];
  responses: Response[];
  authenticated: boolean;
}

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example: any;
}

interface Response {
  statusCode: number;
  description: string;
  schema: any;
  examples: any;
}

interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
  };
  paths: Record<string, any>;
  components: {
    schemas: Record<string, any>;
    securitySchemes: Record<string, any>;
  };
}

const OpenAPIGenerator = () => {
  const [activeTab, setActiveTab] = useState("discovery");
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([]);
  const [generatedSpec, setGeneratedSpec] = useState<OpenAPISpec | null>(null);
  const [apiTitle, setApiTitle] = useState("Webhook API");
  const [apiVersion, setApiVersion] = useState("1.0.0");
  const [apiDescription, setApiDescription] = useState("Generated webhook API documentation");
  const [baseUrl, setBaseUrl] = useState("https://api.example.com");
  const [authType, setAuthType] = useState("bearer");
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const { toast } = useToast();

  const sampleWebhooks: WebhookEndpoint[] = [
    {
      id: "1",
      name: "Payment Webhook",
      path: "/webhook/payment",
      method: "POST",
      description: "Handles payment confirmation webhooks from payment providers",
      authenticated: true,
      parameters: [
        {
          name: "event_type",
          type: "string",
          required: true,
          description: "Type of payment event",
          example: "payment.completed"
        },
        {
          name: "payment_id",
          type: "string",
          required: true,
          description: "Unique payment identifier",
          example: "pay_1234567890"
        },
        {
          name: "amount",
          type: "number",
          required: true,
          description: "Payment amount in cents",
          example: 2000
        }
      ],
      responses: [
        {
          statusCode: 200,
          description: "Payment processed successfully",
          schema: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" }
            }
          },
          examples: {
            success: true,
            message: "Payment processed successfully"
          }
        }
      ]
    },
    {
      id: "2",
      name: "User Registration",
      path: "/webhook/user/register",
      method: "POST",
      description: "Processes new user registration events",
      authenticated: true,
      parameters: [
        {
          name: "user_id",
          type: "string",
          required: true,
          description: "Unique user identifier",
          example: "user_abc123"
        },
        {
          name: "email",
          type: "string",
          required: true,
          description: "User email address",
          example: "user@example.com"
        },
        {
          name: "timestamp",
          type: "string",
          required: true,
          description: "Registration timestamp",
          example: "2024-01-15T10:30:00Z"
        }
      ],
      responses: [
        {
          statusCode: 200,
          description: "User registration processed",
          schema: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              user_id: { type: "string" }
            }
          },
          examples: {
            success: true,
            user_id: "user_abc123"
          }
        }
      ]
    }
  ];

  const clientLanguages = [
    { value: "javascript", label: "JavaScript/Node.js", icon: "🟨" },
    { value: "python", label: "Python", icon: "🐍" },
    { value: "java", label: "Java", icon: "☕" },
    { value: "csharp", label: "C#", icon: "🔷" },
    { value: "go", label: "Go", icon: "🔵" },
    { value: "php", label: "PHP", icon: "🐘" },
    { value: "ruby", label: "Ruby", icon: "💎" },
    { value: "swift", label: "Swift", icon: "🍎" }
  ];

  const discoverWebhooks = async () => {
    setIsDiscovering(true);
    
    // Simulate discovery process
    setTimeout(() => {
      setWebhooks(sampleWebhooks);
      setIsDiscovering(false);
      toast({
        title: "Discovery completed!",
        description: `Found ${sampleWebhooks.length} webhook endpoints`
      });
    }, 2000);
  };

  const generateOpenAPISpec = () => {
    const spec: OpenAPISpec = {
      openapi: "3.0.3",
      info: {
        title: apiTitle,
        version: apiVersion,
        description: apiDescription
      },
      paths: {},
      components: {
        schemas: {},
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          },
          apiKey: {
            type: "apiKey",
            in: "header",
            name: "X-API-Key"
          }
        }
      }
    };

    // Generate paths from webhooks
    webhooks.forEach(webhook => {
      const pathKey = webhook.path;
      if (!spec.paths[pathKey]) {
        spec.paths[pathKey] = {};
      }

      const operation = {
        summary: webhook.name,
        description: webhook.description,
        tags: ["Webhooks"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {}
              }
            }
          }
        },
        responses: {},
        security: webhook.authenticated ? [{ bearerAuth: [] }] : []
      };

      // Add parameters to request body schema
      webhook.parameters.forEach(param => {
        operation.requestBody.content["application/json"].schema.properties[param.name] = {
          type: param.type,
          description: param.description,
          example: param.example
        };
      });

      // Add responses
      webhook.responses.forEach(response => {
        operation.responses[response.statusCode.toString()] = {
          description: response.description,
          content: {
            "application/json": {
              schema: response.schema,
              examples: {
                default: {
                  value: response.examples
                }
              }
            }
          }
        };
      });

      spec.paths[pathKey][webhook.method.toLowerCase()] = operation;
    });

    setGeneratedSpec(spec);
    toast({
      title: "OpenAPI specification generated!",
      description: "Your API documentation is ready"
    });
  };

  const downloadSpec = (format: 'json' | 'yaml') => {
    if (!generatedSpec) return;

    const content = format === 'json' 
      ? JSON.stringify(generatedSpec, null, 2)
      : convertToYAML(generatedSpec);
    
    const blob = new Blob([content], { 
      type: format === 'json' ? 'application/json' : 'application/x-yaml' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `openapi.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: `Specification downloaded!`,
      description: `OpenAPI spec saved as ${format.toUpperCase()} file`
    });
  };

  const convertToYAML = (obj: any): string => {
    // Simple YAML conversion (in a real app, use a proper YAML library)
    return JSON.stringify(obj, null, 2)
      .replace(/"/g, '')
      .replace(/,/g, '')
      .replace(/\{/g, '')
      .replace(/\}/g, '')
      .replace(/\[/g, '- ')
      .replace(/\]/g, '');
  };

  const generateClientSDK = (language: string) => {
    const sdkTemplates = {
      javascript: `// Generated JavaScript SDK
class WebhookAPI {
  constructor(apiKey, baseUrl = '${baseUrl}') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async callWebhook(endpoint, data) {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${this.apiKey}\`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async paymentWebhook(paymentData) {
    return this.callWebhook('/webhook/payment', paymentData);
  }

  async userRegistrationWebhook(userData) {
    return this.callWebhook('/webhook/user/register', userData);
  }
}

// Usage example
const client = new WebhookAPI('your-api-key');
client.paymentWebhook({
  event_type: 'payment.completed',
  payment_id: 'pay_1234567890',
  amount: 2000
});`,
      python: `# Generated Python SDK
import requests
import json

class WebhookAPI:
    def __init__(self, api_key, base_url='${baseUrl}'):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }

    def call_webhook(self, endpoint, data):
        response = requests.post(
            f'{self.base_url}{endpoint}',
            headers=self.headers,
            json=data
        )
        return response.json()

    def payment_webhook(self, payment_data):
        return self.call_webhook('/webhook/payment', payment_data)

    def user_registration_webhook(self, user_data):
        return self.call_webhook('/webhook/user/register', user_data)

# Usage example
client = WebhookAPI('your-api-key')
client.payment_webhook({
    'event_type': 'payment.completed',
    'payment_id': 'pay_1234567890',
    'amount': 2000
})`
    };

    return sdkTemplates[language as keyof typeof sdkTemplates] || sdkTemplates.javascript;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Content has been copied to your clipboard"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">OpenAPI Spec Generator</h1>
          <p className="text-xl text-gray-600">
            Automatically generate comprehensive API documentation for your webhook endpoints with interactive testing and client SDK generation
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="discovery">Discovery</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="sdk">SDK Generation</TabsTrigger>
            <TabsTrigger value="versions">Versions</TabsTrigger>
          </TabsList>

          <TabsContent value="discovery" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Webhook Auto-Discovery
                  </CardTitle>
                  <CardDescription>
                    Automatically analyze your codebase or endpoints to discover webhook implementations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="source-url">Source URL or Repository</Label>
                    <Input 
                      id="source-url"
                      placeholder="https://github.com/user/repo or https://api.example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="webhook-pattern">Webhook Path Pattern</Label>
                    <Input 
                      id="webhook-pattern"
                      placeholder="/webhook/* or /api/webhooks/*"
                      defaultValue="/webhook/*"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Discovery Method</Label>
                    <Select defaultValue="static">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="static">Static Code Analysis</SelectItem>
                        <SelectItem value="runtime">Runtime Inspection</SelectItem>
                        <SelectItem value="openapi">Existing OpenAPI Spec</SelectItem>
                        <SelectItem value="manual">Manual Configuration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={discoverWebhooks} 
                    disabled={isDiscovering}
                    className="w-full"
                    size="lg"
                  >
                    {isDiscovering ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Discovering Webhooks...
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Start Discovery
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Discovered Endpoints</CardTitle>
                  <CardDescription>
                    {webhooks.length} webhook endpoints found
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {webhooks.length === 0 ? (
                      <div className="text-center py-8">
                        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No webhooks discovered yet</p>
                        <p className="text-sm text-gray-400">Start discovery to find webhook endpoints</p>
                      </div>
                    ) : (
                      webhooks.map((webhook) => (
                        <div key={webhook.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{webhook.name}</h4>
                              <p className="text-sm text-gray-600">{webhook.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant={webhook.method === 'POST' ? 'default' : 'secondary'}>
                                {webhook.method}
                              </Badge>
                              {webhook.authenticated && (
                                <Badge variant="outline">Auth Required</Badge>
                              )}
                            </div>
                          </div>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {webhook.path}
                          </code>
                          <div className="mt-2 text-xs text-gray-500">
                            {webhook.parameters.length} parameters, {webhook.responses.length} responses
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  API Configuration
                </CardTitle>
                <CardDescription>Configure your API metadata and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="api-title">API Title</Label>
                    <Input 
                      id="api-title"
                      value={apiTitle}
                      onChange={(e) => setApiTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="api-version">API Version</Label>
                    <Input 
                      id="api-version"
                      value={apiVersion}
                      onChange={(e) => setApiVersion(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="api-description">API Description</Label>
                  <Textarea 
                    id="api-description"
                    value={apiDescription}
                    onChange={(e) => setApiDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="base-url">Base URL</Label>
                    <Input 
                      id="base-url"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="auth-type">Authentication Type</Label>
                    <Select value={authType} onValueChange={setAuthType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bearer">Bearer Token</SelectItem>
                        <SelectItem value="apikey">API Key</SelectItem>
                        <SelectItem value="oauth2">OAuth2</SelectItem>
                        <SelectItem value="basic">Basic Auth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={generateOpenAPISpec} className="w-full" size="lg">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate OpenAPI Specification
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Generated OpenAPI Spec</CardTitle>
                  <CardDescription>Your complete API specification</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      value={generatedSpec ? JSON.stringify(generatedSpec, null, 2) : 'Generate specification to see output...'}
                      readOnly
                      rows={20}
                      className="font-mono text-sm"
                    />
                    {generatedSpec && (
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => copyToClipboard(JSON.stringify(generatedSpec, null, 2))}
                          className="flex-1"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy JSON
                        </Button>
                        <Button 
                          onClick={() => downloadSpec('json')}
                          variant="outline"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          JSON
                        </Button>
                        <Button 
                          onClick={() => downloadSpec('yaml')}
                          variant="outline"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          YAML
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Interactive Documentation
                  </CardTitle>
                  <CardDescription>Swagger UI preview of your API</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">Interactive Swagger UI</p>
                      <p className="text-sm text-gray-400 mb-4">
                        Your generated API documentation with interactive testing capabilities
                      </p>
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Open Swagger UI
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5" />
                    API Testing
                  </CardTitle>
                  <CardDescription>Test your webhook endpoints directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="test-endpoint">Select Endpoint</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose endpoint to test" />
                      </SelectTrigger>
                      <SelectContent>
                        {webhooks.map((webhook) => (
                          <SelectItem key={webhook.id} value={webhook.id}>
                            {webhook.method} {webhook.path}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="test-payload">Request Payload</Label>
                    <Textarea
                      id="test-payload"
                      placeholder='{"event_type": "test", "data": {...}}'
                      rows={8}
                      className="font-mono"
                    />
                  </div>

                  <div>
                    <Label htmlFor="auth-token">Authentication Token</Label>
                    <Input 
                      id="auth-token"
                      type="password"
                      placeholder="Bearer token or API key"
                    />
                  </div>

                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Send Test Request
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Test Results</CardTitle>
                  <CardDescription>Response and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-800">200 OK</span>
                      </div>
                      <div className="text-sm text-green-700">
                        Response time: 142ms
                      </div>
                    </div>

                    <div>
                      <Label>Response Headers</Label>
                      <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                        content-type: application/json<br/>
                        x-response-time: 142ms<br/>
                        x-request-id: req-abc123
                      </div>
                    </div>

                    <div>
                      <Label>Response Body</Label>
                      <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                        {JSON.stringify({
                          success: true,
                          message: "Webhook processed successfully",
                          timestamp: "2024-01-15T10:30:00Z"
                        }, null, 2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sdk" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Client SDK Generation
                  </CardTitle>
                  <CardDescription>Generate client libraries in multiple languages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Programming Language</Label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {clientLanguages.map((lang) => (
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="package-name">Package Name</Label>
                      <Input 
                        id="package-name"
                        placeholder="webhook-api-client"
                      />
                    </div>
                    <div>
                      <Label htmlFor="package-version">Version</Label>
                      <Input 
                        id="package-version"
                        placeholder="1.0.0"
                      />
                    </div>
                  </div>

                  <Button className="w-full">
                    <Code className="h-4 w-4 mr-2" />
                    Generate SDK
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generated SDK Preview</CardTitle>
                  <CardDescription>
                    {clientLanguages.find(l => l.value === selectedLanguage)?.label} client library
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      value={generateClientSDK(selectedLanguage)}
                      readOnly
                      rows={20}
                      className="font-mono text-sm"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => copyToClipboard(generateClientSDK(selectedLanguage))}
                        className="flex-1"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Code
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download SDK
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="versions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Version Management
                  </CardTitle>
                  <CardDescription>Manage API versions and track changes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-semibold">v1.2.0</div>
                        <div className="text-sm text-gray-600">Current version</div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-semibold">v1.1.0</div>
                        <div className="text-sm text-gray-600">Previous stable</div>
                      </div>
                      <Badge variant="outline">Deprecated</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-semibold">v1.0.0</div>
                        <div className="text-sm text-gray-600">Initial release</div>
                      </div>
                      <Badge variant="secondary">Archived</Badge>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <GitBranch className="h-4 w-4 mr-2" />
                    Create New Version
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Migration Guide</CardTitle>
                  <CardDescription>API changes and migration instructions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">v1.1.0 → v1.2.0</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Added new payment webhook endpoint</li>
                        <li>• Enhanced authentication with JWT support</li>
                        <li>• Improved error response format</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 mb-2">Breaking Changes</h4>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Response format changed for error responses</li>
                        <li>• Authentication header now required</li>
                      </ul>
                    </div>

                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Migration Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OpenAPIGenerator;
