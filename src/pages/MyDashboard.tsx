
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Webhook, Book, LayoutDashboard } from "lucide-react";

const MyDashboard = () => {
  const projects = [
    { name: "Customer Support Bot", status: "Active", lastModified: "2 hours ago" },
    { name: "Booking Assistant", status: "Draft", lastModified: "1 day ago" },
    { name: "FAQ Agent", status: "Testing", lastModified: "3 days ago" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600 font-light">Manage your Dialogflow projects and track your progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md bg-white rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light text-gray-900">3</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Intents Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light text-gray-900">47</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Webhooks Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light text-gray-900">12</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tests Run</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light text-gray-900">89</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-md bg-white rounded-xl">
          <CardHeader>
            <CardTitle className="font-medium text-gray-900">Recent Projects</CardTitle>
            <CardDescription className="text-gray-600">Your latest Dialogflow projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">Last modified {project.lastModified}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      project.status === 'Active' ? 'bg-green-100 text-green-700' :
                      project.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status}
                    </span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">Open</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyDashboard;
