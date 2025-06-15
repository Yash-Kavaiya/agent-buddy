import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bot, Cloud, MessageSquare, Headphones, Mic, Globe, Brain, Code, Zap, Shield, BarChart3, Settings } from "lucide-react";

const ContactIntegrations = () => {
  const coreIntegrations = [
    {
      icon: Bot,
      name: "Conversational Agents Console",
      description: "Unified CX and Vertex AI Agents interface",
      status: "Active",
      uptime: 99.9,
      features: ["Agent Management", "Real-time Monitoring", "Performance Analytics", "Multi-environment Support"],
      tier: "All Plans"
    },
    {
      icon: Headphones,
      name: "CCAI Platform",
      description: "Contact center routing with Agent Assist",
      status: "Active",
      uptime: 99.8,
      features: ["Smart Routing", "Agent Assist", "Conversational Insights", "Quality Management"],
      tier: "Enterprise"
    },
    {
      icon: Mic,
      name: "Speech Services",
      description: "Speech-to-Text and Text-to-Speech with 220+ voices",
      status: "Active",
      uptime: 99.7,
      features: ["Real-time STT", "Neural TTS", "Voice Customization", "Multi-language Support"],
      tier: "Pro+"
    },
    {
      icon: Globe,
      name: "Translation Services",
      description: "Real-time language detection with 125+ languages",
      status: "Active",
      uptime: 99.6,
      features: ["Auto-detection", "Real-time Translation", "Custom Models", "Batch Processing"],
      tier: "All Plans"
    },
    {
      icon: Brain,
      name: "Vertex AI Integration",
      description: "Advanced ML models and generative AI capabilities",
      status: "Active",
      uptime: 99.5,
      features: ["Custom Models", "Generative AI", "AutoML", "Model Deployment"],
      tier: "Enterprise"
    }
  ];

  const enterpriseFeatures = [
    {
      icon: Shield,
      name: "Security & Compliance",
      description: "Enterprise-grade security with comprehensive compliance",
      features: [
        "VPC Service Controls for network isolation",
        "SOC2 Type II certification",
        "ISO27001 compliance",
        "GDPR and CCPA compliance",
        "Data encryption at rest and in transit",
        "Advanced threat protection"
      ]
    },
    {
      icon: Zap,
      name: "Scalability",
      description: "Multi-region deployment supporting high-volume operations",
      features: [
        "Auto-scaling infrastructure",
        "Multi-region failover",
        "Load balancing",
        "CDN optimization",
        "Performance monitoring",
        "Capacity planning"
      ]
    },
    {
      icon: BarChart3,
      name: "Data Governance",
      description: "Comprehensive audit logging and data residency controls",
      features: [
        "Audit trail logging",
        "Data residency controls",
        "Retention policies",
        "Access controls",
        "Data lineage tracking",
        "Compliance reporting"
      ]
    },
    {
      icon: Settings,
      name: "Cost Management",
      description: "Transparent pricing tools and usage monitoring",
      features: [
        "Real-time usage monitoring",
        "Cost allocation",
        "Budget alerts",
        "Usage optimization",
        "Billing analytics",
        "Resource management"
      ]
    }
  ];

  const dialogflowComparison = [
    {
      feature: "Agent Limit",
      es: "20 agents",
      cx: "100 agents",
      advantage: "cx"
    },
    {
      feature: "Flow Design",
      es: "Intent-based",
      cx: "Visual state machine",
      advantage: "cx"
    },
    {
      feature: "Testing",
      es: "Basic simulator",
      cx: "A/B testing + Analytics",
      advantage: "cx"
    },
    {
      feature: "Pricing",
      es: "Free tier available",
      cx: "Usage-based",
      advantage: "es"
    },
    {
      feature: "Learning Curve",
      es: "Beginner-friendly",
      cx: "Advanced features",
      advantage: "es"
    },
    {
      feature: "Enterprise Features",
      es: "Limited",
      cx: "Full enterprise suite",
      advantage: "cx"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "issue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "All Plans": return "bg-blue-100 text-blue-800";
      case "Pro+": return "bg-purple-100 text-purple-800";
      case "Enterprise": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Google Cloud Integration Stack</h2>
        <p className="text-gray-600">Comprehensive integration with Google Cloud AI and support infrastructure</p>
      </div>

      {/* Core Integrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {coreIntegrations.map((integration, index) => {
          const Icon = integration.icon;
          
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <CardDescription>{integration.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status}
                    </Badge>
                    <Badge variant="outline" className={getTierColor(integration.tier)}>
                      {integration.tier}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uptime</span>
                    <span className="font-medium">{integration.uptime}%</span>
                  </div>
                  <Progress value={integration.uptime} className="h-2" />
                </div>
                
                <div>
                  <div className="font-medium mb-2">Key Features</div>
                  <div className="grid grid-cols-2 gap-1">
                    {integration.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs justify-start">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enterprise Features */}
      <div>
        <h3 className="text-xl font-bold mb-4">Enterprise Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enterpriseFeatures.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-purple-600" />
                    {feature.name}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Dialogflow ES vs CX Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Dialogflow ES vs CX Comparison</CardTitle>
          <CardDescription>Choose the right platform for your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Feature</th>
                  <th className="text-center p-4">Dialogflow ES</th>
                  <th className="text-center p-4">Dialogflow CX</th>
                  <th className="text-center p-4">Recommended</th>
                </tr>
              </thead>
              <tbody>
                {dialogflowComparison.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{item.feature}</td>
                    <td className="text-center p-4">
                      <span className={item.advantage === "es" ? "font-semibold text-green-600" : ""}>
                        {item.es}
                      </span>
                    </td>
                    <td className="text-center p-4">
                      <span className={item.advantage === "cx" ? "font-semibold text-green-600" : ""}>
                        {item.cx}
                      </span>
                    </td>
                    <td className="text-center p-4">
                      <Badge variant={item.advantage === "es" ? "default" : "secondary"}>
                        {item.advantage === "es" ? "ES" : "CX"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Choose Dialogflow ES if:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• You're new to conversational AI</li>
                <li>• You need a simple, cost-effective solution</li>
                <li>• You want to use the free tier</li>
                <li>• You have basic conversational requirements</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Choose Dialogflow CX if:</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• You need enterprise-scale features</li>
                <li>• You want advanced flow management</li>
                <li>• You require comprehensive testing tools</li>
                <li>• You need multi-environment support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Migration Support */}
      <Card>
        <CardHeader>
          <CardTitle>ES to CX Migration Support</CardTitle>
          <CardDescription>Comprehensive support for transitioning from ES to CX</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Code className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-semibold mb-1">Automated Tools</h4>
              <p className="text-sm text-gray-600">Migration wizard with compatibility checking</p>
              <Button variant="outline" className="mt-2" size="sm">
                Start Migration
              </Button>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Headphones className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h4 className="font-semibold mb-1">Expert Consultation</h4>
              <p className="text-sm text-gray-600">1-on-1 sessions with migration specialists</p>
              <Button variant="outline" className="mt-2" size="sm">
                Book Session
              </Button>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Shield className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h4 className="font-semibold mb-1">Risk Assessment</h4>
              <p className="text-sm text-gray-600">Comprehensive analysis of migration complexity</p>
              <Button variant="outline" className="mt-2" size="sm">
                Get Assessment
              </Button>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Migration Timeline</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-medium text-yellow-800">Week 1-2</div>
                <div className="text-yellow-700">Assessment & Planning</div>
              </div>
              <div>
                <div className="font-medium text-yellow-800">Week 3-4</div>
                <div className="text-yellow-700">Agent Conversion</div>
              </div>
              <div>
                <div className="font-medium text-yellow-800">Week 5-6</div>
                <div className="text-yellow-700">Testing & Validation</div>
              </div>
              <div>
                <div className="font-medium text-yellow-800">Week 7-8</div>
                <div className="text-yellow-700">Go-live & Support</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactIntegrations;
