
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const EntityDetection = () => {
  const [inputText, setInputText] = useState("");
  const [detectedEntities, setDetectedEntities] = useState<Array<{type: string, value: string, start: number, end: number}>>([]);

  const handleDetect = () => {
    // Mock entity detection
    const mockEntities = [
      { type: "@sys.date-time", value: "tomorrow", start: 10, end: 18 },
      { type: "@sys.location", value: "New York", start: 25, end: 33 },
      { type: "@sys.person", value: "John Smith", start: 40, end: 50 }
    ];
    setDetectedEntities(mockEntities);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Entity Detection</h1>
          <p className="text-gray-600">Detect and extract entities from user input</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Input Text</CardTitle>
              <CardDescription>Enter text to analyze for entities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter user input text here. E.g., 'I want to book a flight to New York tomorrow for John Smith'"
                rows={6}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button onClick={handleDetect} className="w-full">
                Detect Entities
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detected Entities</CardTitle>
              <CardDescription>Entities found in the input text</CardDescription>
            </CardHeader>
            <CardContent>
              {detectedEntities.length > 0 ? (
                <div className="space-y-3">
                  {detectedEntities.map((entity, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{entity.type}</Badge>
                        <span className="text-sm text-gray-500">
                          Position: {entity.start}-{entity.end}
                        </span>
                      </div>
                      <p className="font-medium">{entity.value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No entities detected yet. Enter text and click "Detect Entities".</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EntityDetection;
