
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Code } from "lucide-react";

const LearningAgents = () => {
  const courses = [
    {
      title: "Dialogflow Fundamentals",
      description: "Learn the basics of building conversational AI with Dialogflow",
      level: "Beginner",
      duration: "2 hours"
    },
    {
      title: "Advanced Intent Design",
      description: "Master complex intent patterns and entity relationships",
      level: "Intermediate",
      duration: "3 hours"
    },
    {
      title: "Webhook Development",
      description: "Build powerful fulfillment logic with webhooks",
      level: "Advanced",
      duration: "4 hours"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Agents</h1>
          <p className="text-gray-600">Educational resources and tutorials for Dialogflow development</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Book className="h-5 w-5 text-blue-600" />
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                </div>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{course.duration}</span>
                  <Button size="sm">Start Course</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningAgents;
