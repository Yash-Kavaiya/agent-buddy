
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Clock, Phone, MessageCircle } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'busy' | 'offline';
  specialization: string;
  rating: number;
  responseTime: string;
}

interface AgentConnectionProps {
  onAgentConnect: (agent: Agent) => void;
  isConnected: boolean;
  connectedAgent?: Agent;
}

const AgentConnection: React.FC<AgentConnectionProps> = ({ 
  onAgentConnect, 
  isConnected, 
  connectedAgent 
}) => {
  const [availableAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      status: 'online',
      specialization: 'Technical Support',
      rating: 4.9,
      responseTime: '< 1 min'
    },
    {
      id: '2',
      name: 'Mike Chen',
      status: 'online',
      specialization: 'Account Issues',
      rating: 4.8,
      responseTime: '< 2 min'
    },
    {
      id: '3',
      name: 'Emma Davis',
      status: 'busy',
      specialization: 'Billing Support',
      rating: 4.7,
      responseTime: '~ 5 min'
    }
  ]);

  const [waitTime, setWaitTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected && connectedAgent) {
      interval = setInterval(() => {
        setWaitTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected, connectedAgent]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isConnected && connectedAgent) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Connected to Agent</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={connectedAgent.avatar} />
              <AvatarFallback>{connectedAgent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">{connectedAgent.name}</h3>
              <p className="text-sm text-gray-600">{connectedAgent.specialization}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="default" className="bg-green-500">Online</Badge>
                <span className="text-sm text-gray-500">⭐ {connectedAgent.rating}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{formatTime(waitTime)}</span>
              </div>
              <div className="flex space-x-2 mt-2">
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Available Agents</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {availableAgents.map((agent) => (
            <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={agent.avatar} />
                  <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{agent.name}</h4>
                  <p className="text-sm text-gray-600">{agent.specialization}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge 
                      variant={agent.status === 'online' ? 'default' : 'secondary'}
                      className={agent.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}
                    >
                      {agent.status}
                    </Badge>
                    <span className="text-sm text-gray-500">⭐ {agent.rating}</span>
                    <span className="text-sm text-gray-500">{agent.responseTime}</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => onAgentConnect(agent)}
                disabled={agent.status === 'offline'}
                size="sm"
              >
                Connect
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentConnection;
