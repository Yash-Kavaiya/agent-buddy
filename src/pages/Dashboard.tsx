
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 font-light">Overview of your Dialogflow development activities</p>
        </div>

        <Card className="border-0 shadow-md bg-white rounded-xl">
          <CardHeader>
            <CardTitle className="font-medium text-gray-900">Analytics Dashboard</CardTitle>
            <CardDescription className="text-gray-600">Track your development progress and agent performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">📊</span>
                </div>
                <p className="text-gray-500 mb-4 font-medium">Analytics Dashboard</p>
                <p className="text-sm text-gray-400">Charts and metrics coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
