
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Webhook, Book, LayoutDashboard, Contact, DollarSign } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Intent Generator",
      description: "Automatically generate intents for your Dialogflow agent with AI assistance",
      link: "/intent-generator",
      icon: Code
    },
    {
      title: "Entity Detection",
      description: "Advanced entity detection and management for better conversation understanding",
      link: "/entity-detection",
      icon: Code
    },
    {
      title: "Webhook Generator",
      description: "Create and manage webhook endpoints for your Dialogflow fulfillment",
      link: "/webhook-generator",
      icon: Webhook
    },
    {
      title: "Flow Generator",
      description: "Design complex conversation flows with visual tools",
      link: "/flow-generator",
      icon: Code
    },
    {
      title: "Dialogflow Debugger",
      description: "Debug and troubleshoot your Dialogflow agents efficiently",
      link: "/dialogflow-debugger",
      icon: Code
    },
    {
      title: "Learning Agents",
      description: "Educational resources and tutorials for Dialogflow development",
      link: "/learning-agents",
      icon: Book
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section with Google-inspired design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
              <Code className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
            Welcome to <span className="font-normal text-blue-600">Agents Buddy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto font-light">
            Your comprehensive toolkit for Google CCAI Dialogflow development. 
            Build, test, and deploy conversational AI agents with powerful tools and resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium" asChild>
              <Link to="/dashboard">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Get Started
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full font-medium" asChild>
              <Link to="/learning-agents">
                <Book className="mr-2 h-5 w-5" />
                Learn Dialogflow
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid with Google Material Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-4">Powerful Development Tools</h2>
          <p className="text-lg text-gray-600 font-light">Everything you need to build amazing Dialogflow agents</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 rounded-xl bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-gray-900 font-medium text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-6 text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6" asChild>
                    <Link to={feature.link}>Try Now</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section with Google colors */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light mb-4">Ready to Build Amazing Agents?</h2>
          <p className="text-xl mb-8 font-light opacity-90">Join thousands of developers using Agents Buddy for their Dialogflow projects</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-medium" asChild>
              <Link to="/my-dashboard">Start Building</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-medium" asChild>
              <Link to="/pricing">
                <DollarSign className="mr-2 h-5 w-5" />
                View Pricing
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-medium" asChild>
              <Link to="/contact">
                <Contact className="mr-2 h-5 w-5" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
