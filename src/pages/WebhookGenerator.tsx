
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const WebhookGenerator = () => {
  const [language, setLanguage] = useState("");
  const [functionality, setFunctionality] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const handleGenerate = () => {
    const mockCode = `
// Node.js Express Webhook Example
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  
  let responseText = '';
  
  switch(intentName) {
    case '${functionality || 'sample.intent'}':
      responseText = 'Webhook response for ${functionality || 'sample functionality'}';
      break;
    default:
      responseText = 'Default webhook response';
  }
  
  res.json({
    fulfillmentText: responseText
  });
});

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});`;
    setGeneratedCode(mockCode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Webhook Generator</h1>
          <p className="text-gray-600">Generate webhook code for Dialogflow fulfillment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
              <CardDescription>Configure your webhook parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language">Programming Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nodejs">Node.js</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="functionality">Functionality Description</Label>
                <Textarea
                  id="functionality"
                  placeholder="Describe what your webhook should do. E.g., 'Check order status from database'"
                  rows={4}
                  value={functionality}
                  onChange={(e) => setFunctionality(e.target.value)}
                />
              </div>
              <Button onClick={handleGenerate} className="w-full">Generate Webhook Code</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Webhook Code</CardTitle>
              <CardDescription>Copy this code to implement your webhook</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedCode}
                readOnly
                rows={15}
                placeholder="Generated webhook code will appear here..."
                className="font-mono text-sm"
              />
              {generatedCode && (
                <Button 
                  className="mt-4 w-full" 
                  onClick={() => navigator.clipboard.writeText(generatedCode)}
                >
                  Copy Code
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebhookGenerator;
