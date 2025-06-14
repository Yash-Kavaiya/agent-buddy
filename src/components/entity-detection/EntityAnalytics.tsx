
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Target, Clock, Award } from "lucide-react";
import { getEntityAnalytics } from "@/services/entityAnalyticsService";

interface EntityAnalytic {
  id: string;
  entity_name: string;
  entity_display_name: string;
  usage_count: number;
  accuracy_score: number;
  last_used_at: string;
  category: string;
}

interface AnalyticsData {
  entities: EntityAnalytic[];
  totalDetections: number;
  averageAccuracy: number;
  topCategories: { category: string; count: number; }[];
}

const EntityAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("7d");

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const result = await getEntityAnalytics(dateRange);
      if (result.data) {
        setAnalytics(result.data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Entity Analytics</CardTitle>
          <CardDescription>Loading analytics data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analytics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Entity Analytics</CardTitle>
          <CardDescription>No analytics data available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No analytics data yet</p>
            <p className="text-sm">Start detecting entities to see analytics</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Entity Analytics</h2>
        <p className="text-gray-600">Performance insights and usage statistics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Detections</p>
                <p className="text-2xl font-bold">{analytics.totalDetections.toLocaleString()}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Accuracy</p>
                <p className="text-2xl font-bold">{Math.round(analytics.averageAccuracy * 100)}%</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Entities</p>
                <p className="text-2xl font-bold">{analytics.entities.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Categories</p>
                <p className="text-2xl font-bold">{analytics.topCategories.length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entity Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Entity Usage</CardTitle>
            <CardDescription>Most frequently detected entities</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.entities.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="entity_display_name" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="usage_count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Entity usage by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.topCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analytics.topCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Entity Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Entity Performance</CardTitle>
          <CardDescription>Detailed performance metrics for each entity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.entities.map(entity => (
              <div key={entity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{entity.entity_display_name}</h3>
                    <Badge variant="secondary">{entity.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Last used: {new Date(entity.last_used_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{entity.usage_count}</p>
                  <p className="text-sm text-gray-600">detections</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-lg font-semibold">{Math.round(entity.accuracy_score * 100)}%</p>
                  <p className="text-sm text-gray-600">accuracy</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EntityAnalytics;
