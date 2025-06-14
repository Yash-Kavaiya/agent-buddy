
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const IntentGenerator = () => {
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [generatedIntents, setGeneratedIntents] = useState("");

  const handleGenerate = () => {
    // Mock generation - in real app, this would call an API
    const mockIntents = `
{
  "displayName": "${domain || 'sample'}_intent",
  "trainingPhrases": [
    {
      "parts": [
        {
          "text": "I need help with ${description || 'something'}"
        }
      ]
    },
    {
      "parts": [
        {
          "text": "Can you assist me with ${description || 'this task'}?"
        }
      ]
    }
  ],
  "messages": [
    {
      "text": {
        "text": ["I'd be happy to help you with that. Let me get that information for you."]
      }
    }
  ]
}`;
    setGeneratedIntents(mockIntents);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Intent Generator</h1>
          <p className="text-gray-600">Generate Dialogflow intents automatically using AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Intent Configuration</CardTitle>
              <CardDescription>Describe what you want your intent to handle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="domain">Domain/Category</Label>
                <Input
                  id="domain"
                  placeholder="e.g., customer_support, booking, order_status"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Intent Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this intent should handle. E.g., 'User wants to check their order status and get tracking information'"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <Button onClick={handleGenerate} className="w-full">
                Generate Intent
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Intent JSON</CardTitle>
              <CardDescription>Copy this JSON to import into your Dialogflow agent</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedIntents}
                readOnly
                rows={15}
                placeholder="Generated intent JSON will appear here..."
                className="font-mono text-sm"
              />
              {generatedIntents && (
                <Button 
                  className="mt-4 w-full" 
                  onClick={() => navigator.clipboard.writeText(generatedIntents)}
                >
                  Copy to Clipboard
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IntentGenerator;
