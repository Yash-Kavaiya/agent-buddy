import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bug,
  Play,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageSquare,
  Target,
  Tag,
  Code,
  Terminal,
  RefreshCw,
} from "lucide-react";
import {
  detectIntent,
  getDebugLogs,
  getIntentMatches,
  type DebugSession,
  type DebugLog,
  type IntentMatch,
} from "@/services/debuggerService";
import { toast } from "sonner";

const DialogflowDebugger = () => {
  const [input, setInput] = useState("");
  const [sessions, setSessions] = useState<DebugSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<DebugSession | null>(null);

  // Fetch debug logs
  const { data: debugLogs, refetch: refetchLogs } = useQuery({
    queryKey: ['debugLogs'],
    queryFn: getDebugLogs,
  });

  // Detect intent mutation
  const detectIntentMutation = useMutation({
    mutationFn: detectIntent,
    onSuccess: (data) => {
      setSessions(prev => [data, ...prev]);
      setSelectedSession(data);
      setInput("");
      toast.success("Intent detected successfully");
      refetchLogs();
    },
    onError: (error) => {
      toast.error("Failed to detect intent: " + error.message);
    },
  });

  // Get intent matches for current input
  const { data: intentMatches } = useQuery({
    queryKey: ['intentMatches', input],
    queryFn: () => input.trim() ? getIntentMatches(input) : Promise.resolve([]),
    enabled: input.length > 3,
  });

  const handleDebugInput = () => {
    if (!input.trim()) {
      toast.error("Please enter some text to debug");
      return;
    }
    detectIntentMutation.mutate(input);
  };

  const clearSessions = () => {
    setSessions([]);
    setSelectedSession(null);
    toast.success("Debug sessions cleared");
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600";
    if (confidence >= 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceBadgeVariant = (confidence: number): "default" | "secondary" | "destructive" => {
    if (confidence >= 0.8) return "default";
    if (confidence >= 0.6) return "secondary";
    return "destructive";
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'debug': return 'text-purple-600 bg-purple-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-[1800px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-light text-gray-900 mb-2 flex items-center gap-3">
                <Bug className="h-8 w-8 text-blue-600" />
                Dialogflow Debugger
              </h1>
              <p className="text-gray-600 font-light">
                Debug and troubleshoot your Dialogflow agent in real-time
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={clearSessions}
                variant="outline"
                className="gap-2"
                disabled={sessions.length === 0}
              >
                <Trash2 className="h-4 w-4" />
                Clear Sessions
              </Button>
              <Button
                onClick={() => refetchLogs()}
                variant="outline"
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Debug Input */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-blue-600" />
              Debug Console
            </CardTitle>
            <CardDescription>
              Enter user input to test intent detection and entity extraction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                placeholder="Enter user input to debug..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDebugInput()}
                className="flex-1 text-lg"
              />
              <Button
                onClick={handleDebugInput}
                disabled={detectIntentMutation.isPending || !input.trim()}
                className="gap-2 px-8"
              >
                <Play className="h-4 w-4" />
                {detectIntentMutation.isPending ? "Detecting..." : "Debug"}
              </Button>
            </div>

            {/* Intent Predictions */}
            {intentMatches && intentMatches.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Predicted Intents:</p>
                <div className="space-y-2">
                  {intentMatches.slice(0, 3).map((match, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">{match.intentName}</span>
                      <Badge variant={getConfidenceBadgeVariant(match.confidence)}>
                        {(match.confidence * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Debug Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Debug Sessions */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  Debug Sessions
                </CardTitle>
                <CardDescription>
                  {sessions.length} session{sessions.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  {sessions.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Bug className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No debug sessions yet</p>
                      <p className="text-sm mt-1">Enter input above to start debugging</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {sessions.map((session) => (
                        <div
                          key={session.id}
                          onClick={() => setSelectedSession(session)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedSession?.id === session.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <p className="text-sm font-medium text-gray-900 line-clamp-2">
                              {session.input}
                            </p>
                            <Badge
                              variant={getConfidenceBadgeVariant(session.confidence)}
                              className="ml-2"
                            >
                              {(session.confidence * 100).toFixed(0)}%
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Clock className="h-3 w-3" />
                            {formatTime(session.timestamp)}
                          </div>
                          {session.intent && (
                            <div className="mt-2 flex items-center gap-2">
                              <Target className="h-3 w-3 text-blue-600" />
                              <span className="text-xs font-medium text-blue-600">
                                {session.intent}
                              </span>
                            </div>
                          )}
                          {session.entities.length > 0 && (
                            <div className="mt-1 flex items-center gap-2">
                              <Tag className="h-3 w-3 text-green-600" />
                              <span className="text-xs text-green-600">
                                {session.entities.length} entit{session.entities.length !== 1 ? 'ies' : 'y'}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right: Session Details */}
          <div className="lg:col-span-2 space-y-6">
            {selectedSession ? (
              <>
                {/* Session Overview */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Session Details</CardTitle>
                    <CardDescription>
                      Detailed information about the debug session
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="entities">Entities</TabsTrigger>
                        <TabsTrigger value="context">Context</TabsTrigger>
                        <TabsTrigger value="raw">Raw Data</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="mt-6 space-y-4">
                        {/* User Input */}
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            User Input
                          </label>
                          <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                            <p className="text-gray-900">{selectedSession.input}</p>
                          </div>
                        </div>

                        {/* Detected Intent */}
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Detected Intent
                          </label>
                          <div className="mt-1 flex items-center gap-3">
                            <span className="text-lg font-semibold text-gray-900">
                              {selectedSession.intent || 'No intent matched'}
                            </span>
                            <Badge variant={getConfidenceBadgeVariant(selectedSession.confidence)}>
                              Confidence: {(selectedSession.confidence * 100).toFixed(1)}%
                            </Badge>
                          </div>
                        </div>

                        {/* Response */}
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Agent Response
                          </label>
                          <div className="mt-1 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-gray-900">{selectedSession.response}</p>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-600">Session ID</p>
                            <p className="text-lg font-semibold text-gray-900 truncate">
                              {selectedSession.sessionId}
                            </p>
                          </div>
                          <div className="p-4 bg-purple-50 rounded-lg">
                            <p className="text-sm text-gray-600">Timestamp</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {new Date(selectedSession.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="entities" className="mt-6">
                        {selectedSession.entities.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Entity Type</TableHead>
                                <TableHead>Value</TableHead>
                                <TableHead>Confidence</TableHead>
                                <TableHead>Position</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {selectedSession.entities.map((entity, index) => (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">
                                    {entity.type}
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline">{entity.value}</Badge>
                                  </TableCell>
                                  <TableCell>
                                    <span className={getConfidenceColor(entity.confidence)}>
                                      {(entity.confidence * 100).toFixed(1)}%
                                    </span>
                                  </TableCell>
                                  <TableCell className="text-sm text-gray-600">
                                    {entity.startIndex !== undefined && entity.endIndex !== undefined
                                      ? `${entity.startIndex}-${entity.endIndex}`
                                      : 'N/A'}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <Tag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>No entities detected</p>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="context" className="mt-6">
                        {selectedSession.context && selectedSession.context.length > 0 ? (
                          <div className="space-y-4">
                            {selectedSession.context.map((ctx, index) => (
                              <Card key={index}>
                                <CardHeader>
                                  <CardTitle className="text-base">{ctx.name}</CardTitle>
                                  <CardDescription>
                                    Lifespan: {ctx.lifespanCount} turns
                                  </CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <pre className="text-sm bg-gray-50 p-3 rounded-lg overflow-auto">
                                    {JSON.stringify(ctx.parameters, null, 2)}
                                  </pre>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <Code className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>No active contexts</p>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="raw" className="mt-6">
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm max-h-[500px]">
                          {JSON.stringify(selectedSession, null, 2)}
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Debug Logs */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Terminal className="h-5 w-5 text-orange-600" />
                      Debug Logs
                    </CardTitle>
                    <CardDescription>Real-time execution logs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2">
                        {debugLogs?.map((log) => (
                          <div
                            key={log.id}
                            className={`p-3 rounded-lg ${getLogLevelColor(log.level)}`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                {log.level === 'error' && <AlertCircle className="h-4 w-4" />}
                                {log.level === 'warning' && <AlertCircle className="h-4 w-4" />}
                                {log.level === 'info' && <CheckCircle2 className="h-4 w-4" />}
                                <span className="text-sm font-medium">{log.message}</span>
                              </div>
                              <span className="text-xs opacity-75">
                                {formatTime(log.timestamp)}
                              </span>
                            </div>
                            {log.details && (
                              <pre className="text-xs mt-2 opacity-75 overflow-auto">
                                {JSON.stringify(log.details, null, 2)}
                              </pre>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="flex items-center justify-center py-32">
                  <div className="text-center">
                    <Bug className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500 text-lg mb-2">No session selected</p>
                    <p className="text-sm text-gray-400">
                      Debug some input or select a session from the left
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogflowDebugger;
