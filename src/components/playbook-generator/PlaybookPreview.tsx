
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PlaybookInstruction } from "@/types/playbook";
import { Copy, Download, Target, Zap, AlertTriangle, CheckCircle, Clock, Cpu } from "lucide-react";
import { toast } from "sonner";

interface PlaybookPreviewProps {
  playbook: PlaybookInstruction;
  onSave?: (playbook: PlaybookInstruction) => void;
}

const PlaybookPreview: React.FC<PlaybookPreviewProps> = ({ playbook, onSave }) => {
  const [activeStep, setActiveStep] = useState(0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const copyFullPlaybook = () => {
    const fullText = playbook.steps.map(step => 
      `Step ${step.order}: ${step.title}\n${step.prompt}\n\n`
    ).join('');
    copyToClipboard(fullText);
  };

  const exportPlaybook = () => {
    const dataStr = JSON.stringify(playbook, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${playbook.name.replace(/\s+/g, '_')}_playbook.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getPerformanceColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage < 50) return "bg-green-500";
    if (percentage < 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{playbook.name}</CardTitle>
              <CardDescription className="mt-2">{playbook.description}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyFullPlaybook}>
                <Copy className="h-4 w-4 mr-2" />
                Copy All
              </Button>
              <Button variant="outline" size="sm" onClick={exportPlaybook}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              {onSave && (
                <Button onClick={() => onSave(playbook)}>
                  Save Playbook
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{playbook.steps.length}</div>
              <div className="text-sm text-gray-600">Steps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{playbook.goals.length}</div>
              <div className="text-sm text-gray-600">Goals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{playbook.performance.tokenCount}</div>
              <div className="text-sm text-gray-600">Est. Tokens</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{playbook.performance.estimatedLatency}ms</div>
              <div className="text-sm text-gray-600">Est. Latency</div>
            </div>
          </div>

          <Tabs defaultValue="steps" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="steps">Steps</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="variables">Variables</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="steps" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1">
                  <h3 className="font-medium mb-3">Step Navigation</h3>
                  <div className="space-y-2">
                    {playbook.steps.map((step, index) => (
                      <button
                        key={step.id}
                        onClick={() => setActiveStep(index)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          activeStep === index 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-sm">Step {step.order}</div>
                        <div className="text-sm text-gray-600 truncate">{step.title}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  {playbook.steps[activeStep] && (
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              Step {playbook.steps[activeStep].order}: {playbook.steps[activeStep].title}
                            </CardTitle>
                            <CardDescription>{playbook.steps[activeStep].description}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            {playbook.steps[activeStep].isRequired && (
                              <Badge variant="destructive">Required</Badge>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => copyToClipboard(playbook.steps[activeStep].prompt)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Prompt</h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <pre className="whitespace-pre-wrap text-sm">{playbook.steps[activeStep].prompt}</pre>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Expected Output</h4>
                            <p className="text-sm text-gray-600">{playbook.steps[activeStep].expectedOutput}</p>
                          </div>
                          {playbook.steps[activeStep].dependencies.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2">Dependencies</h4>
                              <div className="flex flex-wrap gap-1">
                                {playbook.steps[activeStep].dependencies.map((dep, index) => (
                                  <Badge key={index} variant="outline">{dep}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {playbook.goals.map((goal) => (
                  <Card key={goal.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{goal.objective}</CardTitle>
                        <Badge variant={goal.priority === 'high' ? 'destructive' : goal.priority === 'medium' ? 'default' : 'secondary'}>
                          {goal.priority}
                        </Badge>
                      </div>
                      <CardDescription>{goal.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Success Criteria
                        </h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {goal.successCriteria.map((criterion, index) => (
                            <li key={index}>{criterion}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {playbook.tools.map((tool) => (
                  <Card key={tool.id}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        {tool.name}
                      </CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <Badge variant="outline">{tool.type}</Badge>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Usage</h4>
                          <p className="text-sm text-gray-600">{tool.usage}</p>
                        </div>
                        {tool.parameters.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Parameters</h4>
                            <div className="space-y-2">
                              {tool.parameters.map((param, index) => (
                                <div key={index} className="flex justify-between items-center text-sm">
                                  <span className="font-medium">{param.name}</span>
                                  <div className="flex gap-2">
                                    <Badge variant="secondary" className="text-xs">{param.type}</Badge>
                                    {param.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="examples" className="space-y-4">
              {playbook.examples.length > 0 ? (
                <div className="space-y-4">
                  {playbook.examples.map((example) => (
                    <Card key={example.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{example.title}</CardTitle>
                        <CardDescription>{example.scenario}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Sample Conversation</h4>
                            <div className="space-y-2">
                              {example.conversation.map((turn, index) => (
                                <div key={index} className={`p-3 rounded-lg ${
                                  turn.speaker === 'user' ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'
                                }`}>
                                  <div className="text-xs font-medium text-gray-500 mb-1">
                                    {turn.speaker === 'user' ? 'User' : 'Agent'}
                                  </div>
                                  <div className="text-sm">{turn.message}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">No examples generated for this playbook</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="variables" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {playbook.contextVariables.map((variable) => (
                  <Card key={variable.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{variable.name}</CardTitle>
                      <CardDescription>{variable.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Type:</span>
                          <Badge variant="outline">{variable.type}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Scope:</span>
                          <Badge variant="secondary">{variable.scope}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Required:</span>
                          <Badge variant={variable.required ? "destructive" : "default"}>
                            {variable.required ? "Yes" : "No"}
                          </Badge>
                        </div>
                        {variable.defaultValue && (
                          <div>
                            <span className="text-sm font-medium">Default:</span>
                            <span className="text-sm text-gray-600 ml-2">{variable.defaultValue}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Cpu className="h-5 w-5" />
                      Token Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Estimated Tokens:</span>
                        <span className="font-medium">{playbook.performance.tokenCount}</span>
                      </div>
                      <Progress 
                        value={(playbook.performance.tokenCount / 4000) * 100} 
                        className="h-2"
                      />
                      <div className="text-xs text-gray-500">
                        {Math.round((playbook.performance.tokenCount / 4000) * 100)}% of 4K limit
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Latency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Estimated:</span>
                        <span className="font-medium">{playbook.performance.estimatedLatency}ms</span>
                      </div>
                      <Progress 
                        value={(playbook.performance.estimatedLatency / 5000) * 100} 
                        className="h-2"
                      />
                      <div className="text-xs text-gray-500">
                        {playbook.performance.estimatedLatency < 1000 ? 'Fast' : 
                         playbook.performance.estimatedLatency < 3000 ? 'Moderate' : 'Slow'}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Complexity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <Badge className={getComplexityColor(playbook.performance.complexity)}>
                        {playbook.performance.complexity.toUpperCase()}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-2">
                        Based on steps and logic
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {playbook.performance.optimization.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Optimization Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {playbook.performance.optimization.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline">{suggestion.type.replace('_', ' ')}</Badge>
                              <Badge variant={suggestion.impact === 'high' ? 'destructive' : suggestion.impact === 'medium' ? 'default' : 'secondary'}>
                                {suggestion.impact} impact
                              </Badge>
                              <Badge variant="outline">
                                {suggestion.effort} effort
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{suggestion.suggestion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaybookPreview;
