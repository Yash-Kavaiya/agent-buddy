
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Target, Zap, AlertTriangle } from "lucide-react";

const IntentAnalytics: React.FC = () => {
  const generationStats = [
    { name: "Healthcare", count: 45, accuracy: 92 },
    { name: "E-commerce", count: 38, accuracy: 88 },
    { name: "Support", count: 52, accuracy: 95 },
    { name: "Banking", count: 23, accuracy: 90 },
    { name: "Travel", count: 31, accuracy: 85 }
  ];

  const performanceData = [
    { name: "Accuracy", value: 91, color: "#10b981" },
    { name: "Coverage", value: 87, color: "#3b82f6" },
    { name: "Efficiency", value: 94, color: "#8b5cf6" },
    { name: "Consistency", value: 89, color: "#f59e0b" }
  ];

  const recentActivity = [
    { intent: "book.appointment", phrases: 15, confidence: 0.92, status: "success" },
    { intent: "check.order.status", phrases: 12, confidence: 0.88, status: "success" },
    { intent: "cancel.subscription", phrases: 18, confidence: 0.95, status: "success" },
    { intent: "payment.issue", phrases: 10, confidence: 0.76, status: "warning" },
    { intent: "product.inquiry", phrases: 14, confidence: 0.91, status: "success" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <Target className="h-4 w-4 text-green-600" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <Zap className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-100 text-green-700";
      case "warning": return "bg-yellow-100 text-yellow-700";
      default: return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Intent Generation Analytics
          </CardTitle>
          <CardDescription>
            Track your intent generation performance and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {performanceData.map((metric) => (
              <div key={metric.name} className="text-center">
                <div className="mb-2">
                  <div
                    className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: metric.color }}
                  >
                    {metric.value}%
                  </div>
                </div>
                <h3 className="font-medium text-gray-900">{metric.name}</h3>
                <Progress value={metric.value} className="mt-2" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Intent Generation by Domain</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={generationStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4">Recent Intent Generation</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(activity.status)}
                      <div>
                        <p className="font-medium text-sm">{activity.intent}</p>
                        <p className="text-xs text-gray-500">
                          {activity.phrases} phrases generated
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(activity.status)}>
                        {Math.round(activity.confidence * 100)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Intents Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light text-blue-600 mb-2">189</div>
            <p className="text-sm text-gray-500">+23 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Average Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light text-green-600 mb-2">91%</div>
            <p className="text-sm text-gray-500">+2% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Training Phrases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light text-purple-600 mb-2">2,847</div>
            <p className="text-sm text-gray-500">Total generated</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IntentAnalytics;
