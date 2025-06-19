
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, Target, Award, Globe } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { label: "Years of Experience", value: "10+", icon: Award },
    { label: "Happy Clients", value: "500+", icon: Users },
    { label: "Projects Completed", value: "1,000+", icon: Target },
    { label: "Countries Served", value: "25+", icon: Globe },
  ];

  const values = [
    {
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible with conversational AI technology."
    },
    {
      title: "Quality",
      description: "We deliver high-quality solutions that exceed our clients' expectations every time."
    },
    {
      title: "Customer-Centric",
      description: "Our customers are at the heart of everything we do. Their success is our success."
    },
    {
      title: "Transparency",
      description: "We believe in open communication and honest partnerships with our clients."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Agents Buddy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about making conversational AI accessible to everyone. 
            Our mission is to empower developers and businesses with powerful tools 
            to create amazing Dialogflow experiences.
          </p>
        </div>

        {/* Company Story */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Our Story</CardTitle>
            <CardDescription>How Agents Buddy came to be</CardDescription>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2014, Agents Buddy emerged from a simple observation: while Google's Dialogflow 
              was revolutionizing conversational AI, developers needed better tools to harness its full potential. 
              Our founding team, consisting of AI researchers and software engineers, experienced firsthand 
              the challenges of building sophisticated chatbots and virtual assistants.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              What started as an internal tool for our consulting projects quickly evolved into a comprehensive 
              platform that hundreds of developers now rely on. We've grown from a small team of 3 to a 
              global company serving clients across 25+ countries, but our core mission remains unchanged: 
              making Dialogflow development faster, easier, and more powerful.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, Agents Buddy is trusted by startups, enterprises, and everything in between. 
              We're proud to be part of the conversational AI revolution, and we're just getting started.
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Values */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Our Values</CardTitle>
            <CardDescription>The principles that guide everything we do</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Work With Us?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who trust Agents Buddy for their Dialogflow projects. 
              Let's build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/career">Join Our Team</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
