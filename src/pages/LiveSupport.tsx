
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LiveSupport = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dialogflow Live IT Support</h1>
          <p className="text-gray-600">Get real-time help from Dialogflow experts</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Live Support Chat</CardTitle>
            <CardDescription>Connect with our team of Dialogflow specialists</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Live Chat Interface</p>
                <Button>Start Chat</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveSupport;
