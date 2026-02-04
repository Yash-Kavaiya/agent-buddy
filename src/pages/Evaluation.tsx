import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ClipboardCheck,
  Play,
  Plus,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Target,
  AlertCircle,
  Download,
  Loader2,
  BarChart3,
  Gauge,
  MessageSquare,
  Zap,
  Timer,
  ShieldCheck,
  Upload,
  RefreshCw,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Eye,
  BookOpen,
  Sparkles,
  ShieldAlert,
  FileCheck,
} from "lucide-react";
import { toast } from "sonner";

// Types
interface Evaluation {
  id: string;
  name: string;
  type: 'intent' | 'response' | 'entity' | 'flow' | 'latency' | 'edge' | 'hallucination' | 'factual' | 'coherence' | 'toxicity' | 'prompt_adherence';
  status: 'pending' | 'running' | 'completed' | 'failed';
  score: number;
  totalTests: number;
  passedTests: number;
  avgLatency: number;
  createdAt: Date;
  completedAt?: Date;
}

interface EvaluationMetric {
  name: string;
  value: number;
  unit: string;
  change: number;
  status: 'good' | 'warning' | 'critical';
}

interface BenchmarkTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  testCases: number;
  avgScore: number;
}

// Mock data
const mockEvaluations: Evaluation[] = [
  {
    id: '1',
    name: 'Customer Support Intent Accuracy',
    type: 'intent',
    status: 'completed',
    score: 94.5,
    totalTests: 150,
    passedTests: 142,
    avgLatency: 245,
    createdAt: new Date('2024-01-15'),
    completedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'FAQ Response Quality',
    type: 'response',
    status: 'completed',
    score: 88.2,
    totalTests: 80,
    passedTests: 71,
    avgLatency: 312,
    createdAt: new Date('2024-01-14'),
    completedAt: new Date('2024-01-14'),
  },
  {
    id: '3',
    name: 'Entity Extraction Test',
    type: 'entity',
    status: 'running',
    score: 0,
    totalTests: 100,
    passedTests: 0,
    avgLatency: 0,
    createdAt: new Date('2024-01-16'),
  },
  {
    id: '4',
    name: 'Multi-turn Flow Validation',
    type: 'flow',
    status: 'pending',
    score: 0,
    totalTests: 50,
    passedTests: 0,
    avgLatency: 0,
    createdAt: new Date('2024-01-16'),
  },
];

const mockMetrics: EvaluationMetric[] = [
  { name: 'Overall Score', value: 91.3, unit: '%', change: 2.4, status: 'good' },
  { name: 'Intent Accuracy', value: 94.5, unit: '%', change: 1.2, status: 'good' },
  { name: 'Avg Response Time', value: 278, unit: 'ms', change: -15, status: 'good' },
  { name: 'Entity Precision', value: 87.8, unit: '%', change: -0.5, status: 'warning' },
];

const mockBenchmarks: BenchmarkTemplate[] = [
  {
    id: '1',
    name: 'Customer Support Standard',
    description: 'Industry-standard benchmark for customer support agents',
    category: 'Customer Support',
    testCases: 200,
    avgScore: 85,
  },
  {
    id: '2',
    name: 'FAQ Bot Evaluation',
    description: 'Comprehensive FAQ response quality assessment',
    category: 'FAQ',
    testCases: 100,
    avgScore: 90,
  },
  {
    id: '3',
    name: 'Booking Agent Test Suite',
    description: 'End-to-end booking flow validation',
    category: 'Booking',
    testCases: 75,
    avgScore: 88,
  },
  {
    id: '4',
    name: 'Multi-language Support',
    description: 'Cross-language intent and entity detection',
    category: 'Localization',
    testCases: 150,
    avgScore: 82,
  },
];

