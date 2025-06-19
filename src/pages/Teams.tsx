
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Github } from "lucide-react";

const Teams = () => {
  const leadership = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former VP of AI at Google, 15+ years in conversational AI",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612d6db?w=300&h=300&fit=crop&crop=face",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Ex-Amazon ML engineer, PhD in Computer Science from Stanford",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Emily Rodriguez",
      role: "VP of Product",
      bio: "Product leader with 10+ years at Microsoft and Slack",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  const teamMembers = [
    {
      name: "David Kim",
      role: "Senior Frontend Engineer",
      team: "Engineering",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Lisa Wang",
      role: "AI Research Scientist",
      team: "AI Research",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "James Wilson",
      role: "DevOps Engineer",
      team: "Infrastructure",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Maria Garcia",
      role: "UX Designer",
      team: "Design",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Alex Thompson",
      role: "Backend Engineer",
      team: "Engineering",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Rachel Brown",
      role: "Customer Success Manager",
      team: "Customer Success",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const departments = [
    { name: "Engineering", count: 12, color: "bg-blue-100 text-blue-800" },
    { name: "AI Research", count: 5, color: "bg-purple-100 text-purple-800" },
    { name: "Product", count: 4, color: "bg-green-100 text-green-800" },
    { name: "Design", count: 3, color: "bg-pink-100 text-pink-800" },
    { name: "Customer Success", count: 6, color: "bg-orange-100 text-orange-800" },
    { name: "Marketing", count: 4, color: "bg-red-100 text-red-800" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a diverse group of passionate individuals working together to revolutionize 
            conversational AI development.
          </p>
        </div>

        {/* Team Stats */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Our Teams</CardTitle>
            <CardDescription>Departments and team sizes across Agents Buddy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {departments.map((dept, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <Badge className={`${dept.color} mb-2`}>{dept.name}</Badge>
                  <div className="text-2xl font-bold text-gray-900">{dept.count}</div>
                  <div className="text-sm text-gray-500">Team Members</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leadership Team */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Leadership Team</CardTitle>
            <CardDescription>The visionaries guiding our company forward</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <div key={index} className="text-center">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{leader.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{leader.bio}</p>
                  <div className="flex justify-center space-x-3">
                    {leader.social.linkedin && (
                      <Button variant="outline" size="sm">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    )}
                    {leader.social.twitter && (
                      <Button variant="outline" size="sm">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    )}
                    {leader.social.github && (
                      <Button variant="outline" size="sm">
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Our Amazing Team</CardTitle>
            <CardDescription>Some of the talented people who make the magic happen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-1">{member.role}</p>
                  <Badge variant="outline" className="text-xs">{member.team}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Culture */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Our Culture</CardTitle>
            <CardDescription>What it's like to work at Agents Buddy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Remote-First</h3>
                <p className="text-gray-600 mb-4">
                  We've been remote-first since day one. Our team spans across 15+ countries, 
                  bringing diverse perspectives and experiences to everything we build.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Innovation Focused</h3>
                <p className="text-gray-600 mb-4">
                  We encourage experimentation and learning. Every team member has dedicated 
                  time for exploring new ideas and technologies.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Collaborative</h3>
                <p className="text-gray-600 mb-4">
                  We believe the best solutions come from diverse teams working together. 
                  Cross-functional collaboration is at the heart of how we work.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Growth Mindset</h3>
                <p className="text-gray-600 mb-4">
                  We invest heavily in our team's growth through mentorship, training, 
                  conferences, and continuous learning opportunities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to Join Our Team?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for talented, passionate people to join our mission. 
              Check out our open positions and see if there's a fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link to="/career">View Open Positions</Link>
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

export default Teams;
