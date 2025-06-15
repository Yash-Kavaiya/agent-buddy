
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ContactSupportChannels } from "@/components/contact/ContactSupportChannels";
import { ContactIntegrations } from "@/components/contact/ContactIntegrations";
import { ContactEnterpriseFeatures } from "@/components/contact/ContactEnterpriseFeatures";
import { ContactSLADisplay } from "@/components/contact/ContactSLADisplay";
import { ContactFormAdvanced } from "@/components/contact/ContactFormAdvanced";
import { MessageSquare, Phone, Mail, Users, Clock, Shield, Globe, Zap, Bot, ChevronRight } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [selectedIssueType, setSelectedIssueType] = useState<string>("");
  const [userTier, setUserTier] = useState<string>("free");

  const supportMetrics = {
    responseTime: "< 2 mins",
    satisfaction: 98,
    issuesResolved: "99.9%",
    availableAgents: 24
  };

  const urgencyLevels = [
    { value: "low", label: "Low - General inquiry", sla: "24 hours", color: "bg-green-500" },
    { value: "medium", label: "Medium - Technical issue", sla: "4 hours", color: "bg-yellow-500" },
    { value: "high", label: "High - Service disruption", sla: "1 hour", color: "bg-orange-500" },
    { value: "critical", label: "Critical - Production down", sla: "15 minutes", color: "bg-red-500" }
  ];

  const cloudServices = [
    { name: "Dialogflow CX", status: "Operational", uptime: "99.9%" },
    { name: "Dialogflow ES", status: "Operational", uptime: "99.8%" },
    { name: "CCAI Platform", status: "Operational", uptime: "99.9%" },
    { name: "Speech Services", status: "Operational", uptime: "99.7%" },
    { name: "Translation API", status: "Operational", uptime: "99.8%" },
    { name: "Vertex AI", status: "Operational", uptime: "99.6%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Enterprise Support Hub
            </h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Comprehensive multi-channel support powered by Google Cloud infrastructure
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                <Bot className="w-4 h-4 mr-2" />
                AI-Powered Routing
              </Badge>
              <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                <Shield className="w-4 h-4 mr-2" />
                Enterprise Security
              </Badge>
              <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                <Globe className="w-4 h-4 mr-2" />
                125+ Languages
              </Badge>
              <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                <Zap className="w-4 h-4 mr-2" />
                99.9% Uptime SLA
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Support Metrics Dashboard */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-gray-900">{supportMetrics.responseTime}</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">{supportMetrics.satisfaction}%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
              <Progress value={supportMetrics.satisfaction} className="mt-2" />
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">{supportMetrics.issuesResolved}</div>
              <div className="text-sm text-gray-600">Issues Resolved</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-gray-900">{supportMetrics.availableAgents}</div>
              <div className="text-sm text-gray-600">Available Agents</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="support" className="space-y-8">
          <TabsList className="grid grid-cols-1 sm:grid-cols-5 w-full max-w-2xl mx-auto">
            <TabsTrigger value="support">Support Channels</TabsTrigger>
            <TabsTrigger value="contact">Contact Form</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            <TabsTrigger value="status">Service Status</TabsTrigger>
          </TabsList>

          <TabsContent value="support">
            <ContactSupportChannels userTier={userTier} setUserTier={setUserTier} />
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ContactFormAdvanced 
                  selectedIssueType={selectedIssueType}
                  setSelectedIssueType={setSelectedIssueType}
                  urgencyLevels={urgencyLevels}
                />
              </div>
              <div className="space-y-6">
                <ContactSLADisplay urgencyLevels={urgencyLevels} userTier={userTier} />
                
                {/* Context Collection Display */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-blue-600" />
                      Auto Context Collection
                    </CardTitle>
                    <CardDescription>
                      AI automatically gathers system information to expedite support
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span>Browser Environment</span>
                      <Badge variant="outline">Detected</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Project Configuration</span>
                      <Badge variant="outline">Analyzed</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Error Logs</span>
                      <Badge variant="outline">Available</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Performance Metrics</span>
                      <Badge variant="outline">Collected</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integrations">
            <ContactIntegrations />
          </TabsContent>

          <TabsContent value="enterprise">
            <ContactEnterpriseFeatures />
          </TabsContent>

          <TabsContent value="status">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Google Cloud Services Status</CardTitle>
                  <CardDescription>Real-time status of integrated services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cloudServices.map((service) => (
                      <div key={service.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-gray-600">Uptime: {service.uptime}</div>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {service.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Migration Tools Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dialogflow ES → CX Migration</CardTitle>
                    <CardDescription>Automated migration tools and support</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Migration Wizard</span>
                      <Badge className="bg-green-100 text-green-800">Available</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Compatibility Checker</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Expert Consultation</span>
                      <Badge className="bg-blue-100 text-blue-800">Book Session</Badge>
                    </div>
                    <Button className="w-full">
                      Start Migration Assessment
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>API Performance Metrics</CardTitle>
                    <CardDescription>Real-time API performance monitoring</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>DetectIntent API</span>
                        <span>1.2s avg</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Webhook Response</span>
                        <span>0.8s avg</span>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Speech-to-Text</span>
                        <span>0.5s avg</span>
                      </div>
                      <Progress value={95} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Contact;
