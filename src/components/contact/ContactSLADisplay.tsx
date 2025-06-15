
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Shield, Zap, Star } from "lucide-react";

interface ContactSLADisplayProps {
  urgencyLevels: Array<{
    value: string;
    label: string;
    sla: string;
    color: string;
  }>;
  userTier: string;
}

const ContactSLADisplay = ({ urgencyLevels, userTier }: ContactSLADisplayProps) => {
  const tierBenefits = {
    free: {
      name: "Free Tier",
      color: "bg-gray-100 text-gray-800",
      icon: Clock,
      benefits: ["Community support", "Documentation access", "Basic tutorials"],
      slaMultiplier: 1,
      priority: "Standard"
    },
    pro: {
      name: "Pro Tier",
      color: "bg-blue-100 text-blue-800",
      icon: Zap,
      benefits: ["Email support", "Live chat", "Priority routing", "Advanced docs"],
      slaMultiplier: 0.5,
      priority: "High"
    },
    enterprise: {
      name: "Enterprise Tier",
      color: "bg-purple-100 text-purple-800",
      icon: Star,
      benefits: ["Phone support", "Dedicated CSM", "Video consultations", "Custom SLA"],
      slaMultiplier: 0.25,
      priority: "Critical"
    }
  };

  const currentTier = tierBenefits[userTier as keyof typeof tierBenefits];
  const TierIcon = currentTier.icon;

  const getSLATime = (baseSLA: string, multiplier: number) => {
    if (baseSLA.includes("minutes")) {
      const minutes = parseInt(baseSLA);
      const newMinutes = Math.max(1, Math.round(minutes * multiplier));
      return `${newMinutes} ${newMinutes === 1 ? 'minute' : 'minutes'}`;
    }
    if (baseSLA.includes("hours")) {
      const hours = parseInt(baseSLA);
      const newHours = Math.max(0.25, hours * multiplier);
      if (newHours < 1) {
        return `${Math.round(newHours * 60)} minutes`;
      }
      return `${newHours} ${newHours === 1 ? 'hour' : 'hours'}`;
    }
    return baseSLA;
  };

  return (
    <div className="space-y-4">
      {/* Current Tier Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TierIcon className="w-5 h-5" />
            Your Support Tier
          </CardTitle>
          <CardDescription>Current support level and benefits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={currentTier.color}>
              {currentTier.name}
            </Badge>
            <Badge variant="outline">
              {currentTier.priority} Priority
            </Badge>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Included Benefits</h4>
            <ul className="space-y-1 text-sm">
              {currentTier.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* SLA Response Times */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Response Time SLA
          </CardTitle>
          <CardDescription>Guaranteed response times by priority level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {urgencyLevels.map((level) => {
            const adjustedSLA = getSLATime(level.sla, currentTier.slaMultiplier);
            const isImproved = currentTier.slaMultiplier < 1;
            
            return (
              <div key={level.value} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                  <div>
                    <div className="font-medium text-sm">{level.label.split(' - ')[0]}</div>
                    <div className="text-xs text-gray-600">{level.label.split(' - ')[1]}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium text-sm ${isImproved ? 'text-green-600' : ''}`}>
                    {adjustedSLA}
                    {isImproved && <span className="text-xs ml-1">⚡</span>}
                  </div>
                  {isImproved && (
                    <div className="text-xs text-gray-500 line-through">{level.sla}</div>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Support Performance</CardTitle>
          <CardDescription>Our current support metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>SLA Compliance</span>
              <span className="font-medium">99.2%</span>
            </div>
            <Progress value={99.2} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>First Response Rate</span>
              <span className="font-medium">97.8%</span>
            </div>
            <Progress value={97.8} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Resolution Rate</span>
              <span className="font-medium">94.5%</span>
            </div>
            <Progress value={94.5} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2 border-t text-center">
            <div>
              <div className="text-lg font-bold text-green-600">2.3min</div>
              <div className="text-xs text-gray-600">Avg First Response</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">1.2h</div>
              <div className="text-xs text-gray-600">Avg Resolution</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Escalation Path */}
      <Card>
        <CardHeader>
          <CardTitle>Escalation Process</CardTitle>
          <CardDescription>How issues are escalated if needed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <div className="font-medium">Initial Response</div>
                <div className="text-gray-600">Support agent provides first response within SLA</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <div className="font-medium">Specialist Consultation</div>
                <div className="text-gray-600">Complex issues routed to technical specialists</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <div className="font-medium">Engineering Escalation</div>
                <div className="text-gray-600">Product team involvement for critical issues</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">4</div>
              <div>
                <div className="font-medium">Executive Review</div>
                <div className="text-gray-600">Senior leadership for enterprise critical issues</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSLADisplay;
