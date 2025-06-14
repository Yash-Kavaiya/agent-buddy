
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlaybookConfig } from "@/types/playbook";
import { Plus, X } from "lucide-react";

const formSchema = z.object({
  playbookName: z.string().min(1, "Playbook name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  scenario: z.string().min(10, "Scenario description is required"),
  domain: z.string().min(1, "Domain is required"),
  complexity: z.enum(["simple", "moderate", "complex"]),
  maxTokens: z.number().min(100).max(10000),
  language: z.string().min(1, "Language is required"),
  includeExamples: z.boolean(),
  validationLevel: z.enum(["basic", "standard", "strict"])
});

interface PlaybookConfigFormProps {
  onSubmit: (config: PlaybookConfig) => void;
  loading?: boolean;
}

const customerSupportSample = {
  playbookName: "Customer Support Assistant",
  description: "A comprehensive customer support playbook designed to handle various customer inquiries, complaints, and requests efficiently while maintaining high customer satisfaction.",
  scenario: "Customer contacts support via chat, email, or phone with questions about products, services, billing issues, technical problems, or general inquiries. The agent needs to quickly identify the issue, provide accurate information, and resolve the customer's concern in a professional and timely manner.",
  goals: [
    "Resolve customer inquiries within first contact",
    "Maintain customer satisfaction above 90%",
    "Provide accurate product information",
    "Handle escalations appropriately"
  ],
  toolsRequired: [
    "CRM System",
    "Knowledge Base",
    "Ticket Management System",
    "Live Chat Platform"
  ]
};

const PlaybookConfigForm: React.FC<PlaybookConfigFormProps> = ({ onSubmit, loading = false }) => {
  const [goals, setGoals] = useState<string[]>([]);
  const [toolsRequired, setToolsRequired] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const [newTool, setNewTool] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playbookName: "",
      description: "",
      scenario: "",
      domain: "general",
      complexity: "moderate",
      maxTokens: 4000,
      language: "en",
      includeExamples: true,
      validationLevel: "standard"
    }
  });

  const watchedDomain = form.watch("domain");

  useEffect(() => {
    if (watchedDomain === "customer-support") {
      // Auto-populate sample data for customer support
      form.setValue("playbookName", customerSupportSample.playbookName);
      form.setValue("description", customerSupportSample.description);
      form.setValue("scenario", customerSupportSample.scenario);
      setGoals(customerSupportSample.goals);
      setToolsRequired(customerSupportSample.toolsRequired);
    }
  }, [watchedDomain, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const config: PlaybookConfig = {
      playbookName: values.playbookName,
      description: values.description,
      scenario: values.scenario,
      domain: values.domain,
      complexity: values.complexity,
      maxTokens: values.maxTokens,
      language: values.language,
      includeExamples: values.includeExamples,
      validationLevel: values.validationLevel,
      goals,
      toolsRequired
    };
    onSubmit(config);
  };

  const addGoal = () => {
    if (newGoal.trim() && !goals.includes(newGoal.trim())) {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal("");
    }
  };

  const removeGoal = (goal: string) => {
    setGoals(goals.filter(g => g !== goal));
  };

  const addTool = () => {
    if (newTool.trim() && !toolsRequired.includes(newTool.trim())) {
      setToolsRequired([...toolsRequired, newTool.trim()]);
      setNewTool("");
    }
  };

  const removeTool = (tool: string) => {
    setToolsRequired(toolsRequired.filter(t => t !== tool));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Playbook Configuration</CardTitle>
        <CardDescription>
          Configure your playbook settings to generate optimized instructions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="playbookName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Playbook Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={watchedDomain === "customer-support" ? "Customer Support Assistant" : "Enter playbook name..."} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domain</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select domain" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="customer-support">Customer Support</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={watchedDomain === "customer-support" ? 
                        "A comprehensive customer support playbook designed to handle various customer inquiries..." : 
                        "Describe what this playbook should accomplish..."
                      }
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scenario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scenario</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={watchedDomain === "customer-support" ? 
                        "Customer contacts support via chat, email, or phone with questions about products, services..." : 
                        "Describe the typical scenario this playbook will handle..."
                      }
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Provide context about when and how this playbook will be used
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div>
                <FormLabel>Goals</FormLabel>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Add a goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal())}
                  />
                  <Button type="button" onClick={addGoal} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {goals.map((goal, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {goal}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeGoal(goal)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <FormLabel>Tools Required</FormLabel>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Add a tool..."
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTool())}
                  />
                  <Button type="button" onClick={addTool} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {toolsRequired.map((tool, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {tool}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTool(tool)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="complexity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complexity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="simple">Simple</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="complex">Complex</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxTokens"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Tokens</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="100" 
                        max="10000" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="includeExamples"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Include Examples</FormLabel>
                      <FormDescription>
                        Generate sample conversations and use cases
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="validationLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Validation Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="strict">Strict</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Higher levels provide more thorough validation
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Generating Playbook..." : "Generate Playbook"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PlaybookConfigForm;
