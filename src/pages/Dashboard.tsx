import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Activity,
  BarChart3,
  MessageSquare,
  Target,
  TrendingUp,
  Clock,
  CheckCircle2,
  Folder,
  Zap,
  Plus,
  FileText,
  TestTube,
  PlayCircle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";
import {
  getDashboardMetrics,
  getUsageTrends,
  getConversationVolume,
  getTopIntents,
  getTopEntities,
  getRecentActivities,
  getPerformanceMetrics,
} from "@/services/dashboardService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch dashboard data
  const { data: metrics, isLoading: metricsLoading, refetch: refetchMetrics } = useQuery({
    queryKey: ['dashboardMetrics'],
    queryFn: getDashboardMetrics,
  });

  const { data: usageTrends, isLoading: trendsLoading } = useQuery({
    queryKey: ['usageTrends'],
    queryFn: getUsageTrends,
  });

  const { data: conversationVolume, isLoading: volumeLoading } = useQuery({
    queryKey: ['conversationVolume'],
    queryFn: getConversationVolume,
  });

  const { data: topIntents, isLoading: intentsLoading } = useQuery({
    queryKey: ['topIntents'],
    queryFn: getTopIntents,
  });

  const { data: topEntities, isLoading: entitiesLoading } = useQuery({
    queryKey: ['topEntities'],
    queryFn: getTopEntities,
  });

  const { data: recentActivities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['recentActivities'],
    queryFn: getRecentActivities,
  });

  const { data: performanceMetrics, isLoading: performanceLoading } = useQuery({
    queryKey: ['performanceMetrics'],
    queryFn: getPerformanceMetrics,
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'intent': return 'bg-blue-100 text-blue-700';
      case 'entity': return 'bg-green-100 text-green-700';
      case 'conversation': return 'bg-purple-100 text-purple-700';
      case 'system': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const COLORS = ['#4285f4', '#ea4335', '#fbbc04', '#34a853', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />

      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-light text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600 font-light flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Last updated: {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <Button
            onClick={() => {
              refetchMetrics();
              window.location.reload();
            }}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Intents */}
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <Badge variant="secondary" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  12%
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Total Intents</p>
                <p className="text-3xl font-bold text-gray-900">
                  {metricsLoading ? '...' : metrics?.totalIntents}
                </p>
                <p className="text-xs text-gray-500">+5 this week</p>
              </div>
            </CardContent>
          </Card>

          {/* Total Entities */}
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <Badge variant="secondary" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  8%
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Total Entities</p>
                <p className="text-3xl font-bold text-gray-900">
                  {metricsLoading ? '...' : metrics?.totalEntities}
                </p>
                <p className="text-xs text-gray-500">+3 this week</p>
              </div>
            </CardContent>
          </Card>

          {/* Conversations Today */}
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <Badge variant="secondary" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  23%
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Conversations Today</p>
                <p className="text-3xl font-bold text-gray-900">
                  {metricsLoading ? '...' : metrics?.conversationsToday}
                </p>
                <p className="text-xs text-gray-500">
                  {metrics?.totalConversations} total
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Success Rate */}
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-orange-600" />
                </div>
                <Badge variant="secondary" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  2%
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">
                  {metricsLoading ? '...' : `${metrics?.successRate}%`}
                </p>
                <Progress value={metrics?.successRate || 0} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
                <p className="text-blue-100 text-sm">Streamline your workflow with one-click actions</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => navigate('/intent-generator')}
                  variant="secondary"
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  New Intent
                </Button>
                <Button
                  onClick={() => navigate('/entity-detection')}
                  variant="secondary"
                  className="gap-2"
                >
                  <Target className="h-4 w-4" />
                  Add Entity
                </Button>
                <Button
                  onClick={() => navigate('/testing-tools')}
                  variant="secondary"
                  className="gap-2"
                >
                  <TestTube className="h-4 w-4" />
                  Test Agent
                </Button>
                <Button
                  onClick={() => navigate('/playbook-generator')}
                  variant="secondary"
                  className="gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Generate Playbook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Usage Trends */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Usage Trends
                </CardTitle>
                <CardDescription>Last 7 days activity overview</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="combined" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="combined">Combined</TabsTrigger>
                    <TabsTrigger value="intents">Intents</TabsTrigger>
                    <TabsTrigger value="entities">Entities</TabsTrigger>
                    <TabsTrigger value="conversations">Conversations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="combined" className="mt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={usageTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="intents"
                          stroke="#4285f4"
                          strokeWidth={2}
                          dot={{ fill: '#4285f4', r: 4 }}
                          name="Intents"
                        />
                        <Line
                          type="monotone"
                          dataKey="entities"
                          stroke="#34a853"
                          strokeWidth={2}
                          dot={{ fill: '#34a853', r: 4 }}
                          name="Entities"
                        />
                        <Line
                          type="monotone"
                          dataKey="conversations"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                          dot={{ fill: '#8b5cf6', r: 4 }}
                          name="Conversations"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  <TabsContent value="intents" className="mt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={usageTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="intents"
                          stroke="#4285f4"
                          fill="#4285f4"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  <TabsContent value="entities" className="mt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={usageTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="entities"
                          stroke="#34a853"
                          fill="#34a853"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  <TabsContent value="conversations" className="mt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={usageTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="conversations"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Conversation Volume */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Conversation Volume (Today)
                </CardTitle>
                <CardDescription>Hourly conversation distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={conversationVolume}>
                    <defs>
                      <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="hour"
                      stroke="#888"
                      tick={{ fontSize: 12 }}
                      interval={2}
                    />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#8b5cf6"
                      fillOpacity={1}
                      fill="url(#colorVolume)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>System performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {performanceMetrics?.map((metric, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {metric.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">
                            {metric.value}{metric.name.includes('Time') ? 'ms' : '%'}
                          </span>
                          <span className="text-xs text-gray-500">
                            / {metric.target}{metric.name.includes('Time') ? 'ms' : '%'} target
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={(metric.value / metric.target) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Lists and Activities */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest updates and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activitiesLoading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                  ) : recentActivities && recentActivities.length > 0 ? (
                    recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                          <span className="text-lg">{activity.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatRelativeTime(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No recent activity
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Top Intents */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Top Intents
                </CardTitle>
                <CardDescription>Most frequently triggered</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {intentsLoading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                  ) : topIntents && topIntents.length > 0 ? (
                    topIntents.map((intent, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {intent.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-600">
                              {intent.count}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {intent.successRate}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={intent.successRate} className="h-1.5" />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No intent data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Top Entities */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Top Entities
                </CardTitle>
                <CardDescription>Most used entity types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {entitiesLoading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                  ) : topEntities && topEntities.length > 0 ? (
                    topEntities.map((entity, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {entity.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-600">
                              {entity.usageCount}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {entity.accuracy}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={entity.accuracy} className="h-1.5" />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No entity data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-green-600" />
                  System Status
                </CardTitle>
                <CardDescription>Service health monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-gray-900">API Service</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-gray-900">Database</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-gray-900">AI Engine</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0">
                      Operational
                    </Badge>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Uptime</span>
                      <span className="font-semibold text-gray-900">99.9%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-gray-600">Avg Response</span>
                      <span className="font-semibold text-gray-900">
                        {metrics?.averageResponseTime}ms
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Intent Performance Chart */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle>Intent Performance Breakdown</CardTitle>
              <CardDescription>Success rates by intent type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topIntents} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="successRate" fill="#4285f4" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Entity Usage Chart */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle>Entity Usage Distribution</CardTitle>
              <CardDescription>Usage count by entity type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topEntities}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="usageCount" radius={[8, 8, 0, 0]}>
                    {topEntities?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
