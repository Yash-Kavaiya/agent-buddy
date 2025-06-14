
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DocsHelper = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Docs Helper</h1>
          <p className="text-gray-600">Interactive documentation assistant for Dialogflow</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Documentation Assistant</CardTitle>
            <CardDescription>Get instant help with Dialogflow documentation and best practices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-4">AI-Powered Documentation Helper</p>
                <p className="text-sm text-gray-400">Coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocsHelper;
