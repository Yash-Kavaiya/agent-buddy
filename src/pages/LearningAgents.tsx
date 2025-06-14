
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Book, Code, ExternalLink } from "lucide-react";

const LearningAgents = () => {
  const coreTrainingCourses = [
    {
      title: "Contact Center AI: Conversational Design Fundamentals",
      url: "https://www.cloudskillsboost.google/course_templates/160"
    },
    {
      title: "Virtual Agent Development in Dialogflow ES for Citizen Devs",
      url: "https://www.cloudskillsboost.google/course_templates/310"
    },
    {
      title: "Virtual Agent Development in Dialogflow ES for Software Devs",
      url: "https://www.cloudskillsboost.google/course_templates/306"
    },
    {
      title: "Virtual Agent Development in Dialogflow CX for Citizen Devs",
      url: "https://www.cloudskillsboost.google/course_templates/307"
    },
    {
      title: "Virtual Agent Development in Dialogflow CX for Software Devs",
      url: "https://www.cloudskillsboost.google/course_templates/309"
    },
    {
      title: "CCAI Operations and Implementation",
      url: "https://www.cloudskillsboost.google/course_templates/165"
    },
    {
      title: "Conversational AI on Vertex AI and Dialogflow CX",
      url: "https://www.cloudskillsboost.google/course_templates/892"
    },
    {
      title: "Handle Consumer Interactions with CCAIP",
      url: "https://www.cloudskillsboost.google/course_templates/944"
    },
    {
      title: "Manage Functions and Reporting with CCAIP",
      url: "https://www.cloudskillsboost.google/course_templates/958"
    },
    {
      title: "Configure and Maintain CCAIP as an Admin",
      url: "https://www.cloudskillsboost.google/course_templates/1029"
    }
  ];

  const comprehensiveCourses = [
    {
      no: 1,
      title: "CCAI Insights",
      url: "https://www.cloudskillsboost.google/course_templates/1123",
      duration: "1h 45m",
      level: "Intermediate",
      description: "In this course you will learn how to leverage Contact Center AI Insights to uncover hidden information from your contact center data to increase operational efficiency and drive data-driven business decisions."
    },
    {
      no: 2,
      title: "Intro to CCAI and CCAI Engagement Framework",
      url: "https://www.cloudskillsboost.google/course_templates/1108",
      duration: "1h 15m",
      level: "Introductory",
      description: "This is an introductory course to all solutions in the Contact Center AI (CCAI) portfolio and the generative AI features that are poised to transform them."
    },
    {
      no: 3,
      title: "CCAI Architecture",
      url: "https://www.cloudskillsboost.google/course_templates/1002",
      duration: "1h 30m",
      level: "Introductory",
      description: "In this course you will learn the key architectural considerations that need to be taken into account when designing for the implementation of CCAI solutions."
    },
    {
      no: 4,
      title: "Agent Summarization (Custom)",
      url: "https://www.cloudskillsboost.google/course_templates/1102",
      duration: "45m",
      level: "Advanced",
      description: "In this course you will learn how Contact Center AI Agent Assist can help distill complex customer interactions into concise and clear summaries."
    },
    {
      no: 5,
      title: "DFCX Virtual Agent Delivery Framework",
      url: "https://www.cloudskillsboost.google/course_templates/1100",
      duration: "2h 45m",
      level: "Advanced",
      description: "This course explores the best practices, methods, and tools to programmatically lead CCAI virtual agent delivery."
    },
    {
      no: 6,
      title: "Virtual FAQ with Data Store Agents",
      url: "https://www.cloudskillsboost.google/course_templates/1101",
      duration: "1h",
      level: "Intermediate",
      description: "In this course, you will learn how to develop a generative agent capable of answering questions from websites, documents, and/or unstructured data."
    },
    {
      no: 7,
      title: "Basic Performance Measurement",
      url: "https://www.cloudskillsboost.google/course_templates/1121",
      duration: "1h 15m",
      level: "Intermediate",
      description: "This course explores the fundamentals of the feedback loop process for virtual agent development and introduces the native capabilities within Dialogflow CX."
    },
    {
      no: 8,
      title: "DFCX Bot Building Quality Assurance",
      url: "https://www.cloudskillsboost.google/course_templates/1105",
      duration: "1h 15m",
      level: "Intermediate",
      description: "This course explores the quality assurance best practices and the tools available in Dialogflow CX to ensure production-grade quality."
    },
    {
      no: 9,
      title: "Building a Virtual Agent with Dialogflow CX",
      url: "https://www.cloudskillsboost.google/course_templates/1124",
      duration: "3h",
      level: "Intermediate",
      description: "Learn how to build a basic virtual agent for your contact center using Dialogflow CX."
    },
    {
      no: 10,
      title: "Conversation Design Fundamentals",
      url: "https://www.cloudskillsboost.google/course_templates/1070",
      duration: "1h 30m",
      level: "Introductory",
      description: "This course explores the foundational principles of conversation design to craft engaging and effective chatbot experiences."
    },
    {
      no: 11,
      title: "Webhook Fundamentals",
      url: "https://www.cloudskillsboost.google/course_templates/1107",
      duration: "30m",
      level: "Advanced",
      description: "In this course, you will learn the important role that different types of webhooks play in Dialogflow CX development."
    },
    {
      no: 12,
      title: "Incorporating Generative Features",
      url: "https://www.cloudskillsboost.google/course_templates/1104",
      duration: "1h 30m",
      level: "Advanced",
      description: "In this course you will learn how to integrate multiple advanced generative capabilities within a Dialogflow CX agent."
    },
    {
      no: 13,
      title: "Building Complex End-to-End Self-Service",
      url: "https://www.cloudskillsboost.google/course_templates/1103",
      duration: "1h 45m",
      level: "Advanced",
      description: "This course will equip you with the tools to develop complex conversational experiences in Dialogflow CX."
    },
    {
      no: 14,
      title: "CCAI Frontend Integrations",
      url: "https://www.cloudskillsboost.google/course_templates/1013",
      duration: "45m",
      level: "Advanced",
      description: "This course explores how telephony systems can connect with Google to enable phone-based interactions."
    },
    {
      no: 15,
      title: "Advanced Webhook Concepts",
      url: "https://www.cloudskillsboost.google/course_templates/1098",
      duration: "45m",
      level: "Advanced",
      description: "This course explores advanced technical considerations to optimize webhook connectivity."
    },
    {
      no: 16,
      title: "Advanced Performance Measurement",
      url: "https://www.cloudskillsboost.google/course_templates/1099",
      duration: "1h",
      level: "Advanced",
      description: "In this course, you will learn about advanced methods and tools to monitor the performance of your virtual agents."
    },
    {
      no: 17,
      title: "Generative Playbooks",
      url: "https://www.cloudskillsboost.google/course_templates/1122",
      duration: "1h 15m",
      level: "Advanced",
      description: "In this course, you will learn how to build conversational experiences leveraging Generative Playbooks."
    },
    {
      no: 18,
      title: "Advanced Conversation Design",
      url: "https://www.cloudskillsboost.google/course_templates/1106",
      duration: "45m",
      level: "Advanced",
      description: "In this course, you will learn advanced conversational design principles for both Voice and Chat channels."
    },
    {
      no: 19,
      title: "Introduction to Agent Assist and GenAI",
      url: "https://www.cloudskillsboost.google/course_templates/1159",
      duration: "2h",
      level: "Advanced",
      description: "In this course you will learn how Contact Center AI Agent Assist can enhance the productivity of human agents."
    },
    {
      no: 20,
      title: "Agent Assist Voice and Integrations",
      url: "https://www.cloudskillsboost.google/course_templates/1161",
      duration: "1h 45m",
      level: "Advanced",
      description: "In this course you will learn how Contact Center AI Agent Assist can enhance productivity through Voice channel."
    }
  ];

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Introductory':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Agents</h1>
          <p className="text-gray-600">Educational resources and tutorials for Dialogflow development</p>
        </div>

        {/* Core Training Courses */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-6 w-6 text-blue-600" />
              📋 Core Training Courses
            </CardTitle>
            <CardDescription>
              Essential courses for getting started with Contact Center AI and Dialogflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Title</TableHead>
                  <TableHead className="text-right">Access</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coreTrainingCourses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm">
                        <a 
                          href={course.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          Google Cloud Skills Boost
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Public Preview Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚀 Public Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Overview</h3>
              <p className="text-gray-600">
                For learners seeking the latest product training, this path contains courses directly sourced and adapted from our internal and partner training catalogs. Courses contained in this path are still in development, subject to frequent (or infrequent) updates, and may be unceremoniously ejected from the catalog on short notice. While we work hard to ensure content is accurate and up to date, we won't make that guarantee. For those willing to dive into this learning path, you'll be rewarded with our latest product training insights.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">20</div>
                  <div className="text-sm text-gray-600">Activities</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">about 1 month ago</div>
                  <div className="text-sm text-gray-600">Last Updated</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">Google Cloud</div>
                  <div className="text-sm text-gray-600">Management</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comprehensive Course List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-6 w-6 text-blue-600" />
              📚 Comprehensive Course List
            </CardTitle>
            <CardDescription>
              Complete training curriculum with detailed course information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">No.</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead className="text-center">Duration</TableHead>
                  <TableHead className="text-center">Level</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Access</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comprehensiveCourses.map((course) => (
                  <TableRow key={course.no}>
                    <TableCell className="text-center font-medium">{course.no}</TableCell>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell className="text-center">{course.duration}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={getLevelBadgeColor(course.level)}>
                        {course.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md">{course.description}</TableCell>
                    <TableCell className="text-center">
                      <Button asChild variant="outline" size="sm">
                        <a 
                          href={course.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearningAgents;