const evaluationTypes = [
  {
    type: 'intent',
    name: 'Intent Accuracy',
    description: 'Measure how accurately the agent identifies user intents',
    icon: Target,
    color: 'bg-blue-500',
  },
  {
    type: 'response',
    name: 'Response Quality',
    description: 'Evaluate the relevance and helpfulness of responses',
    icon: MessageSquare,
    color: 'bg-green-500',
  },
  {
    type: 'entity',
    name: 'Entity Extraction',
    description: 'Test entity recognition accuracy',
    icon: ClipboardCheck,
    color: 'bg-purple-500',
  },
  {
    type: 'flow',
    name: 'Conversation Flow',
    description: 'Validate multi-turn conversation handling',
    icon: RefreshCw,
    color: 'bg-orange-500',
  },
  {
    type: 'latency',
    name: 'Latency Testing',
    description: 'Measure response time performance',
    icon: Timer,
    color: 'bg-cyan-500',
  },
  {
    type: 'edge',
    name: 'Edge Case Handling',
    description: 'Test boundary conditions and error handling',
    icon: ShieldCheck,
    color: 'bg-red-500',
  },
  // LLM Evaluation Types
  {
    type: 'hallucination',
    name: 'Hallucination Detection',
    description: 'Detect fabricated or inaccurate information in LLM responses',
    icon: Eye,
    color: 'bg-pink-500',
  },
  {
    type: 'factual',
    name: 'Factual Accuracy',
    description: 'Verify correctness of facts and claims against ground truth',
    icon: BookOpen,
    color: 'bg-indigo-500',
  },
  {
    type: 'coherence',
    name: 'Coherence & Fluency',
    description: 'Evaluate logical consistency and natural language quality',
    icon: Sparkles,
    color: 'bg-amber-500',
  },
  {
    type: 'toxicity',
    name: 'Toxicity & Safety',
    description: 'Screen for harmful, biased, or inappropriate content',
    icon: ShieldAlert,
    color: 'bg-rose-600',
  },
  {
    type: 'prompt_adherence',
    name: 'Prompt Adherence',
    description: 'Measure how well responses follow system instructions',
    icon: FileCheck,
    color: 'bg-teal-500',
  },
];

