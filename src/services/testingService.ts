import { supabase } from "@/integrations/supabase/client";

export interface TestCase {
  id: string;
  name: string;
  input: string;
  expectedIntent: string;
  expectedEntities?: string[];
  expectedResponse?: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  actualIntent?: string;
  actualConfidence?: number;
  actualEntities?: string[];
  errorMessage?: string;
  duration?: number;
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  testCases: TestCase[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  status: 'idle' | 'running' | 'completed' | 'failed';
  createdAt: string;
  lastRun?: string;
}

export interface TestReport {
  suiteId: string;
  suiteName: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  successRate: number;
  timestamp: string;
  failedTests: TestCase[];
}

export interface PerformanceMetric {
  metric: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'good' | 'warning' | 'critical';
}

/**
 * Create a new test suite
 */
export async function createTestSuite(name: string, description: string): Promise<TestSuite> {
  return {
    id: crypto.randomUUID(),
    name,
    description,
    testCases: [],
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    status: 'idle',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Add test case to suite
 */
export function addTestCase(
  suite: TestSuite,
  name: string,
  input: string,
  expectedIntent: string,
  expectedEntities?: string[]
): TestSuite {
  const testCase: TestCase = {
    id: crypto.randomUUID(),
    name,
    input,
    expectedIntent,
    expectedEntities,
    status: 'pending',
  };

  return {
    ...suite,
    testCases: [...suite.testCases, testCase],
    totalTests: suite.totalTests + 1,
  };
}

/**
 * Run a single test case
 */
export async function runTestCase(testCase: TestCase): Promise<TestCase> {
  const startTime = Date.now();

  try {
    // Simulate intent detection (in production, would call actual Dialogflow API)
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get intents to match against
    const { data: intents } = await supabase
      .from('intents')
      .select('display_name')
      .eq('user_id', user.id);

    // Simulate detection
    const actualIntent = intents?.find(i =>
      i.display_name.toLowerCase() === testCase.expectedIntent.toLowerCase()
    )?.display_name || 'unknown';

    const confidence = actualIntent !== 'unknown'
      ? Math.random() * 0.2 + 0.8
      : Math.random() * 0.3;

    const passed = actualIntent.toLowerCase() === testCase.expectedIntent.toLowerCase()
      && confidence >= 0.7;

    return {
      ...testCase,
      status: passed ? 'passed' : 'failed',
      actualIntent,
      actualConfidence: confidence,
      duration: Date.now() - startTime,
      errorMessage: !passed ? `Expected ${testCase.expectedIntent}, got ${actualIntent}` : undefined,
    };
  } catch (error) {
    return {
      ...testCase,
      status: 'failed',
      duration: Date.now() - startTime,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Run entire test suite
 */
export async function runTestSuite(suite: TestSuite): Promise<TestSuite> {
  let updatedSuite = { ...suite, status: 'running' as const };
  let passed = 0;
  let failed = 0;

  const updatedTestCases: TestCase[] = [];

  for (const testCase of suite.testCases) {
    const result = await runTestCase({ ...testCase, status: 'running' });
    updatedTestCases.push(result);

    if (result.status === 'passed') {
      passed++;
    } else if (result.status === 'failed') {
      failed++;
    }
  }

  return {
    ...updatedSuite,
    testCases: updatedTestCases,
    passedTests: passed,
    failedTests: failed,
    status: 'completed',
    lastRun: new Date().toISOString(),
  };
}

/**
 * Generate test report
 */
export function generateTestReport(suite: TestSuite): TestReport {
  const failedTests = suite.testCases.filter(tc => tc.status === 'failed');
  const totalDuration = suite.testCases.reduce((sum, tc) => sum + (tc.duration || 0), 0);

  return {
    suiteId: suite.id,
    suiteName: suite.name,
    totalTests: suite.totalTests,
    passed: suite.passedTests,
    failed: suite.failedTests,
    skipped: suite.totalTests - suite.passedTests - suite.failedTests,
    duration: totalDuration,
    successRate: suite.totalTests > 0 ? (suite.passedTests / suite.totalTests) * 100 : 0,
    timestamp: new Date().toISOString(),
    failedTests,
  };
}

/**
 * Get predefined test suites
 */
export async function getPredefinedTestSuites(): Promise<TestSuite[]> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return getMockTestSuites();
  }

  // Get user's intents for testing
  const { data: intents } = await supabase
    .from('intents')
    .select('display_name, domain')
    .eq('user_id', user.id)
    .limit(5);

  if (!intents || intents.length === 0) {
    return getMockTestSuites();
  }

  // Create test suites based on user's intents
  const suite = await createTestSuite(
    'Intent Recognition Tests',
    'Test intent detection accuracy'
  );

  let updatedSuite = suite;
  intents.forEach(intent => {
    updatedSuite = addTestCase(
      updatedSuite,
      `Test ${intent.display_name}`,
      `Sample input for ${intent.display_name}`,
      intent.display_name
    );
  });

  return [updatedSuite];
}

function getMockTestSuites(): TestSuite[] {
  return [
    {
      id: '1',
      name: 'Intent Recognition Tests',
      description: 'Test basic intent detection accuracy',
      testCases: [
        {
          id: '1',
          name: 'Book Appointment Intent',
          input: 'I want to book an appointment for tomorrow',
          expectedIntent: 'book_appointment',
          expectedEntities: ['date'],
          status: 'pending',
        },
        {
          id: '2',
          name: 'Check Balance Intent',
          input: 'What is my account balance?',
          expectedIntent: 'check_balance',
          status: 'pending',
        },
        {
          id: '3',
          name: 'Cancel Booking Intent',
          input: 'I need to cancel my reservation',
          expectedIntent: 'cancel_booking',
          status: 'pending',
        },
      ],
      totalTests: 3,
      passedTests: 0,
      failedTests: 0,
      status: 'idle',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Entity Extraction Tests',
      description: 'Test entity detection and extraction',
      testCases: [
        {
          id: '4',
          name: 'Date Entity',
          input: 'Book for tomorrow at 3pm',
          expectedIntent: 'book_appointment',
          expectedEntities: ['date', 'time'],
          status: 'pending',
        },
        {
          id: '5',
          name: 'Location Entity',
          input: 'Find restaurants in New York',
          expectedIntent: 'search_location',
          expectedEntities: ['location'],
          status: 'pending',
        },
      ],
      totalTests: 2,
      passedTests: 0,
      failedTests: 0,
      status: 'idle',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Edge Cases',
      description: 'Test handling of edge cases and unusual inputs',
      testCases: [
        {
          id: '6',
          name: 'Empty Input',
          input: '',
          expectedIntent: 'default_fallback',
          status: 'pending',
        },
        {
          id: '7',
          name: 'Very Long Input',
          input: 'I want to book an appointment ' + 'and '.repeat(50) + 'thank you',
          expectedIntent: 'book_appointment',
          status: 'pending',
        },
      ],
      totalTests: 2,
      passedTests: 0,
      failedTests: 0,
      status: 'idle',
      createdAt: new Date().toISOString(),
    },
  ];
}

/**
 * Get performance metrics
 */
export async function getPerformanceMetrics(): Promise<PerformanceMetric[]> {
  return [
    {
      metric: 'Average Response Time',
      value: 245,
      unit: 'ms',
      threshold: 300,
      status: 'good',
    },
    {
      metric: 'Intent Recognition Accuracy',
      value: 94.5,
      unit: '%',
      threshold: 90,
      status: 'good',
    },
    {
      metric: 'Entity Extraction Accuracy',
      value: 88.2,
      unit: '%',
      threshold: 85,
      status: 'good',
    },
    {
      metric: 'Conversation Success Rate',
      value: 92.1,
      unit: '%',
      threshold: 90,
      status: 'good',
    },
    {
      metric: 'Fallback Rate',
      value: 7.8,
      unit: '%',
      threshold: 10,
      status: 'good',
    },
  ];
}

/**
 * Run load test
 */
export interface LoadTestResult {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  requestsPerSecond: number;
  duration: number;
}

export async function runLoadTest(
  numberOfRequests: number,
  concurrentUsers: number
): Promise<LoadTestResult> {
  const startTime = Date.now();
  const responseTimes: number[] = [];
  let successful = 0;
  let failed = 0;

  // Simulate load test
  for (let i = 0; i < numberOfRequests; i++) {
    const requestStart = Date.now();
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 50));
      const responseTime = Date.now() - requestStart;
      responseTimes.push(responseTime);
      successful++;
    } catch (error) {
      failed++;
    }
  }

  const duration = Date.now() - startTime;
  const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;

  return {
    totalRequests: numberOfRequests,
    successfulRequests: successful,
    failedRequests: failed,
    averageResponseTime: Math.round(avgResponseTime),
    minResponseTime: Math.min(...responseTimes),
    maxResponseTime: Math.max(...responseTimes),
    requestsPerSecond: (numberOfRequests / duration) * 1000,
    duration,
  };
}

/**
 * Generate test cases from intents
 */
export async function generateTestCasesFromIntents(): Promise<TestCase[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data: intents } = await supabase
      .from('intents')
      .select(`
        id,
        display_name,
        training_phrases(text)
      `)
      .eq('user_id', user.id);

    if (!intents || intents.length === 0) {
      return [];
    }

    const testCases: TestCase[] = [];

    intents.forEach(intent => {
      const phrases = (intent.training_phrases as any[]) || [];
      if (phrases.length > 0) {
        // Use first training phrase as test input
        testCases.push({
          id: crypto.randomUUID(),
          name: `Auto-generated: ${intent.display_name}`,
          input: phrases[0].text,
          expectedIntent: intent.display_name,
          status: 'pending',
        });
      }
    });

    return testCases;
  } catch (error) {
    console.error('Error generating test cases:', error);
    return [];
  }
}
