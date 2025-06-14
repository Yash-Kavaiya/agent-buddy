
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Download, Eye, FileJson, FileText, Sparkles } from "lucide-react";
import { getUserIntents, getIntentWithDetails, deleteIntent, DatabaseIntent } from "@/services/intentDatabaseService";
import { exportIntentAsJSON, exportIntentAsCSV } from "@/services/intentExportService";
import { Intent } from "@/types/intent";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SavedIntentsProps {
  onIntentSelected?: (intent: Intent) => void;
}

const SavedIntents: React.FC<SavedIntentsProps> = ({ onIntentSelected }) => {
  const { toast } = useToast();
  const [intents, setIntents] = useState<DatabaseIntent[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportingIntentId, setExportingIntentId] = useState<string | null>(null);

  useEffect(() => {
    loadIntents();
  }, []);

  const loadIntents = async () => {
    setLoading(true);
    const { data, error } = await getUserIntents();
    
    if (error) {
      console.error('Error loading intents:', error);
      toast({
        title: "Failed to Load Intents",
        description: "Could not load your saved intents. Please try again.",
        variant: "destructive"
      });
    } else {
      setIntents(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (intentId: string) => {
    const { error } = await deleteIntent(intentId);
    
    if (error) {
      toast({
        title: "Failed to Delete",
        description: "Could not delete the intent. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Intent Deleted",
        description: "The intent has been successfully deleted.",
      });
      setIntents(intents.filter(intent => intent.id !== intentId));
    }
  };

  const handleView = async (intentId: string) => {
    if (!onIntentSelected) return;

    const { data, error } = await getIntentWithDetails(intentId);
    
    if (error) {
      toast({
        title: "Failed to Load Intent",
        description: "Could not load the intent details. Please try again.",
        variant: "destructive"
      });
      return;
    }

    // Convert database format to Intent type
    const intent: Intent = {
      id: data.id,
      displayName: data.display_name,
      description: data.description || '',
      trainingPhrases: data.training_phrases.map((phrase: any) => ({
        id: phrase.id,
        text: phrase.text,
        confidence: phrase.confidence,
        entities: phrase.phrase_entities.map((entity: any) => ({
          id: entity.id,
          entityType: entity.entity_type,
          value: entity.value,
          startIndex: entity.start_index,
          endIndex: entity.end_index
        }))
      })),
      responses: [],
      parameters: [],
      language: data.language,
      category: data.domain,
      tags: [],
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };

    onIntentSelected(intent);
  };

  const handleExport = async (intentId: string, format: 'json' | 'csv') => {
    setExportingIntentId(intentId);
    
    const { data, error } = await getIntentWithDetails(intentId);
    
    if (error) {
      toast({
        title: "Export Failed",
        description: "Could not load the intent details for export.",
        variant: "destructive"
      });
      setExportingIntentId(null);
      return;
    }

    // Convert database format to Intent type
    const intent: Intent = {
      id: data.id,
      displayName: data.display_name,
      description: data.description || '',
      trainingPhrases: data.training_phrases.map((phrase: any) => ({
        id: phrase.id,
        text: phrase.text,
        confidence: phrase.confidence,
        entities: phrase.phrase_entities.map((entity: any) => ({
          id: entity.id,
          entityType: entity.entity_type,
          value: entity.value,
          startIndex: entity.start_index,
          endIndex: entity.end_index
        }))
      })),
      responses: [],
      parameters: [],
      language: data.language,
      category: data.domain,
      tags: [],
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };

    try {
      if (format === 'json') {
        exportIntentAsJSON(intent);
      } else {
        exportIntentAsCSV(intent);
      }
      
      toast({
        title: "Export Successful",
        description: `Intent exported as ${format.toUpperCase()} file.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export the intent. Please try again.",
        variant: "destructive"
      });
    }
    
    setExportingIntentId(null);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Intents</CardTitle>
          <CardDescription>Loading your saved intents...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Intents</CardTitle>
        <CardDescription>
          {intents.length === 0 
            ? "No saved intents yet. Generate an intent to get started!"
            : `You have ${intents.length} saved intent${intents.length === 1 ? '' : 's'}`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {intents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No intents saved yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {intents.map(intent => (
              <div key={intent.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{intent.display_name}</h3>
                    {intent.domain && (
                      <Badge variant="secondary" className="text-xs">
                        {intent.domain}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {intent.description || 'No description'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{intent.phrase_count} phrases</span>
                    <span>{intent.language}</span>
                    <span>{new Date(intent.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {onIntentSelected && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(intent.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={exportingIntentId === intent.id}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleExport(intent.id, 'json')}>
                        <FileJson className="h-4 w-4 mr-2" />
                        Export as JSON
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExport(intent.id, 'csv')}>
                        <FileText className="h-4 w-4 mr-2" />
                        Export as CSV
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Intent</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{intent.display_name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(intent.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedIntents;
