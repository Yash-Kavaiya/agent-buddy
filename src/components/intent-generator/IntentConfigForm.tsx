
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Sparkles, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { generateIntent } from "@/services/intentGenerationService";
import { Intent, GenerationConfig } from "@/types/intent";
import { useToast } from "@/hooks/use-toast";

interface IntentConfigFormProps {
  onIntentGenerated: (intent: Intent) => void;
  onGeneratingChange: (generating: boolean) => void;
  isGenerating: boolean;
}

const IntentConfigForm: React.FC<IntentConfigFormProps> = ({
  onIntentGenerated,
  onGeneratingChange,
  isGenerating
}) => {
  const { toast } = useToast();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [config, setConfig] = useState<GenerationConfig>({
    intentName: "",
    description: "",
    domain: "",
    language: "en",
    phraseCount: 10,
    includeEntities: true,
    entityTypes: [],
    tone: "professional",
    complexity: "moderate",
    variations: true,
    includeNegatives: false
  });

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },
    { value: "zh", label: "Chinese" }
  ];

  const entityTypes = [
    "@sys.person",
    "@sys.location",
    "@sys.date-time",
    "@sys.number",
    "@sys.email",
    "@sys.phone-number",
    "@sys.currency",
    "@sys.percentage"
  ];

  const handleGenerate = async () => {
    if (!config.intentName || !config.description) {
      toast({
        title: "Missing Information",
        description: "Please provide intent name and description",
        variant: "destructive"
      });
      return;
    }

    onGeneratingChange(true);
    try {
      const intent = await generateIntent(config);
      onIntentGenerated(intent);
      toast({
        title: "Intent Generated",
        description: `Successfully generated ${intent.trainingPhrases.length} training phrases`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate intent. Please try again.",
        variant: "destructive"
      });
    } finally {
      onGeneratingChange(false);
    }
  };

  const addEntityType = (entityType: string) => {
    if (!config.entityTypes.includes(entityType)) {
      setConfig(prev => ({
        ...prev,
        entityTypes: [...prev.entityTypes, entityType]
      }));
    }
  };

  const removeEntityType = (entityType: string) => {
    setConfig(prev => ({
      ...prev,
      entityTypes: prev.entityTypes.filter(et => et !== entityType)
    }));
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          Intent Configuration
        </CardTitle>
        <CardDescription>
          Describe your intent and we'll generate training phrases with AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="intentName">Intent Name</Label>
            <Input
              id="intentName"
              placeholder="e.g., book.appointment, check.order.status"
              value={config.intentName}
              onChange={(e) => setConfig(prev => ({ ...prev, intentName: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="description">Intent Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this intent should handle. E.g., 'User wants to book an appointment with a specific doctor at a specific time'"
              rows={3}
              value={config.description}
              onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="domain">Domain/Category</Label>
              <Input
                id="domain"
                placeholder="e.g., healthcare, ecommerce"
                value={config.domain}
                onChange={(e) => setConfig(prev => ({ ...prev, domain: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={config.language} onValueChange={(value) => setConfig(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0">
              <span className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Advanced Settings
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phraseCount">Training Phrases Count</Label>
                <Input
                  id="phraseCount"
                  type="number"
                  min="5"
                  max="50"
                  value={config.phraseCount}
                  onChange={(e) => setConfig(prev => ({ ...prev, phraseCount: parseInt(e.target.value) || 10 }))}
                />
              </div>

              <div>
                <Label htmlFor="tone">Tone</Label>
                <Select value={config.tone} onValueChange={(value: any) => setConfig(prev => ({ ...prev, tone: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Entity Types to Include</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {config.entityTypes.map(entityType => (
                  <Badge
                    key={entityType}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeEntityType(entityType)}
                  >
                    {entityType} ×
                  </Badge>
                ))}
              </div>
              <Select onValueChange={addEntityType}>
                <SelectTrigger>
                  <SelectValue placeholder="Add entity type" />
                </SelectTrigger>
                <SelectContent>
                  {entityTypes.filter(et => !config.entityTypes.includes(et)).map(entityType => (
                    <SelectItem key={entityType} value={entityType}>
                      {entityType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="includeEntities">Auto-detect Entities</Label>
                <Switch
                  id="includeEntities"
                  checked={config.includeEntities}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, includeEntities: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="variations">Generate Variations</Label>
                <Switch
                  id="variations"
                  checked={config.variations}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, variations: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="includeNegatives">Include Negative Examples</Label>
                <Switch
                  id="includeNegatives"
                  checked={config.includeNegatives}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, includeNegatives: checked }))}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !config.intentName || !config.description}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Generating Intent...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Intent
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default IntentConfigForm;
