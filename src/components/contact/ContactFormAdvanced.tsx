
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Upload, Paperclip, Bot, AlertCircle } from "lucide-react";
import { useState } from "react";

interface ContactFormAdvancedProps {
  selectedIssueType: string;
  setSelectedIssueType: (type: string) => void;
  urgencyLevels: Array<{
    value: string;
    label: string;
    sla: string;
    color: string;
  }>;
}

const ContactFormAdvanced = ({ selectedIssueType, setSelectedIssueType, urgencyLevels }: ContactFormAdvancedProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    subject: "",
    description: "",
    urgency: "",
    category: "",
    environment: "",
    projectId: "",
    agentId: "",
    allowAnalytics: false,
    allowContextCollection: true
  });

  const issueCategories = [
    { value: "technical", label: "Technical Issue", description: "Bugs, errors, or integration problems" },
    { value: "billing", label: "Billing & Pricing", description: "Account, subscription, or payment questions" },
    { value: "feature", label: "Feature Request", description: "New features or enhancements" },
    { value: "migration", label: "Migration Support", description: "ES to CX migration assistance" },
    { value: "performance", label: "Performance", description: "Latency, throughput, or optimization" },
    { value: "security", label: "Security", description: "Authentication, authorization, or compliance" },
    { value: "integration", label: "Integration", description: "Third-party or API integration help" },
    { value: "training", label: "Training", description: "Learning resources or best practices" }
  ];

  const environments = [
    { value: "development", label: "Development" },
    { value: "staging", label: "Staging" },
    { value: "production", label: "Production" },
    { value: "testing", label: "Testing" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here would be the actual form submission logic
  };

  const getUrgencyColor = (urgency: string) => {
    const level = urgencyLevels.find(l => l.value === urgency);
    return level?.color || "bg-gray-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          Intelligent Support Request
        </CardTitle>
        <CardDescription>
          AI-powered form with smart routing and context collection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe" 
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@company.com" 
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="Your Company" 
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="architect">Solution Architect</SelectItem>
                  <SelectItem value="manager">Project Manager</SelectItem>
                  <SelectItem value="admin">System Administrator</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Issue Classification */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">Issue Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => {
                  setFormData({...formData, category: value});
                  setSelectedIssueType(value);
                }}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select issue category" />
                </SelectTrigger>
                <SelectContent>
                  {issueCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div>
                        <div className="font-medium">{category.label}</div>
                        <div className="text-xs text-gray-500">{category.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="urgency">Priority Level *</Label>
              <Select 
                value={formData.urgency} 
                onValueChange={(value) => setFormData({...formData, urgency: value})}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                        <div>
                          <div className="font-medium">{level.label}</div>
                          <div className="text-xs text-gray-500">SLA: {level.sla}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.urgency && (
                <div className="mt-2 p-2 bg-blue-50 rounded-md text-sm">
                  <AlertCircle className="w-4 h-4 inline mr-1 text-blue-600" />
                  Expected response time: {urgencyLevels.find(l => l.value === formData.urgency)?.sla}
                </div>
              )}
            </div>
          </div>

          {/* Technical Context */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Technical Context</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="environment">Environment</Label>
                <Select value={formData.environment} onValueChange={(value) => setFormData({...formData, environment: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    {environments.map((env) => (
                      <SelectItem key={env.value} value={env.value}>
                        {env.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="projectId">Project ID</Label>
                <Input 
                  id="projectId" 
                  value={formData.projectId}
                  onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                  placeholder="your-gcp-project-id" 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="agentId">Agent ID (if applicable)</Label>
              <Input 
                id="agentId" 
                value={formData.agentId}
                onChange={(e) => setFormData({...formData, agentId: e.target.value})}
                placeholder="your-agent-id" 
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input 
              id="subject" 
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              placeholder="Brief description of your issue" 
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea 
              id="description" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Please provide as much detail as possible about your issue, including steps to reproduce, expected vs actual behavior, error messages, etc." 
              rows={6}
              required
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Attachments</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">
                Drop files here or click to upload
              </p>
              <p className="text-xs text-gray-500">
                Screenshots, logs, config files (max 10MB each)
              </p>
              <Button type="button" variant="outline" className="mt-2">
                <Paperclip className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
            </div>
          </div>

          {/* Privacy & Analytics */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm">Privacy & Data Collection</h4>
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="contextCollection" 
                checked={formData.allowContextCollection}
                onCheckedChange={(checked) => setFormData({...formData, allowContextCollection: !!checked})}
              />
              <div className="text-sm">
                <Label htmlFor="contextCollection" className="font-normal">
                  Allow automatic context collection
                </Label>
                <p className="text-xs text-gray-600 mt-1">
                  Includes browser info, project metadata, and system configuration to help resolve your issue faster
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="analytics" 
                checked={formData.allowAnalytics}
                onCheckedChange={(checked) => setFormData({...formData, allowAnalytics: !!checked})}
              />
              <div className="text-sm">
                <Label htmlFor="analytics" className="font-normal">
                  Allow usage analytics for service improvement
                </Label>
                <p className="text-xs text-gray-600 mt-1">
                  Anonymous usage data to help improve our support services
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Submit Support Request
          </Button>
        </form>

        {/* AI Suggestions */}
        {selectedIssueType && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI Suggestions
            </h4>
            <div className="space-y-2 text-sm">
              {selectedIssueType === "technical" && (
                <>
                  <p className="text-blue-800">• Include error messages and stack traces</p>
                  <p className="text-blue-800">• Mention browser/environment versions</p>
                  <p className="text-blue-800">• Describe steps to reproduce the issue</p>
                </>
              )}
              {selectedIssueType === "migration" && (
                <>
                  <p className="text-blue-800">• Specify your current Dialogflow ES version</p>
                  <p className="text-blue-800">• List custom integrations and webhooks</p>
                  <p className="text-blue-800">• Mention any compliance requirements</p>
                </>
              )}
              {selectedIssueType === "performance" && (
                <>
                  <p className="text-blue-800">• Include response time measurements</p>
                  <p className="text-blue-800">• Specify your traffic volume</p>
                  <p className="text-blue-800">• Mention geographic regions affected</p>
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactFormAdvanced;
