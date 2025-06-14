
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Download, Edit3, Eye, Copy, Trash2, Plus } from "lucide-react";
import { Intent, TrainingPhrase } from "@/types/intent";
import { useToast } from "@/hooks/use-toast";

interface GeneratedIntentPreviewProps {
  intent: Intent | null;
  isGenerating: boolean;
}

const GeneratedIntentPreview: React.FC<GeneratedIntentPreviewProps> = ({
  intent,
  isGenerating
}) => {
  const { toast } = useToast();
  const [editingPhrase, setEditingPhrase] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [currentIntent, setCurrentIntent] = useState<Intent | null>(intent);

  React.useEffect(() => {
    setCurrentIntent(intent);
  }, [intent]);

  const handleEditPhrase = (phraseId: string, currentText: string) => {
    setEditingPhrase(phraseId);
    setEditedText(currentText);
  };

  const handleSavePhrase = (phraseId: string) => {
    if (!currentIntent) return;

    const updatedIntent = {
      ...currentIntent,
      trainingPhrases: currentIntent.trainingPhrases.map(phrase =>
        phrase.id === phraseId ? { ...phrase, text: editedText } : phrase
      )
    };
    setCurrentIntent(updatedIntent);
    setEditingPhrase(null);
    setEditedText("");
  };

  const handleDeletePhrase = (phraseId: string) => {
    if (!currentIntent) return;

    const updatedIntent = {
      ...currentIntent,
      trainingPhrases: currentIntent.trainingPhrases.filter(phrase => phrase.id !== phraseId)
    };
    setCurrentIntent(updatedIntent);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    });
  };

  const handleExportJSON = () => {
    if (!currentIntent) return;

    const dataStr = JSON.stringify(currentIntent, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${currentIntent.displayName}_intent.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleExportDialogflow = () => {
    if (!currentIntent) return;

    const dialogflowFormat = {
      displayName: currentIntent.displayName,
      trainingPhrases: currentIntent.trainingPhrases.map(phrase => ({
        parts: [{ text: phrase.text }]
      })),
      messages: currentIntent.responses.map(response => ({
        text: { text: [response.text] }
      }))
    };

    const dataStr = JSON.stringify(dialogflowFormat, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${currentIntent.displayName}_dialogflow.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return "bg-gray-100 text-gray-600";
    if (confidence >= 0.8) return "bg-green-100 text-green-700";
    if (confidence >= 0.6) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  if (isGenerating) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Generated Intent</CardTitle>
          <CardDescription>AI is generating your intent...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Generating training phrases...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentIntent) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Generated Intent</CardTitle>
          <CardDescription>Configure your intent and click generate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Eye className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No intent generated yet</p>
            <p className="text-sm text-gray-400">
              Fill in the configuration form and generate your first intent
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            {currentIntent.displayName}
            <Badge variant="secondary">{currentIntent.language}</Badge>
          </CardTitle>
          <CardDescription>{currentIntent.description}</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleExportJSON}>
            <Download className="h-4 w-4 mr-1" />
            JSON
          </Button>
          <Button size="sm" variant="outline" onClick={handleExportDialogflow}>
            <Download className="h-4 w-4 mr-1" />
            Dialogflow
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="phrases" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="phrases">Training Phrases</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="entities">Entities</TabsTrigger>
          </TabsList>

          <TabsContent value="phrases" className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">
                Training Phrases ({currentIntent.trainingPhrases.length})
              </h4>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Phrase
              </Button>
            </div>
            
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {currentIntent.trainingPhrases.map((phrase, index) => (
                  <div key={phrase.id} className="group">
                    <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {editingPhrase === phrase.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editedText}
                              onChange={(e) => setEditedText(e.target.value)}
                              className="min-h-[60px]"
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleSavePhrase(phrase.id)}>
                                Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingPhrase(null)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              {phrase.text}
                            </p>
                            <div className="flex items-center gap-2">
                              {phrase.confidence && (
                                <Badge variant="secondary" className={getConfidenceColor(phrase.confidence)}>
                                  {Math.round(phrase.confidence * 100)}% confidence
                                </Badge>
                              )}
                              {phrase.entities.map(entity => (
                                <Badge key={entity.id} variant="outline" className="text-xs">
                                  {entity.entityType}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditPhrase(phrase.id, phrase.text)}
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyToClipboard(phrase.text)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeletePhrase(phrase.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="responses">
            <div className="space-y-4">
              <h4 className="font-medium">Default Responses</h4>
              <div className="space-y-2">
                {currentIntent.responses.map((response, index) => (
                  <div key={response.id} className="p-3 border rounded-lg bg-gray-50">
                    <p className="text-sm">{response.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="entities">
            <div className="space-y-4">
              <h4 className="font-medium">Detected Entities</h4>
              <div className="grid grid-cols-2 gap-4">
                {Array.from(new Set(currentIntent.trainingPhrases.flatMap(p => p.entities.map(e => e.entityType)))).map(entityType => (
                  <div key={entityType} className="p-3 border rounded-lg">
                    <Badge variant="outline">{entityType}</Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      Used in {currentIntent.trainingPhrases.filter(p => p.entities.some(e => e.entityType === entityType)).length} phrases
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GeneratedIntentPreview;
