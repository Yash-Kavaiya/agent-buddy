
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IntentGenerator from "./pages/IntentGenerator";
import EntityDetection from "./pages/EntityDetection";
import RouteGenerator from "./pages/RouteGenerator";
import WebhookGenerator from "./pages/WebhookGenerator";
import FlowGenerator from "./pages/FlowGenerator";
import OpenAPIGenerator from "./pages/OpenAPIGenerator";
import PlaybookGenerator from "./pages/PlaybookGenerator";
import DialogflowDebugger from "./pages/DialogflowDebugger";
import TestingTools from "./pages/TestingTools";
import MyDashboard from "./pages/MyDashboard";
import DocsHelper from "./pages/DocsHelper";
import LearningAgents from "./pages/LearningAgents";
import LiveSupport from "./pages/LiveSupport";
import Templates from "./pages/Templates";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/intent-generator" element={<IntentGenerator />} />
          <Route path="/entity-detection" element={<EntityDetection />} />
          <Route path="/route-generator" element={<RouteGenerator />} />
          <Route path="/webhook-generator" element={<WebhookGenerator />} />
          <Route path="/flow-generator" element={<FlowGenerator />} />
          <Route path="/openapi-generator" element={<OpenAPIGenerator />} />
          <Route path="/playbook-generator" element={<PlaybookGenerator />} />
          <Route path="/dialogflow-debugger" element={<DialogflowDebugger />} />
          <Route path="/testing-tools" element={<TestingTools />} />
          <Route path="/my-dashboard" element={<MyDashboard />} />
          <Route path="/docs-helper" element={<DocsHelper />} />
          <Route path="/learning-agents" element={<LearningAgents />} />
          <Route path="/live-support" element={<LiveSupport />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/community" element={<Community />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
