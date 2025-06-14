
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DialogflowDebugger = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dialogflow Debugger</h1>
          <p className="text-gray-600">Debug and troubleshoot your Dialogflow agents</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Debug Console</CardTitle>
            <CardDescription>Real-time debugging tools for your Dialogflow implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Debug Console Interface</p>
                <Button>Start Debugging</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DialogflowDebugger;
