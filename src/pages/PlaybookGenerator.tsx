
import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaybookInstruction, PlaybookConfig, PlaybookTemplate } from "@/types/playbook";
import { generatePlaybook } from "@/services/playbookGenerationService";
import PlaybookConfigForm from "@/components/playbook-generator/PlaybookConfigForm";
import PlaybookPreview from "@/components/playbook-generator/PlaybookPreview";
import PlaybookTemplateLibrary from "@/components/playbook-generator/PlaybookTemplateLibrary";
import { Button } from "@/components/ui/button";
import { BookOpen, Zap, Target, FileText, Settings, BarChart3 } from "lucide-react";
import { toast } from "sonner";

const PlaybookGenerator = () => {
  const [generatedPlaybook, setGeneratedPlaybook] = useState<PlaybookInstruction | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("create");

  const handleGeneratePlaybook = async (config: PlaybookConfig) => {
    setLoading(true);
    console.log("Generating playbook with config:", config);
    
    try {
      const playbook = await generatePlaybook(config);
      setGeneratedPlaybook(playbook);
      setActiveTab("preview");
      toast.success("Playbook generated successfully!");
    } catch (error) {
      console.error("Error generating playbook:", error);
      toast.error("Failed to generate playbook. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = (template: PlaybookTemplate) => {
    // Here you would pre-populate the form with template data
    console.log("Selected template:", template);
    toast.success(`Template "${template.name}" selected!`);
    setActiveTab("create");
  };

  const handleSavePlaybook = (playbook: PlaybookInstruction) => {
    // Here you would implement saving to database
    console.log("Saving playbook:", playbook);
    toast.success("Playbook saved successfully!");
  };

  const resetPlaybook = () => {
    setGeneratedPlaybook(null);
    setActiveTab("create");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Playbook Instruction Generator
          </h1>
          <p className="text-gray-600">
            Create optimized LLM prompts for Dialogflow CX Playbooks with advanced features
          </p>
        </div>

        {/* Feature Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">Goal Definition</h3>
                  <p className="text-sm text-blue-700">Clear objectives for each playbook</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900">Tool Integration</h3>
                  <p className="text-sm text-green-700">Seamless tool usage instructions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-purple-900">Template Library</h3>
                  <p className="text-sm text-purple-700">Pre-built instruction templates</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-900">Performance Testing</h3>
                  <p className="text-sm text-orange-700">Optimize token usage & latency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Create
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={!generatedPlaybook} className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="optimize" disabled={!generatedPlaybook} className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Optimize
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="mt-6">
            <PlaybookTemplateLibrary onSelectTemplate={handleSelectTemplate} />
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <div className="space-y-6">
              <PlaybookConfigForm onSubmit={handleGeneratePlaybook} loading={loading} />
              
              {generatedPlaybook && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Previous Generation</span>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setActiveTab("preview")}>
                          View Details
                        </Button>
                        <Button variant="outline" onClick={resetPlaybook}>
                          Start New
                        </Button>
                      </div>
                    </CardTitle>
                    <CardDescription>
                      {generatedPlaybook.name} - {generatedPlaybook.steps.length} steps, {generatedPlaybook.performance.tokenCount} tokens
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            {generatedPlaybook ? (
              <PlaybookPreview 
                playbook={generatedPlaybook} 
                onSave={handleSavePlaybook}
              />
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Playbook Generated</h3>
                  <p className="text-gray-500 mb-4">Create a playbook to see the preview here</p>
                  <Button onClick={() => setActiveTab("create")}>
                    Create Playbook
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="optimize" className="mt-6">
            {generatedPlaybook ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Playbook Optimization
                  </CardTitle>
                  <CardDescription>
                    Advanced optimization features for your playbook
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-lg">Token Optimization</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          Current usage: {generatedPlaybook.performance.tokenCount} tokens
                        </p>
                        <Button className="w-full">Optimize Tokens</Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50 border-green-200">
                      <CardHeader>
                        <CardTitle className="text-lg">Performance Tuning</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          Estimated latency: {generatedPlaybook.performance.estimatedLatency}ms
                        </p>
                        <Button className="w-full">Optimize Performance</Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-purple-50 border-purple-200">
                      <CardHeader>
                        <CardTitle className="text-lg">Prompt Enhancement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          AI-powered suggestions for improvement
                        </p>
                        <Button className="w-full">Enhance Prompts</Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-orange-50 border-orange-200">
                      <CardHeader>
                        <CardTitle className="text-lg">A/B Testing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          Test different variations of your playbook
                        </p>
                        <Button className="w-full">Setup Tests</Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Playbook to Optimize</h3>
                  <p className="text-gray-500 mb-4">Generate a playbook first to access optimization features</p>
                  <Button onClick={() => setActiveTab("create")}>
                    Create Playbook
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlaybookGenerator;
