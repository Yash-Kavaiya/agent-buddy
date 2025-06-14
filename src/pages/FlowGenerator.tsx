
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FlowGenerator = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Flow Generator</h1>
          <p className="text-gray-600">Design and generate conversation flows for your Dialogflow agent</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Flow Designer</CardTitle>
            <CardDescription>Create complex conversation flows with our visual designer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Visual Flow Designer</p>
                <p className="text-sm text-gray-400">Drag and drop interface coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlowGenerator;
