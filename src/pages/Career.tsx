
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Users, Coffee, Laptop } from "lucide-react";

const Career = () => {
  const openPositions = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      salary: "$120k - $160k",
      description: "Join our frontend team to build the next generation of conversational AI tools."
    },
    {
      title: "AI/ML Engineer",
      department: "AI Research",
      location: "Remote / New York",
      type: "Full-time",
      salary: "$140k - $180k",
      description: "Work on cutting-edge machine learning models for natural language understanding."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote / Los Angeles",
      type: "Full-time",
      salary: "$130k - $170k",
      description: "Lead product strategy and roadmap for our developer tools platform."
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $150k",
      description: "Scale our infrastructure to support millions of conversations daily."
    },
    {
      title: "Technical Writer",
      department: "Developer Relations",
      location: "Remote",
      type: "Contract",
      salary: "$80k - $100k",
      description: "Create comprehensive documentation and tutorials for our developer community."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote / Chicago",
      type: "Full-time",
      salary: "$90k - $120k",
      description: "Help our enterprise customers achieve success with our platform."
    }
  ];

  const benefits = [
    {
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours",
      icon: Laptop
    },
    {
      title: "Competitive Compensation",
      description: "Market-leading salaries plus equity",
      icon: DollarSign
    },
    {
      title: "Great Team",
      description: "Work with passionate, talented people",
      icon: Users
    },
    {
      title: "Work-Life Balance",
      description: "Unlimited PTO and wellness programs",
      icon: Coffee
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us build the future of conversational AI. We're looking for passionate, 
            talented people who want to make a real impact.
          </p>
        </div>

        {/* Why Work With Us */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Why Agents Buddy?</CardTitle>
            <CardDescription>What makes us a great place to work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Open Positions */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Open Positions</CardTitle>
            <CardDescription>Current opportunities to join our team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{position.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">{position.department}</Badge>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {position.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {position.type}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {position.salary}
                          </div>
                        </div>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700 mt-4 lg:mt-0">
                        Apply Now
                      </Button>
                    </div>
                    <p className="text-gray-600">{position.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Process */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Our Hiring Process</CardTitle>
            <CardDescription>What to expect when you apply</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">1</div>
                <h3 className="font-semibold mb-2">Application</h3>
                <p className="text-sm text-gray-600">Submit your application and resume</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">2</div>
                <h3 className="font-semibold mb-2">Phone Screen</h3>
                <p className="text-sm text-gray-600">30-minute call with our recruiter</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">3</div>
                <h3 className="font-semibold mb-2">Technical Interview</h3>
                <p className="text-sm text-gray-600">Technical discussion with the team</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">4</div>
                <h3 className="font-semibold mb-2">Final Interview</h3>
                <p className="text-sm text-gray-600">Culture fit and leadership discussion</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Don't See the Right Role?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for talented people to join our team. Send us your resume 
              and tell us what role you'd be interested in.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Send Us Your Resume
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Career;
