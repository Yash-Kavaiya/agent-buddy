
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Brain, Sparkles, Target, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { detectEntitiesInText, saveConversationLog } from "@/services/entityDetectionService";

interface DetectedEntity {
  type: string;
  value: string;
  start: number;
  end: number;
  confidence: number;
}

interface SmartSuggestion {
  entityType: string;
  suggestedValue: string;
  confidence: number;
  reason: string;
}

const EntityDetectionInterface = () => {
  const { toast } = useToast();
  const [inputText, setInputText] = useState("");
  const [detectedEntities, setDetectedEntities] = useState<DetectedEntity[]>([]);
  const [smartSuggestions, setSmartSuggestions] = useState<SmartSuggestion[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [language, setLanguage] = useState("en");
  const [confidence, setConfidence] = useState(0.7);
  const [enableSmartSuggestions, setEnableSmartSuggestions] = useState(true);

  const handleDetect = async () => {
    if (!inputText.trim()) {
      toast({
        title: "No Input",
        description: "Please enter some text to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsDetecting(true);
    try {
      const result = await detectEntitiesInText(inputText, {
        language,
        minConfidence: confidence,
        enableSmartSuggestions
      });

      setDetectedEntities(result.entities);
      setSmartSuggestions(result.smartSuggestions || []);

      // Save conversation log
      await saveConversationLog({
        userInput: inputText,
        detectedEntities: result.entities,
        smartSuggestions: result.smartSuggestions,
        language
      });

      toast({
        title: "Detection Complete",
        description: `Found ${result.entities.length} entities with ${result.smartSuggestions?.length || 0} smart suggestions.`
      });
    } catch (error) {
      console.error('Entity detection error:', error);
      toast({
        title: "Detection Failed",
        description: "Failed to detect entities. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDetecting(false);
    }
  };

  const handleAcceptSuggestion = (suggestion: SmartSuggestion) => {
    const newEntity: DetectedEntity = {
      type: suggestion.entityType,
      value: suggestion.suggestedValue,
      start: inputText.indexOf(suggestion.suggestedValue),
      end: inputText.indexOf(suggestion.suggestedValue) + suggestion.suggestedValue.length,
      confidence: suggestion.confidence
    };

    setDetectedEntities(prev => [...prev, newEntity]);
    setSmartSuggestions(prev => prev.filter(s => s !== suggestion));

    toast({
      title: "Suggestion Accepted",
      description: `Added ${suggestion.entityType}: ${suggestion.suggestedValue}`
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-100 text-green-800 border-green-200";
    if (confidence >= 0.6) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Input & Configuration
            </CardTitle>
            <CardDescription>Enter text and configure detection settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="input-text">Text to Analyze</Label>
              <Textarea
                id="input-text"
                placeholder="Enter text here. E.g., 'I want to book a flight to New York tomorrow for John Smith at john@email.com'"
                rows={6}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="confidence">Min Confidence: {confidence}</Label>
                <Input
                  id="confidence"
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={confidence}
                  onChange={(e) => setConfidence(parseFloat(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="smart-suggestions"
                checked={enableSmartSuggestions}
                onCheckedChange={setEnableSmartSuggestions}
              />
              <Label htmlFor="smart-suggestions">Enable Smart Suggestions</Label>
            </div>

            <Button onClick={handleDetect} disabled={isDetecting} className="w-full">
              {isDetecting ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-spin" />
                  Detecting Entities...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Detect Entities
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {smartSuggestions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Smart Suggestions
              </CardTitle>
              <CardDescription>AI-powered entity suggestions based on context</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {smartSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {suggestion.entityType}
                        </Badge>
                        <span className="text-sm font-medium">{suggestion.suggestedValue}</span>
                      </div>
                      <p className="text-xs text-gray-600">{suggestion.reason}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAcceptSuggestion(suggestion)}
                      className="ml-2"
                    >
                      Accept
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detected Entities</CardTitle>
          <CardDescription>
            {detectedEntities.length > 0 
              ? `Found ${detectedEntities.length} entities`
              : "No entities detected yet. Enter text and click 'Detect Entities'."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {detectedEntities.length > 0 ? (
            <div className="space-y-3">
              {detectedEntities.map((entity, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-sm">
                      {entity.type}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={`text-xs ${getConfidenceColor(entity.confidence)}`}
                        variant="outline"
                      >
                        {Math.round(entity.confidence * 100)}%
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {entity.start}-{entity.end}
                      </span>
                    </div>
                  </div>
                  <p className="font-medium text-lg">{entity.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No entities detected yet</p>
              <p className="text-sm">Enter text and configure settings to start detection</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EntityDetectionInterface;
