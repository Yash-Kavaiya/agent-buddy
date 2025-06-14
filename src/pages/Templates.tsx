
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Templates = () => {
  const templates = [
    {
      name: "Customer Support Bot",
      description: "Complete template for customer service automation",
      category: "Support",
      intents: 15,
      entities: 8
    },
    {
      name: "E-commerce Assistant",
      description: "Shopping and order management conversational agent",
      category: "E-commerce",
      intents: 22,
      entities: 12
    },
    {
      name: "Booking System",
      description: "Appointment and reservation management bot",
      category: "Business",
      intents: 18,
      entities: 10
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prebuilt Templates & Starter Code</h1>
          <p className="text-gray-600">Jumpstart your Dialogflow projects with ready-to-use templates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{template.category}</Badge>
                </div>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">
                    <span>{template.intents} Intents</span>
                    <span className="mx-2">•</span>
                    <span>{template.entities} Entities</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm">Preview</Button>
                  <Button size="sm" variant="outline">Download</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
