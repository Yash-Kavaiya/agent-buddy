
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const RouteGenerator = () => {
  const [routeType, setRouteType] = useState("");
  const [startIntent, setStartIntent] = useState("");
  const [endIntent, setEndIntent] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Route Generator</h1>
          <p className="text-gray-600">Generate conversation routes for your Dialogflow agent</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Route Configuration</CardTitle>
              <CardDescription>Define the conversation route parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="routeType">Route Type</Label>
                <Select value={routeType} onValueChange={setRouteType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select route type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear Flow</SelectItem>
                    <SelectItem value="conditional">Conditional Branch</SelectItem>
                    <SelectItem value="loop">Loop Flow</SelectItem>
                    <SelectItem value="fallback">Fallback Route</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startIntent">Start Intent</Label>
                <Input
                  id="startIntent"
                  placeholder="e.g., welcome.intent"
                  value={startIntent}
                  onChange={(e) => setStartIntent(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endIntent">End Intent</Label>
                <Input
                  id="endIntent"
                  placeholder="e.g., goodbye.intent"
                  value={endIntent}
                  onChange={(e) => setEndIntent(e.target.value)}
                />
              </div>
              <Button className="w-full">Generate Route</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Route</CardTitle>
              <CardDescription>Visual representation of your conversation route</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Route visualization will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RouteGenerator;