const Evaluation = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [evaluations, setEvaluations] = useState<Evaluation[]>(mockEvaluations);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [newEvalName, setNewEvalName] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [runProgress, setRunProgress] = useState(0);

  const handleCreateEvaluation = () => {
    if (!newEvalName || !selectedType) {
      toast.error("Please fill in all fields");
      return;
    }

    const newEval: Evaluation = {
      id: Date.now().toString(),
      name: newEvalName,
      type: selectedType as Evaluation['type'],
      status: 'pending',
      score: 0,
      totalTests: Math.floor(Math.random() * 100) + 50,
      passedTests: 0,
      avgLatency: 0,
      createdAt: new Date(),
    };

    setEvaluations([newEval, ...evaluations]);
    setNewEvalName("");
    setSelectedType("");
    setIsCreateDialogOpen(false);
    toast.success("Evaluation created successfully");
  };

  const handleRunEvaluation = (evalId: string) => {
    setIsRunning(true);
    setRunProgress(0);

    const interval = setInterval(() => {
      setRunProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);

          setEvaluations(evaluations.map(e => {
            if (e.id === evalId) {
              const passedTests = Math.floor(e.totalTests * (0.85 + Math.random() * 0.15));
              return {
                ...e,
                status: 'completed' as const,
                score: (passedTests / e.totalTests) * 100,
                passedTests,
                avgLatency: Math.floor(200 + Math.random() * 150),
                completedAt: new Date(),
              };
            }
            return e;
          }));

          toast.success("Evaluation completed successfully");
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const getStatusIcon = (status: Evaluation['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'running':
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: Evaluation['status']) => {
    const variants: Record<Evaluation['status'], 'default' | 'secondary' | 'destructive'> = {
      completed: 'default',
      failed: 'destructive',
      running: 'secondary',
      pending: 'secondary',
    };
    return variants[status] || 'secondary';
  };

  const getTypeIcon = (type: string) => {
    const evalType = evaluationTypes.find(t => t.type === type);
    if (!evalType) return <ClipboardCheck className="h-4 w-4" />;
    const Icon = evalType.icon;
    return <Icon className="h-4 w-4" />;
  };

  const downloadReport = () => {
    const reportData = JSON.stringify({
      generatedAt: new Date().toISOString(),
      metrics: mockMetrics,
      evaluations: evaluations.filter(e => e.status === 'completed'),
    }, null, 2);

    const blob = new Blob([reportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evaluation-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Report downloaded");
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
                <ClipboardCheck className="h-8 w-8 text-blue-600" />
                Agent Evaluation
              </h1>
              <p className="text-gray-600 font-light">
                Comprehensive evaluation and benchmarking for your Dialogflow agents
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={downloadReport} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4" />
                    New Evaluation
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Evaluation</DialogTitle>
                    <DialogDescription>
                      Set up a new evaluation for your agent
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="evalName">Evaluation Name</Label>
                      <Input
                        id="evalName"
                        value={newEvalName}
                        onChange={(e) => setNewEvalName(e.target.value)}
                        placeholder="e.g., Customer Support Accuracy Test"
                      />
                    </div>
                    <div>
                      <Label htmlFor="evalType">Evaluation Type</Label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select evaluation type" />
                        </SelectTrigger>
                        <SelectContent>
                          {evaluationTypes.map((type) => (
                            <SelectItem key={type.type} value={type.type}>
                              <div className="flex items-center gap-2">
                                <type.icon className="h-4 w-4" />
                                {type.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="testData">Test Dataset (Optional)</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Drop CSV or JSON file here, or click to browse
                        </p>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateEvaluation}>
                      Create Evaluation
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {mockMetrics.map((metric, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    {metric.name}
                  </span>
                  {metric.status === 'good' && (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                  {metric.status === 'warning' && (
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  )}
                  {metric.status === 'critical' && (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </span>
                  <span className="text-sm text-gray-600">{metric.unit}</span>
                </div>
                <div className={`flex items-center gap-1 text-sm mt-1 ${metric.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {metric.change > 0 ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span>{Math.abs(metric.change)}% from last week</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="evaluations" className="gap-2">
              <ClipboardCheck className="h-4 w-4" />
              Evaluations
            </TabsTrigger>
            <TabsTrigger value="types" className="gap-2">
              <Target className="h-4 w-4" />
              Evaluation Types
            </TabsTrigger>
            <TabsTrigger value="llm" className="gap-2">
              <Brain className="h-4 w-4" />
              LLM Evaluation
            </TabsTrigger>
            <TabsTrigger value="benchmarks" className="gap-2">
              <Award className="h-4 w-4" />
              Benchmarks
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Evaluations */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Recent Evaluations
                  </CardTitle>
                  <CardDescription>Latest evaluation runs</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {evaluations.slice(0, 5).map((evaluation) => (
                        <div
                          key={evaluation.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {getStatusIcon(evaluation.status)}
                            <div>
                              <p className="font-medium text-sm text-gray-900">
                                {evaluation.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {evaluation.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {evaluation.status === 'completed' && (
                              <span className="text-lg font-bold text-gray-900">
                                {evaluation.score.toFixed(1)}%
                              </span>
                            )}
                            <Badge variant={getStatusBadge(evaluation.status)} className="ml-2">
                              {evaluation.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Performance Overview
                  </CardTitle>
                  <CardDescription>Aggregate evaluation metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Intent Accuracy</span>
                        <span className="font-medium">94.5%</span>
                      </div>
                      <Progress value={94.5} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Response Quality</span>
                        <span className="font-medium">88.2%</span>
                      </div>
                      <Progress value={88.2} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Entity Extraction</span>
                        <span className="font-medium">87.8%</span>
                      </div>
                      <Progress value={87.8} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Flow Completion</span>
                        <span className="font-medium">92.1%</span>
                      </div>
                      <Progress value={92.1} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Edge Case Handling</span>
                        <span className="font-medium">78.5%</span>
                      </div>
                      <Progress value={78.5} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Evaluations Tab */}
          <TabsContent value="evaluations" className="space-y-6">
            {isRunning && (
              <Card className="border-0 shadow-lg bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900">Running Evaluation...</p>
                      <Progress value={runProgress} className="h-2 mt-2" />
                    </div>
                    <span className="text-sm font-medium text-blue-900">
                      {Math.round(runProgress)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>All Evaluations</CardTitle>
                <CardDescription>{evaluations.length} total evaluations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Tests</TableHead>
                      <TableHead>Avg Latency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {evaluations.map((evaluation) => (
                      <TableRow key={evaluation.id}>
                        <TableCell>{getStatusIcon(evaluation.status)}</TableCell>
                        <TableCell className="font-medium">{evaluation.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1">
                            {getTypeIcon(evaluation.type)}
                            {evaluationTypes.find(t => t.type === evaluation.type)?.name}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {evaluation.status === 'completed' ? (
                            <span className={`font-bold ${evaluation.score >= 90 ? 'text-green-600' :
                              evaluation.score >= 80 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                              {evaluation.score.toFixed(1)}%
                            </span>
                          ) : '-'}
                        </TableCell>
                        <TableCell>
                          {evaluation.passedTests}/{evaluation.totalTests}
                        </TableCell>
                        <TableCell>
                          {evaluation.avgLatency > 0 ? `${evaluation.avgLatency}ms` : '-'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(evaluation.status)}>
                            {evaluation.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {evaluation.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => handleRunEvaluation(evaluation.id)}
                              disabled={isRunning}
                              className="gap-1"
                            >
                              <Play className="h-3 w-3" />
                              Run
                            </Button>
                          )}
                          {evaluation.status === 'completed' && (
                            <Button size="sm" variant="outline" className="gap-1">
                              <FileText className="h-3 w-3" />
                              View
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Evaluation Types Tab */}
          <TabsContent value="types" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {evaluationTypes.map((type) => (
                <Card key={type.type} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center mb-4`}>
                      <type.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => {
                        setSelectedType(type.type);
                        setIsCreateDialogOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      Create Evaluation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* LLM Evaluation Tab */}
          <TabsContent value="llm" className="space-y-6">
            {/* LLM Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-pink-100">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-pink-600" />
                    <span className="text-xs font-medium text-pink-700">Hallucination Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-pink-900">2.3%</div>
                  <div className="text-xs text-pink-600">↓ 0.5% from baseline</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                    <span className="text-xs font-medium text-indigo-700">Factual Accuracy</span>
                  </div>
                  <div className="text-2xl font-bold text-indigo-900">96.8%</div>
                  <div className="text-xs text-indigo-600">↑ 1.2% improvement</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-amber-600" />
                    <span className="text-xs font-medium text-amber-700">Coherence Score</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-900">4.6/5</div>
                  <div className="text-xs text-amber-600">Based on 1.2k samples</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-rose-50 to-rose-100">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="h-4 w-4 text-rose-600" />
                    <span className="text-xs font-medium text-rose-700">Safety Score</span>
                  </div>
                  <div className="text-2xl font-bold text-rose-900">99.1%</div>
                  <div className="text-xs text-rose-600">0 critical issues</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-teal-100">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="h-4 w-4 text-teal-600" />
                    <span className="text-xs font-medium text-teal-700">Prompt Adherence</span>
                  </div>
                  <div className="text-2xl font-bold text-teal-900">91.4%</div>
                  <div className="text-xs text-teal-600">↑ 3.2% from last run</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LLM Evaluation Types */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      LLM Evaluation Types
                    </CardTitle>
                    <CardDescription>
                      Specialized evaluation metrics for Large Language Models
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {evaluationTypes.filter(t => ['hallucination', 'factual', 'coherence', 'toxicity', 'prompt_adherence'].includes(t.type)).map((type) => (
                        <div key={type.type} className="p-4 rounded-lg border-2 border-gray-200 hover:border-purple-300 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 ${type.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <type.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{type.name}</h4>
                              <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                              <Button
                                size="sm"
                                variant="outline"
                                className="mt-3 gap-1"
                                onClick={() => {
                                  setSelectedType(type.type);
                                  setIsCreateDialogOpen(true);
                                }}
                              >
                                <Plus className="h-3 w-3" />
                                Run Test
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick LLM Test */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      Quick LLM Test
                    </CardTitle>
                    <CardDescription>
                      Run a quick evaluation on a single prompt
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>System Prompt</Label>
                      <Textarea
                        placeholder="You are a helpful assistant..."
                        className="mt-1 h-20"
                      />
                    </div>
                    <div>
                      <Label>User Input</Label>
                      <Textarea
                        placeholder="Enter a test query..."
                        className="mt-1 h-20"
                      />
                    </div>
                    <div>
                      <Label>Expected Response (Ground Truth)</Label>
                      <Textarea
                        placeholder="Expected response for comparison..."
                        className="mt-1 h-20"
                      />
                    </div>
                    <div>
                      <Label>Evaluation Criteria</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary" className="cursor-pointer hover:bg-pink-100">Hallucination</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-indigo-100">Factual</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-amber-100">Coherence</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-rose-100">Safety</Badge>
                      </div>
                    </div>
                    <Button className="w-full gap-2 bg-purple-600 hover:bg-purple-700">
                      <Play className="h-4 w-4" />
                      Run Quick Test
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* LLM Benchmark Suites */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-600" />
                  LLM Benchmark Suites
                </CardTitle>
                <CardDescription>
                  Industry-standard benchmarks for LLM evaluation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-orange-600" />
                      <h4 className="font-semibold text-gray-900">TruthfulQA</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Tests model truthfulness and resistance to generating false information</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">817 questions</span>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Play className="h-3 w-3" />
                        Run
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldAlert className="h-5 w-5 text-orange-600" />
                      <h4 className="font-semibold text-gray-900">RealToxicityPrompts</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Measures toxic content generation across diverse prompts</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">100k prompts</span>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Play className="h-3 w-3" />
                        Run
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-orange-600" />
                      <h4 className="font-semibold text-gray-900">MT-Bench</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Multi-turn conversation quality benchmark</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">80 conversations</span>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Play className="h-3 w-3" />
                        Run
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Benchmarks Tab */}
          <TabsContent value="benchmarks" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Benchmark Library
                </CardTitle>
                <CardDescription>
                  Pre-built evaluation templates for common use cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockBenchmarks.map((benchmark) => (
                    <div
                      key={benchmark.id}
                      className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{benchmark.name}</h4>
                          <Badge variant="outline" className="mt-1">{benchmark.category}</Badge>
                        </div>
                        <div className="text-right">
                          <Gauge className="h-5 w-5 text-blue-600 inline-block" />
                          <span className="ml-1 font-bold text-blue-600">{benchmark.avgScore}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{benchmark.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {benchmark.testCases} test cases
                        </span>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Play className="h-3 w-3" />
                          Run Benchmark
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Evaluation;
