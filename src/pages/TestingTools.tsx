import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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
  TestTube,
  Play,
  Plus,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Zap,
  AlertCircle,
  Download,
  Loader2,
} from "lucide-react";
import {
  getPredefinedTestSuites,
  runTestCase,
  runTestSuite,
  generateTestReport,
  addTestCase,
  getPerformanceMetrics,
  generateTestCasesFromIntents,
  type TestSuite,
  type TestCase,
  type TestReport,
} from "@/services/testingService";
import { toast } from "sonner";

const TestingTools = () => {
  const [selectedSuite, setSelectedSuite] = useState<TestSuite | null>(null);
  const [testReport, setTestReport] = useState<TestReport | null>(null);
  const [newTestName, setNewTestName] = useState("");
  const [newTestInput, setNewTestInput] = useState("");
  const [newTestIntent, setNewTestIntent] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Fetch test suites
  const { data: testSuites, isLoading, refetch } = useQuery({
    queryKey: ['testSuites'],
    queryFn: getPredefinedTestSuites,
  });

  // Fetch performance metrics
  const { data: performanceMetrics } = useQuery({
    queryKey: ['performanceMetrics'],
    queryFn: getPerformanceMetrics,
  });

  // Run test suite mutation
  const runSuiteMutation = useMutation({
    mutationFn: runTestSuite,
    onSuccess: (updatedSuite) => {
      setSelectedSuite(updatedSuite);
      const report = generateTestReport(updatedSuite);
      setTestReport(report);
      toast.success(`Test suite completed: ${report.passed}/${report.totalTests} passed`);
      refetch();
    },
    onError: (error) => {
      toast.error("Failed to run test suite: " + error.message);
    },
  });

  // Auto-generate tests mutation
  const generateTestsMutation = useMutation({
    mutationFn: generateTestCasesFromIntents,
    onSuccess: (testCases) => {
      if (testCases.length === 0) {
        toast.info("No intents found to generate tests from");
        return;
      }
      toast.success(`Generated ${testCases.length} test cases from your intents`);
    },
    onError: (error) => {
      toast.error("Failed to generate tests: " + error.message);
    },
  });

  const handleRunSuite = (suite: TestSuite) => {
    runSuiteMutation.mutate(suite);
  };

  const handleAddTestCase = () => {
    if (!selectedSuite || !newTestName || !newTestInput || !newTestIntent) {
      toast.error("Please fill in all fields");
      return;
    }

    const updatedSuite = addTestCase(
      selectedSuite,
      newTestName,
      newTestInput,
      newTestIntent
    );
    setSelectedSuite(updatedSuite);
    setNewTestName("");
    setNewTestInput("");
    setNewTestIntent("");
    setIsAddDialogOpen(false);
    toast.success("Test case added successfully");
  };

  const getStatusIcon = (status: TestCase['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'running':
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: TestCase['status']) => {
    const variants: Record<TestCase['status'], 'default' | 'secondary' | 'destructive'> = {
      passed: 'default',
      failed: 'destructive',
      running: 'secondary',
      pending: 'secondary',
    };
    return variants[status] || 'secondary';
  };

  const downloadReport = () => {
    if (!testReport) return;

    const reportData = JSON.stringify(testReport, null, 2);
    const blob = new Blob([reportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Test report downloaded");
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
                <TestTube className="h-8 w-8 text-blue-600" />
                Testing Suite
              </h1>
              <p className="text-gray-600 font-light">
                Comprehensive testing tools for your Dialogflow agent
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => generateTestsMutation.mutate()}
                variant="outline"
                className="gap-2"
                disabled={generateTestsMutation.isPending}
              >
                <Zap className="h-4 w-4" />
                Auto-Generate Tests
              </Button>
              {testReport && (
                <Button
                  onClick={downloadReport}
                  variant="outline"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {performanceMetrics?.map((metric, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    {metric.metric}
                  </span>
                  {metric.status === 'good' && (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                  {metric.status === 'warning' && (
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </span>
                  <span className="text-sm text-gray-600">{metric.unit}</span>
                </div>
                <Progress
                  value={(metric.value / metric.threshold) * 100}
                  className="mt-2 h-1"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Test Suites */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  Test Suites
                </CardTitle>
                <CardDescription>
                  {testSuites?.length || 0} test suite{testSuites?.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[700px]">
                  {isLoading ? (
                    <div className="text-center py-12 text-gray-500">
                      <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin" />
                      <p>Loading test suites...</p>
                    </div>
                  ) : testSuites && testSuites.length > 0 ? (
                    <div className="space-y-3">
                      {testSuites.map((suite) => (
                        <div
                          key={suite.id}
                          onClick={() => setSelectedSuite(suite)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedSuite?.id === suite.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{suite.name}</h4>
                            <Badge variant={getStatusBadge(suite.status)}>
                              {suite.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-3">
                            {suite.description}
                          </p>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-center p-2 bg-gray-100 rounded">
                              <div className="font-semibold text-gray-900">
                                {suite.totalTests}
                              </div>
                              <div className="text-gray-600">Total</div>
                            </div>
                            <div className="text-center p-2 bg-green-100 rounded">
                              <div className="font-semibold text-green-700">
                                {suite.passedTests}
                              </div>
                              <div className="text-green-600">Passed</div>
                            </div>
                            <div className="text-center p-2 bg-red-100 rounded">
                              <div className="font-semibold text-red-700">
                                {suite.failedTests}
                              </div>
                              <div className="text-red-600">Failed</div>
                            </div>
                          </div>
                          {suite.lastRun && (
                            <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              Last run: {new Date(suite.lastRun).toLocaleString()}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <TestTube className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No test suites available</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right: Test Cases & Results */}
          <div className="lg:col-span-2 space-y-6">
            {selectedSuite ? (
              <>
                {/* Suite Header */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{selectedSuite.name}</CardTitle>
                        <CardDescription>{selectedSuite.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Plus className="h-4 w-4" />
                              Add Test
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Test Case</DialogTitle>
                              <DialogDescription>
                                Create a new test case for this suite
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="testName">Test Name</Label>
                                <Input
                                  id="testName"
                                  value={newTestName}
                                  onChange={(e) => setNewTestName(e.target.value)}
                                  placeholder="e.g., Test booking intent"
                                />
                              </div>
                              <div>
                                <Label htmlFor="testInput">User Input</Label>
                                <Textarea
                                  id="testInput"
                                  value={newTestInput}
                                  onChange={(e) => setNewTestInput(e.target.value)}
                                  placeholder="e.g., I want to book an appointment"
                                />
                              </div>
                              <div>
                                <Label htmlFor="expectedIntent">Expected Intent</Label>
                                <Input
                                  id="expectedIntent"
                                  value={newTestIntent}
                                  onChange={(e) => setNewTestIntent(e.target.value)}
                                  placeholder="e.g., book_appointment"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleAddTestCase}>
                                Add Test Case
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          onClick={() => handleRunSuite(selectedSuite)}
                          disabled={runSuiteMutation.isPending}
                          className="gap-2"
                        >
                          <Play className="h-4 w-4" />
                          {runSuiteMutation.isPending ? 'Running...' : 'Run Suite'}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedSuite.totalTests > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-900">
                            {selectedSuite.passedTests + selectedSuite.failedTests}/
                            {selectedSuite.totalTests}
                          </span>
                        </div>
                        <Progress
                          value={
                            ((selectedSuite.passedTests + selectedSuite.failedTests) /
                              selectedSuite.totalTests) *
                            100
                          }
                          className="h-2"
                        />
                        {selectedSuite.status === 'completed' && (
                          <div className="flex items-center justify-between text-sm mt-2">
                            <span className="text-green-600 font-medium">
                              Success Rate: {
                                selectedSuite.totalTests > 0
                                  ? ((selectedSuite.passedTests / selectedSuite.totalTests) * 100).toFixed(1)
                                  : 0
                              }%
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Test Cases */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Test Cases</CardTitle>
                    <CardDescription>
                      {selectedSuite.testCases.length} test case
                      {selectedSuite.testCases.length !== 1 ? 's' : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedSuite.testCases.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12"></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Input</TableHead>
                            <TableHead>Expected</TableHead>
                            <TableHead>Actual</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedSuite.testCases.map((testCase) => (
                            <TableRow key={testCase.id}>
                              <TableCell>{getStatusIcon(testCase.status)}</TableCell>
                              <TableCell className="font-medium">
                                {testCase.name}
                              </TableCell>
                              <TableCell className="max-w-xs truncate">
                                {testCase.input}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{testCase.expectedIntent}</Badge>
                              </TableCell>
                              <TableCell>
                                {testCase.actualIntent ? (
                                  <Badge
                                    variant={
                                      testCase.actualIntent === testCase.expectedIntent
                                        ? 'default'
                                        : 'destructive'
                                    }
                                  >
                                    {testCase.actualIntent}
                                  </Badge>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge variant={getStatusBadge(testCase.status)}>
                                  {testCase.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <TestTube className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No test cases in this suite</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 gap-2"
                          onClick={() => setIsAddDialogOpen(true)}
                        >
                          <Plus className="h-4 w-4" />
                          Add First Test Case
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Test Report */}
                {testReport && (
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        Test Report
                      </CardTitle>
                      <CardDescription>Latest test execution results</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-white rounded-lg shadow">
                          <div className="text-sm text-gray-600 mb-1">Total Tests</div>
                          <div className="text-2xl font-bold text-gray-900">
                            {testReport.totalTests}
                          </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow">
                          <div className="text-sm text-gray-600 mb-1">Passed</div>
                          <div className="text-2xl font-bold text-green-600">
                            {testReport.passed}
                          </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow">
                          <div className="text-sm text-gray-600 mb-1">Failed</div>
                          <div className="text-2xl font-bold text-red-600">
                            {testReport.failed}
                          </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow">
                          <div className="text-sm text-gray-600 mb-1">Success Rate</div>
                          <div className="text-2xl font-bold text-blue-600">
                            {testReport.successRate.toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      {testReport.failedTests.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-semibold text-gray-900 mb-3">Failed Tests</h4>
                          <div className="space-y-2">
                            {testReport.failedTests.map((test) => (
                              <div
                                key={test.id}
                                className="p-3 bg-white rounded-lg border border-red-200"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="font-medium text-gray-900">{test.name}</p>
                                    <p className="text-sm text-red-600 mt-1">
                                      {test.errorMessage}
                                    </p>
                                  </div>
                                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="flex items-center justify-center py-32">
                  <div className="text-center">
                    <TestTube className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500 text-lg mb-2">No test suite selected</p>
                    <p className="text-sm text-gray-400">
                      Select a test suite from the left to view details
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

export default TestingTools;
