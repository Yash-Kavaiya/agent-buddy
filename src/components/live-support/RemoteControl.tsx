
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Settings, Shield, Eye, Mouse, Keyboard, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RemoteControlProps {
  isVisible: boolean;
  onClose: () => void;
}

const RemoteControl: React.FC<RemoteControlProps> = ({ isVisible, onClose }) => {
  const [isControlActive, setIsControlActive] = useState(false);
  const [permissions, setPermissions] = useState({
    mouse: false,
    keyboard: false,
    screen: false
  });
  const { toast } = useToast();

  const requestPermission = (type: 'mouse' | 'keyboard' | 'screen') => {
    setPermissions(prev => ({ ...prev, [type]: !prev[type] }));
    toast({
      title: `${type} permission ${permissions[type] ? 'revoked' : 'granted'}`,
      description: `Agent can ${permissions[type] ? 'no longer' : 'now'} control your ${type}`
    });
  };

  const startRemoteControl = () => {
    if (!permissions.mouse && !permissions.keyboard && !permissions.screen) {
      toast({
        title: "No permissions granted",
        description: "Please grant at least one permission to start remote control",
        variant: "destructive"
      });
      return;
    }
    
    setIsControlActive(true);
    toast({
      title: "Remote control started",
      description: "Support agent can now control your device"
    });
  };

  const stopRemoteControl = () => {
    setIsControlActive(false);
    setPermissions({ mouse: false, keyboard: false, screen: false });
    toast({
      title: "Remote control stopped",
      description: "All remote access has been revoked"
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Remote Control Access</span>
          </CardTitle>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Remote control allows the support agent to interact with your device.
                You can revoke permissions at any time.
              </AlertDescription>
            </Alert>

            {!isControlActive ? (
              <div className="space-y-4">
                <h3 className="font-medium">Grant Permissions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Eye className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Screen Access</p>
                        <p className="text-sm text-gray-600">View your screen</p>
                      </div>
                    </div>
                    <Button
                      variant={permissions.screen ? "default" : "outline"}
                      size="sm"
                      onClick={() => requestPermission('screen')}
                    >
                      {permissions.screen ? "Granted" : "Grant"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mouse className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Mouse Control</p>
                        <p className="text-sm text-gray-600">Control mouse movements and clicks</p>
                      </div>
                    </div>
                    <Button
                      variant={permissions.mouse ? "default" : "outline"}
                      size="sm"
                      onClick={() => requestPermission('mouse')}
                    >
                      {permissions.mouse ? "Granted" : "Grant"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Keyboard className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium">Keyboard Control</p>
                        <p className="text-sm text-gray-600">Type and use keyboard shortcuts</p>
                      </div>
                    </div>
                    <Button
                      variant={permissions.keyboard ? "default" : "outline"}
                      size="sm"
                      onClick={() => requestPermission('keyboard')}
                    >
                      {permissions.keyboard ? "Granted" : "Grant"}
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={startRemoteControl}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Start Remote Control Session
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 text-red-700">
                    <Settings className="h-5 w-5 animate-spin" />
                    <span className="font-medium">Remote Control Active</span>
                  </div>
                  <p className="text-sm text-red-600 mt-2">
                    Support agent has control of your device
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {permissions.screen && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">Screen Access</span>}
                  {permissions.mouse && <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">Mouse Control</span>}
                  {permissions.keyboard && <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">Keyboard Control</span>}
                </div>
                
                <Button 
                  variant="destructive" 
                  onClick={stopRemoteControl}
                  className="w-full"
                >
                  Stop Remote Control
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RemoteControl;
