
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Bookmark, ArrowRight } from "lucide-react";
import { Intent, IntentTemplate } from "@/types/intent";
import { generateIntent } from "@/services/intentGenerationService";

interface TemplateLibraryProps {
  onTemplateSelected: (intent: Intent) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onTemplateSelected }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const templates: IntentTemplate[] = [
    {
      id: "booking_appointment",
      name: "Book Appointment",
      description: "Handle appointment booking requests with date and time preferences",
      category: "Healthcare",
      intent: {
        displayName: "book.appointment",
        description: "User wants to book an appointment with a doctor or specialist",
        trainingPhrases: [],
        responses: [],
        parameters: []
      },
      variables: ["doctor_type", "date", "time"]
    },
    {
      id: "check_order_status",
      name: "Check Order Status",
      description: "Allow customers to check their order status and tracking information",
      category: "E-commerce",
      intent: {
        displayName: "order.status.check",
        description: "User wants to check the status of their order",
        trainingPhrases: [],
        responses: [],
        parameters: []
      },
      variables: ["order_number", "email"]
    },
    {
      id: "cancel_subscription",
      name: "Cancel Subscription",
      description: "Handle subscription cancellation requests with proper verification",
      category: "Support",
      intent: {
        displayName: "subscription.cancel",
        description: "User wants to cancel their subscription or service",
        trainingPhrases: [],
        responses: [],
        parameters: []
      },
      variables: ["subscription_type", "reason"]
    },
    {
      id: "reset_password",
      name: "Reset Password",
      description: "Guide users through password reset process",
      category: "Support",
      intent: {
        displayName: "password.reset",
        description: "User needs to reset their password",
        trainingPhrases: [],
        responses: [],
        parameters: []
      },
      variables: ["email", "username"]
    },
    {
      id: "product_inquiry",
      name: "Product Inquiry",
      description: "Handle product questions and provide detailed information",
      category: "E-commerce",
      intent: {
        displayName: "product.inquiry",
        description: "User is asking about product details, features, or availability",
        trainingPhrases: [],
        responses: [],
        parameters: []
      },
      variables: ["product_name", "feature"]
    },
    {
      id: "payment_issue",
      name: "Payment Issue",
      description: "Address payment problems and billing inquiries",
      category: "Support",
      intent: {
        displayName: "payment.issue",
        description: "User is experiencing payment or billing issues",
        trainingPhrases: [],
        responses: [],
        parameters: []
      },
      variables: ["payment_method", "amount", "date"]
    }
  ];

  const categories = ["all", ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = async (template: IntentTemplate) => {
    const config = {
      intentName: template.intent.displayName || template.name,
      description: template.intent.description || template.description,
      domain: template.category.toLowerCase(),
      language: "en",
      phraseCount: 15,
      includeEntities: true,
      entityTypes: ["@sys.person", "@sys.date-time", "@sys.email"],
      tone: "professional" as const,
      complexity: "moderate" as const,
      variations: true,
      includeNegatives: false
    };

    try {
      const generatedIntent = await generateIntent(config);
      onTemplateSelected(generatedIntent);
    } catch (error) {
      console.error("Failed to generate intent from template:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-blue-600" />
            Intent Template Library
          </CardTitle>
          <CardDescription>
            Choose from pre-built intent templates for common use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  <Filter className="h-3 w-3 mr-1" />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map(template => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4">
                    {template.description}
                  </p>
                  
                  {template.variables && template.variables.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-500 mb-2">Variables:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map(variable => (
                          <Badge key={variable} variant="outline" className="text-xs">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={() => handleUseTemplate(template)}
                    className="w-full"
                    size="sm"
                  >
                    Use Template
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-2">No templates found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your search terms or category filter
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateLibrary;
