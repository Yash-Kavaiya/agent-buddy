
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Lightbulb, Users, Zap, Globe } from "lucide-react";

const MissionVision = () => {
  const goals = [
    {
      title: "Democratize AI",
      description: "Make advanced conversational AI accessible to developers of all skill levels",
      icon: Users
    },
    {
      title: "Accelerate Innovation",
      description: "Speed up the development process with powerful automation tools",
      icon: Zap
    },
    {
      title: "Global Impact",
      description: "Enable businesses worldwide to create better customer experiences",
      icon: Globe
    }
  ];

  const principles = [
    "User-first design in everything we build",
    "Continuous innovation and improvement",
    "Open collaboration with the developer community",
    "Ethical AI development practices",
    "Sustainable and scalable solutions",
    "Excellence in customer support"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mission & Vision</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what drives us forward and our vision for the future of conversational AI development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </div>
              <CardDescription>What we're working toward every day</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                To empower developers and businesses worldwide with intuitive, powerful tools that make 
                building exceptional conversational AI experiences effortless and accessible.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that great conversational AI shouldn't require a PhD in machine learning. 
                By providing the right tools, documentation, and support, we enable anyone to create 
                sophisticated chatbots and virtual assistants that truly understand and help users.
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </div>
              <CardDescription>The future we're building toward</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                To be the leading platform for conversational AI development, where every interaction 
                between humans and AI is meaningful, helpful, and delightful.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We envision a world where intelligent conversations are seamlessly integrated into 
                every digital experience, making technology more human, accessible, and valuable 
                for people everywhere.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Goals */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Lightbulb className="h-6 w-6 mr-3 text-yellow-600" />
              Strategic Goals
            </CardTitle>
            <CardDescription>Key objectives shaping our roadmap</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {goals.map((goal, index) => {
                const IconComponent = goal.icon;
                return (
                  <div key={index} className="p-6 bg-gray-50 rounded-lg text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{goal.title}</h3>
                    <p className="text-gray-600 text-sm">{goal.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Core Principles */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Core Principles</CardTitle>
            <CardDescription>The values that guide our decisions and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{principle}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Be part of the conversational AI revolution. Whether you're a developer, partner, or just curious 
              about what we're building, we'd love to connect with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link to="/career">Explore Careers</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/about-us">Learn More About Us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MissionVision;
