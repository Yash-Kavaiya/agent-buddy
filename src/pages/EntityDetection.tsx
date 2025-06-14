
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import EntityDetectionInterface from "@/components/entity-detection/EntityDetectionInterface";
import EntityManagement from "@/components/entity-detection/EntityManagement";
import EntityAnalytics from "@/components/entity-detection/EntityAnalytics";
import ConversationLogs from "@/components/entity-detection/ConversationLogs";

const EntityDetection = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Entity Detection Tool</h1>
          <p className="text-gray-600 font-light">
            Advanced entity detection with custom entity management, smart suggestions, and analytics
          </p>
        </div>

        <Tabs defaultValue="detection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="detection">Detection</TabsTrigger>
            <TabsTrigger value="entities">Entities</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="logs">Conversation Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="detection">
            <EntityDetectionInterface />
          </TabsContent>

          <TabsContent value="entities">
            <EntityManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <EntityAnalytics />
          </TabsContent>

          <TabsContent value="logs">
            <ConversationLogs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EntityDetection;
