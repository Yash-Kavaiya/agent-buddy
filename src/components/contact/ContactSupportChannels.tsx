
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Phone, Mail, Users, Clock, Headphones, Video, FileText } from "lucide-react";

interface ContactSupportChannelsProps {
  userTier: string;
  setUserTier: (tier: string) => void;
}

const ContactSupportChannels = ({ userTier, setUserTier }: ContactSupportChannelsProps) => {
  const supportChannels = [
    {
      icon: MessageSquare,
      title: "Live Chat Support",
      description: "Real-time assistance with contextual environment analysis",
      features: ["AI-powered routing", "Screen sharing", "Code review", "Multi-language support"],
      availability: "24/7",
      responseTime: "< 2 minutes",
      tier: "all",
      action: "Start Chat"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Direct access to specialists with priority escalation",
      features: ["Voice recognition", "Call recording", "Expert escalation", "Follow-up automation"],
      availability: "Business hours",
      responseTime: "Immediate",
      tier: "enterprise",
      action: "Schedule Call"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Intelligent routing with automated context collection",
      features: ["Smart categorization", "Attachment analysis", "Progress tracking", "SLA monitoring"],
      availability: "24/7",
      responseTime: "< 4 hours",
      tier: "all",
      action: "Send Email"
    },
    {
      icon: Users,
      title: "Community Forums",
      description: "Expert-moderated community with gamified contributions",
      features: ["Expert answers", "Peer support", "Code samples", "Best practices"],
      availability: "24/7",
      responseTime: "Community driven",
      tier: "all",
      action: "Join Discussion"
    },
    {
      icon: Video,
      title: "Video Consultation",
      description: "Face-to-face sessions for complex architectural discussions",
      features: ["Screen sharing", "Recording", "Architecture review", "Best practices"],
      availability: "By appointment",
      responseTime: "Same day",
      tier: "enterprise",
      action: "Book Session"
    },
    {
      icon: FileText,
      title: "Documentation Portal",
      description: "AI-enhanced documentation with interactive examples",
      features: ["Interactive guides", "Code generators", "Video tutorials", "API explorer"],
      availability: "24/7",
      responseTime: "Instant",
      tier: "all",
      action: "Browse Docs"
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "free": return "bg-gray-100 text-gray-800";
      case "pro": return "bg-blue-100 text-blue-800";
      case "enterprise": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const isChannelAvailable = (channelTier: string) => {
    if (channelTier === "all") return true;
    if (channelTier === "pro" && (userTier === "pro" || userTier === "enterprise")) return true;
    if (channelTier === "enterprise" && userTier === "enterprise") return true;
    return false;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Support Channels</h2>
          <p className="text-gray-600">Choose your preferred support method based on your subscription tier</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Your tier:</span>
          <Select value={userTier} onValueChange={setUserTier}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supportChannels.map((channel, index) => {
          const Icon = channel.icon;
          const isAvailable = isChannelAvailable(channel.tier);
          
          return (
            <Card key={index} className={`transition-all hover:shadow-lg ${!isAvailable ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isAvailable ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <Icon className={`w-6 h-6 ${isAvailable ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{channel.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getTierColor(channel.tier)}>
                          {channel.tier === "all" ? "All Tiers" : channel.tier.charAt(0).toUpperCase() + channel.tier.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">{channel.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-900">Availability</div>
                    <div className="text-gray-600">{channel.availability}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Response</div>
                    <div className="text-gray-600">{channel.responseTime}</div>
                  </div>
                </div>
                
                <div>
                  <div className="font-medium text-gray-900 mb-2">Features</div>
                  <div className="flex flex-wrap gap-1">
                    {channel.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  disabled={!isAvailable}
                  variant={isAvailable ? "default" : "secondary"}
                >
                  {isAvailable ? channel.action : "Upgrade Required"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Channel Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Support Channel Comparison</CardTitle>
          <CardDescription>Compare features across different support channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-center p-2">Live Chat</th>
                  <th className="text-center p-2">Phone</th>
                  <th className="text-center p-2">Email</th>
                  <th className="text-center p-2">Community</th>
                  <th className="text-center p-2">Video</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Real-time support</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">❌</td>
                  <td className="text-center p-2">❌</td>
                  <td className="text-center p-2">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Screen sharing</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">❌</td>
                  <td className="text-center p-2">❌</td>
                  <td className="text-center p-2">❌</td>
                  <td className="text-center p-2">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Available 24/7</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">❌</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">❌</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Best for</td>
                  <td className="text-center p-2">Quick help</td>
                  <td className="text-center p-2">Complex issues</td>
                  <td className="text-center p-2">Detailed queries</td>
                  <td className="text-center p-2">Learning</td>
                  <td className="text-center p-2">Architecture</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSupportChannels;
