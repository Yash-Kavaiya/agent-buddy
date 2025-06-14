
import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IntentConfigForm from "@/components/intent-generator/IntentConfigForm";
import GeneratedIntentPreview from "@/components/intent-generator/GeneratedIntentPreview";
import TemplateLibrary from "@/components/intent-generator/TemplateLibrary";
import IntentAnalytics from "@/components/intent-generator/IntentAnalytics";
import { Intent } from "@/types/intent";

const IntentGenerator = () => {
  const [generatedIntent, setGeneratedIntent] = useState<Intent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleIntentGenerated = (intent: Intent) => {
    setGeneratedIntent(intent);
  };

  const handleGeneratingChange = (generating: boolean) => {
    setIsGenerating(generating);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Intent Generator</h1>
          <p className="text-gray-600 font-light">
            Generate high-quality Dialogflow intents with AI-powered training phrases
          </p>
        </div>

        <Tabs defaultValue="generator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IntentConfigForm
                onIntentGenerated={handleIntentGenerated}
                onGeneratingChange={handleGeneratingChange}
                isGenerating={isGenerating}
              />
              <GeneratedIntentPreview
                intent={generatedIntent}
                isGenerating={isGenerating}
              />
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <TemplateLibrary onTemplateSelected={handleIntentGenerated} />
          </TabsContent>

          <TabsContent value="analytics">
            <IntentAnalytics />
          </TabsContent>

          <TabsContent value="bulk">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Intent Import/Export</CardTitle>
                <CardDescription>
                  Import and export multiple intents in CSV or JSON format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">Bulk operations coming soon</p>
                  <p className="text-sm text-gray-400">
                    Upload CSV/JSON files or export existing intents
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IntentGenerator;
