
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Community = () => {
  const discussions = [
    {
      title: "Best practices for intent naming conventions",
      author: "DialogflowDev",
      replies: 23,
      category: "Best Practices",
      timeAgo: "2 hours ago"
    },
    {
      title: "Webhook timeout issues in production",
      author: "BotBuilder42",
      replies: 15,
      category: "Technical",
      timeAgo: "5 hours ago"
    },
    {
      title: "New Dialogflow CX features discussion",
      author: "AIEnthusiast",
      replies: 31,
      category: "News",
      timeAgo: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
          <p className="text-gray-600">Connect with fellow Dialogflow developers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Discussions</CardTitle>
                <CardDescription>Latest conversations from the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discussions.map((discussion, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium">{discussion.title}</h3>
                        <Badge variant="outline">{discussion.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>by {discussion.author}</span>
                        <div className="flex items-center space-x-4">
                          <span>{discussion.replies} replies</span>
                          <span>{discussion.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-2xl font-bold">2,847</div>
                  <div className="text-sm text-gray-500">Active Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1,234</div>
                  <div className="text-sm text-gray-500">Discussions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">5,678</div>
                  <div className="text-sm text-gray-500">Solutions Shared</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Join the Community</CardTitle>
                <CardDescription>Connect with other developers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full">Join Discord</Button>
                  <Button variant="outline" className="w-full">Follow on Twitter</Button>
                  <Button variant="outline" className="w-full">GitHub Repository</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
