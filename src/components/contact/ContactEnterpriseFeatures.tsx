import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Zap, BarChart3, Globe, Users, Clock, Phone, Video, Headphones, Crown, Star, Target, CheckCircle, MessageSquare } from "lucide-react";

const ContactEnterpriseFeatures = () => {
  const apiRequirements = [
    {
      category: "Dialogflow API Integration",
      requirements: [
        "Agent management with multi-environment support",
        "DetectIntent operations with session handling",
        "Webhook management with authentication",
        "Real-time streaming support",
        "Batch processing capabilities"
      ],
      performance: {
        responseTime: "<2s",
        uptime: "99.9%",
        throughput: "1000 req/min"
      }
    },
    {
      category: "Google Cloud APIs",
      requirements: [
        "Speech-to-Text with custom models",
        "Text-to-Speech with neural voices",
        "Translation API with custom glossaries",
        "Natural Language AI processing",
        "Vertex AI model integration"
      ],
      performance: {
        responseTime: "<5s",
        uptime: "99.8%",
        throughput: "500 req/min"
      }
    },
    {
      category: "Third-Party Integrations",
      requirements: [
        "CRM system connectivity",
        "Contact center platform integration",
        "Messaging service APIs",
        "Authentication providers",
        "Monitoring and logging services"
      ],
      performance: {
        responseTime: "<3s",
        uptime: "99.7%",
        throughput: "750 req/min"
      }
    }
  ];

  const modernExperience = [
    {
      title: "Progressive Web Application",
      icon: Globe,
      features: [
        "Offline functionality with service workers",
        "Mobile-responsive design",
        "App-like user experience",
        "Push notifications",
        "Background sync"
      ],
      status: "Available"
    },
    {
      title: "Real-Time Collaboration",
      icon: Users,
      features: [
        "Simultaneous multi-user editing",
        "Live cursor tracking",
        "Conflict resolution",
        "Version history",
        "Comment system"
      ],
      status: "Beta"
    },
    {
      title: "Intelligent Assistance",
      icon: Star,
      features: [
        "AI-powered code suggestions",
        "Automated optimization",
        "Performance recommendations",
        "Best practice guidance",
        "Error prediction"
      ],
      status: "Coming Soon"
    },
    {
      title: "Customizable Interface",
      icon: Target,
      features: [
        "Role-based dashboards",
        "Customizable workflows",
        "Adaptive UI based on usage",
        "Dark/light mode",
        "Accessibility options"
      ],
      status: "Available"
    }
  ];

  const accessibilityFeatures = [
    {
      category: "Multi-Language Support",
      description: "Localized interfaces in 40+ languages",
      compliance: "WCAG 2.1 AA",
      features: [
        "RTL language support",
        "Cultural adaptation",
        "Timezone handling",
        "Currency localization",
        "Date format adaptation"
      ]
    },
    {
      category: "Accessibility Compliance",
      description: "Full WCAG 2.1 guidelines implementation",
      compliance: "Section 508",
      features: [
        "Screen reader compatibility",
        "High contrast mode",
        "Font size adjustment",
        "Voice navigation",
        "Alternative text for images"
      ]
    },
    {
      category: "Mobile-First Design",
      description: "Full functionality on all device types",
      compliance: "Responsive Design",
      features: [
        "Touch-optimized interfaces",
        "Gesture support",
        "Offline synchronization",
        "Battery optimization",
        "Network efficiency"
      ]
    },
    {
      category: "Keyboard Navigation",
      description: "Complete keyboard accessibility",
      compliance: "Navigation Standards",
      features: [
        "Tab order optimization",
        "Keyboard shortcuts",
        "Focus indicators",
        "Skip links",
        "Modal management"
      ]
    }
  ];

  const enterpriseSupport = [
    {
      tier: "Dedicated Customer Success Manager",
      icon: Crown,
      features: [
        "Assigned CSM for strategic guidance",
        "Quarterly business reviews",
        "Success planning and metrics",
        "Escalation management",
        "Product roadmap influence"
      ],
      sla: "Same-day response",
      availability: "Business hours"
    },
    {
      tier: "Technical Account Manager",
      icon: Shield,
      features: [
        "Deep technical expertise",
        "Architecture reviews",
        "Performance optimization",
        "Integration support",
        "Custom solution design"
      ],
      sla: "4-hour response",
      availability: "Extended hours"
    },
    {
      tier: "24/7 Premium Support",
      icon: Clock,
      features: [
        "Round-the-clock availability",
        "Priority queue access",
        "Emergency escalation",
        "Proactive monitoring",
        "Critical issue management"
      ],
      sla: "15-minute response",
      availability: "24/7/365"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Enterprise Features & Support</h2>
        <p className="text-gray-600">Comprehensive enterprise-grade capabilities for large-scale deployments</p>
      </div>

      <Tabs defaultValue="api" className="space-y-6">
        <TabsList className="grid grid-cols-1 sm:grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="api">API Integration</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="experience">User Experience</TabsTrigger>
          <TabsTrigger value="support">Enterprise Support</TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="space-y-6">
          <div className="grid gap-6">
            {apiRequirements.map((api, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{api.category}</CardTitle>
                  <CardDescription>Core API integration requirements and capabilities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{api.performance.responseTime}</div>
                      <div className="text-sm text-gray-600">Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">{api.performance.uptime}</div>
                      <div className="text-sm text-gray-600">Uptime SLA</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-purple-600">{api.performance.throughput}</div>
                      <div className="text-sm text-gray-600">Max Throughput</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Key Requirements</h4>
                    <ul className="space-y-2">
                      {api.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Response Time
                </CardTitle>
                <CardDescription>API and webhook performance targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>DetectIntent API</span>
                      <span className="font-medium">1.2s</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="text-xs text-gray-500">Target: &lt;2s</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Webhook Response</span>
                      <span className="font-medium">0.8s</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <div className="text-xs text-gray-500">Target: &lt;5s</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>User Interactions</span>
                      <span className="font-medium">0.3s</span>
                    </div>
                    <Progress value={95} className="h-2" />
                    <div className="text-xs text-gray-500">Target: &lt;2s</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Scalability
                </CardTitle>
                <CardDescription>Auto-scaling and capacity management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Auto-scaling</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Load Balancing</span>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Multi-region</span>
                    <Badge className="bg-green-100 text-green-800">Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Failover</span>
                    <Badge className="bg-green-100 text-green-800">Automated</Badge>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">99.9%</div>
                    <div className="text-xs text-gray-600">Uptime SLA</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-500" />
                  Security
                </CardTitle>
                <CardDescription>Comprehensive security and monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>OAuth2 + RBAC</span>
                    <Badge className="bg-purple-100 text-purple-800">Implemented</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Audit Logging</span>
                    <Badge className="bg-purple-100 text-purple-800">Comprehensive</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Threat Detection</span>
                    <Badge className="bg-purple-100 text-purple-800">Real-time</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Encryption</span>
                    <Badge className="bg-purple-100 text-purple-800">End-to-end</Badge>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">SOC2</div>
                    <div className="text-xs text-gray-600">Type II Certified</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modernExperience.map((experience, index) => {
              const Icon = experience.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-blue-600" />
                        {experience.title}
                      </div>
                      <Badge variant={experience.status === "Available" ? "default" : experience.status === "Beta" ? "secondary" : "outline"}>
                        {experience.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {experience.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility & Inclusion Features</CardTitle>
              <CardDescription>Comprehensive accessibility compliance for inclusive design</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accessibilityFeatures.map((feature, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{feature.category}</h4>
                      <Badge variant="outline">{feature.compliance}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                    <ul className="space-y-1 text-xs">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <div className="grid gap-6">
            {enterpriseSupport.map((support, index) => {
              const Icon = support.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div>{support.tier}</div>
                        <div className="text-sm font-normal text-gray-600">
                          {support.sla} • {support.availability}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Included Services</h4>
                        <ul className="space-y-2 text-sm">
                          {support.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{support.sla}</div>
                            <div className="text-sm text-gray-600">Response SLA</div>
                          </div>
                        </div>
                        <Button className="w-full">
                          Contact {support.tier.split(' ')[0]} Team
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Support Channel Matrix</CardTitle>
              <CardDescription>Available support channels by subscription tier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Support Channel</th>
                      <th className="text-center p-3">Free</th>
                      <th className="text-center p-3">Pro</th>
                      <th className="text-center p-3">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Community Forums
                      </td>
                      <td className="text-center p-3">✅</td>
                      <td className="text-center p-3">✅</td>
                      <td className="text-center p-3">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 flex items-center gap-2">
                        <Headphones className="w-4 h-4" />
                        Live Chat
                      </td>
                      <td className="text-center p-3">❌</td>
                      <td className="text-center p-3">✅</td>
                      <td className="text-center p-3">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Support
                      </td>
                      <td className="text-center p-3">❌</td>
                      <td className="text-center p-3">❌</td>
                      <td className="text-center p-3">✅</td>
                    </tr>
                    <tr>
                      <td className="p-3 flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Video Consultation
                      </td>
                      <td className="text-center p-3">❌</td>
                      <td className="text-center p-3">❌</td>
                      <td className="text-center p-3">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactEnterpriseFeatures;
