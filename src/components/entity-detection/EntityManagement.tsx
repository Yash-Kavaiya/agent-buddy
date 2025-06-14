
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, GitBranch, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getEntities, createEntity, updateEntity, deleteEntity, addEntitySynonym } from "@/services/entityManagementService";

interface Entity {
  id: string;
  name: string;
  display_name: string;
  entity_type: 'system' | 'custom';
  description?: string;
  category?: string;
  synonyms?: string[];
}

const EntityManagement = () => {
  const { toast } = useToast();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<Entity | null>(null);
  const [newSynonym, setNewSynonym] = useState("");

  // Form state for creating/editing entities
  const [formData, setFormData] = useState({
    name: "",
    display_name: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    loadEntities();
  }, []);

  const loadEntities = async () => {
    setLoading(true);
    try {
      const result = await getEntities();
      if (result.data) {
        setEntities(result.data);
      }
    } catch (error) {
      console.error('Error loading entities:', error);
      toast({
        title: "Failed to Load Entities",
        description: "Could not load entities. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEntity = async () => {
    if (!formData.name || !formData.display_name) {
      toast({
        title: "Validation Error",
        description: "Name and display name are required.",
        variant: "destructive"
      });
      return;
    }

    try {
      const result = await createEntity({
        ...formData,
        entity_type: 'custom'
      });

      if (result.data) {
        setEntities(prev => [...prev, result.data]);
        setIsCreateDialogOpen(false);
        setFormData({ name: "", display_name: "", description: "", category: "" });
        toast({
          title: "Entity Created",
          description: `Successfully created entity: ${formData.display_name}`
        });
      }
    } catch (error) {
      console.error('Error creating entity:', error);
      toast({
        title: "Creation Failed",
        description: "Failed to create entity. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteEntity = async (entityId: string, entityName: string) => {
    try {
      const result = await deleteEntity(entityId);
      if (!result.error) {
        setEntities(prev => prev.filter(e => e.id !== entityId));
        toast({
          title: "Entity Deleted",
          description: `Successfully deleted entity: ${entityName}`
        });
      }
    } catch (error) {
      console.error('Error deleting entity:', error);
      toast({
        title: "Deletion Failed",
        description: "Failed to delete entity. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddSynonym = async (entityId: string) => {
    if (!newSynonym.trim()) return;

    try {
      const result = await addEntitySynonym(entityId, newSynonym.trim());
      if (result.data) {
        // Reload entities to get updated synonyms
        loadEntities();
        setNewSynonym("");
        toast({
          title: "Synonym Added",
          description: `Added synonym: ${newSynonym}`
        });
      }
    } catch (error) {
      console.error('Error adding synonym:', error);
      toast({
        title: "Failed to Add Synonym",
        description: "Could not add synonym. Please try again.",
        variant: "destructive"
      });
    }
  };

  const categories = [...new Set(entities.map(e => e.category).filter(Boolean))];
  const filteredEntities = selectedCategory === "all" 
    ? entities 
    : entities.filter(e => e.category === selectedCategory);

  const systemEntities = filteredEntities.filter(e => e.entity_type === 'system');
  const customEntities = filteredEntities.filter(e => e.entity_type === 'custom');

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Entity Management</CardTitle>
          <CardDescription>Loading entities...</CardDescription>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Entity Management</h2>
          <p className="text-gray-600">Manage system and custom entities</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Entity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Entity</DialogTitle>
              <DialogDescription>
                Add a new custom entity for detection
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Entity Name (lowercase, no spaces)</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., custom-product"
                />
              </div>
              <div>
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                  id="display_name"
                  value={formData.display_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                  placeholder="e.g., Product Name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., commerce, healthcare"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this entity detects..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEntity}>Create Entity</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <Label htmlFor="category-filter">Filter by Category:</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              System Entities
            </CardTitle>
            <CardDescription>Built-in entities provided by the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemEntities.map(entity => (
                <div key={entity.id} className="p-3 border rounded-lg bg-blue-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{entity.display_name}</h3>
                    <Badge variant="secondary">{entity.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{entity.description}</p>
                  <p className="text-xs text-gray-500">@{entity.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Custom Entities
            </CardTitle>
            <CardDescription>Your custom entities for specific use cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {customEntities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No custom entities yet</p>
                  <p className="text-sm">Create your first entity to get started</p>
                </div>
              ) : (
                customEntities.map(entity => (
                  <div key={entity.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{entity.display_name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{entity.category}</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteEntity(entity.id, entity.display_name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{entity.description}</p>
                    <p className="text-xs text-gray-500 mb-3">@{entity.name}</p>
                    
                    {/* Synonym management */}
                    <div className="border-t pt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Input
                          placeholder="Add synonym..."
                          value={newSynonym}
                          onChange={(e) => setNewSynonym(e.target.value)}
                          className="text-sm"
                        />
                        <Button 
                          size="sm" 
                          onClick={() => handleAddSynonym(entity.id)}
                          disabled={!newSynonym.trim()}
                        >
                          Add
                        </Button>
                      </div>
                      {entity.synonyms && entity.synonyms.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {entity.synonyms.map((synonym, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {synonym}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EntityManagement;
