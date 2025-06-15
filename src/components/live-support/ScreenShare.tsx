
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Square, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScreenShareProps {
  isVisible: boolean;
  onClose: () => void;
}

const ScreenShare: React.FC<ScreenShareProps> = ({ isVisible, onClose }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      
      setStream(screenStream);
      setIsSharing(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
      }

      // Handle when user stops sharing via browser controls
      screenStream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };

      toast({
        title: "Screen sharing started",
        description: "Your screen is now being shared with the support agent"
      });
    } catch (error) {
      toast({
        title: "Screen sharing failed",
        description: "Could not start screen sharing. Please try again.",
        variant: "destructive"
      });
    }
  };

  const stopScreenShare = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsSharing(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    toast({
      title: "Screen sharing stopped",
      description: "Screen sharing has been disconnected"
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Monitor className="h-5 w-5" />
            <span>Screen Sharing</span>
          </CardTitle>
          <Button variant="outline" onClick={onClose}>
            <Square className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!isSharing ? (
              <div className="text-center py-8">
                <Monitor className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">Share Your Screen</h3>
                <p className="text-gray-600 mb-4">
                  Allow the support agent to see your screen to better assist you
                </p>
                <Button onClick={startScreenShare} className="bg-blue-600 hover:bg-blue-700">
                  <Play className="h-4 w-4 mr-2" />
                  Start Screen Sharing
                </Button>
              </div>
            ) : (
              <div>
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-64 bg-gray-800 rounded object-contain"
                  />
                </div>
                <div className="flex justify-center space-x-4">
                  <Button variant="destructive" onClick={stopScreenShare}>
                    <Pause className="h-4 w-4 mr-2" />
                    Stop Sharing
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScreenShare;
