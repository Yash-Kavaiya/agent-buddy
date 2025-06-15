
import React, { useState } from 'react';
import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/live-support/ChatInterface";
import ScreenShare from "@/components/live-support/ScreenShare";
import RemoteControl from "@/components/live-support/RemoteControl";
import AgentConnection from "@/components/live-support/AgentConnection";

interface Agent {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'busy' | 'offline';
  specialization: string;
  rating: number;
  responseTime: string;
}

const LiveSupport = () => {
  const [showScreenShare, setShowScreenShare] = useState(false);
  const [showRemoteControl, setShowRemoteControl] = useState(false);
  const [connectedAgent, setConnectedAgent] = useState<Agent | null>(null);

  const handleAgentConnect = (agent: Agent) => {
    setConnectedAgent(agent);
  };

  const handleScreenShare = () => {
    setShowScreenShare(true);
  };

  const handleRemoteControl = () => {
    setShowRemoteControl(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Support Center</h1>
          <p className="text-gray-600">
            Get instant help through multiple communication channels including text, voice, video, and screen sharing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Connection Panel */}
          <div className="lg:col-span-1">
            <AgentConnection 
              onAgentConnect={handleAgentConnect}
              isConnected={!!connectedAgent}
              connectedAgent={connectedAgent || undefined}
            />
            
            {/* Support Features */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Available Features</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Real-time text chat</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Voice messaging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Live video feed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Photo & video sharing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Screen sharing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Remote desktop control</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <ChatInterface 
              onScreenShare={handleScreenShare}
              onRemoteControl={handleRemoteControl}
              isAgentConnected={!!connectedAgent}
            />
          </div>
        </div>
      </div>

      {/* Screen Share Modal */}
      <ScreenShare 
        isVisible={showScreenShare}
        onClose={() => setShowScreenShare(false)}
      />

      {/* Remote Control Modal */}
      <RemoteControl 
        isVisible={showRemoteControl}
        onClose={() => setShowRemoteControl(false)}
      />
    </div>
  );
};

export default LiveSupport;
