
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Mic, MicOff, Camera, CameraOff, Image, Video, Monitor, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  type: 'text' | 'voice' | 'image' | 'video';
  sender: 'user' | 'agent' | 'bot';
  timestamp: Date;
  mediaUrl?: string;
}

interface ChatInterfaceProps {
  onScreenShare: () => void;
  onRemoteControl: () => void;
  isAgentConnected: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  onScreenShare, 
  onRemoteControl, 
  isAgentConnected 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      type: 'text',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (content: string, type: 'text' | 'voice' | 'image' | 'video' = 'text', mediaUrl?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      sender: 'user',
      timestamp: new Date(),
      mediaUrl
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: type === 'text' 
          ? `I received your message: "${content}". Let me help you with that.`
          : `I received your ${type}. Let me analyze it and get back to you.`,
        type: 'text',
        sender: isAgentConnected ? 'agent' : 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSendText = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  const toggleVoiceRecording = async () => {
    if (!isRecording) {
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(audioStream);
        const chunks: BlobPart[] = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(blob);
          sendMessage('Voice message', 'voice', audioUrl);
          audioStream.getTracks().forEach(track => track.stop());
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
        toast({ title: "Recording started", description: "Speak now..." });
      } catch (error) {
        toast({ title: "Error", description: "Could not access microphone", variant: "destructive" });
      }
    } else {
      mediaRecorder?.stop();
      setIsRecording(false);
      setMediaRecorder(null);
      toast({ title: "Recording stopped", description: "Processing your voice message..." });
    }
  };

  const toggleCamera = async () => {
    if (!isCameraOn) {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(videoStream);
        setIsCameraOn(true);
        if (videoRef.current) {
          videoRef.current.srcObject = videoStream;
        }
        toast({ title: "Camera activated", description: "Live video feed started" });
      } catch (error) {
        toast({ title: "Error", description: "Could not access camera", variant: "destructive" });
      }
    } else {
      stream?.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraOn(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      toast({ title: "Camera deactivated", description: "Video feed stopped" });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && isCameraOn) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const imageUrl = URL.createObjectURL(blob);
            sendMessage('Photo captured', 'image', imageUrl);
          }
        });
      }
    } else {
      toast({ title: "No camera", description: "Please turn on camera first", variant: "destructive" });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      sendMessage(`${fileType === 'image' ? 'Image' : 'Video'} uploaded: ${file.name}`, fileType, fileUrl);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="font-medium">Live Support</span>
          <Badge variant={isAgentConnected ? "default" : "secondary"}>
            {isAgentConnected ? "Agent Connected" : "AI Bot"}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onScreenShare}>
            <Monitor className="h-4 w-4 mr-1" />
            Share Screen
          </Button>
          {isAgentConnected && (
            <Button variant="outline" size="sm" onClick={onRemoteControl}>
              <Settings className="h-4 w-4 mr-1" />
              Remote Control
            </Button>
          )}
        </div>
      </div>

      {/* Video Feed */}
      {isCameraOn && (
        <div className="p-4 border-b">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-32 bg-gray-900 rounded-lg object-cover"
          />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-xs ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
              <CardContent className="p-3">
                <div className="text-sm">
                  {message.type === 'text' && message.content}
                  {message.type === 'voice' && (
                    <div className="flex items-center space-x-2">
                      <Mic className="h-4 w-4" />
                      <span>Voice message</span>
                      {message.mediaUrl && (
                        <audio controls className="mt-2">
                          <source src={message.mediaUrl} type="audio/wav" />
                        </audio>
                      )}
                    </div>
                  )}
                  {message.type === 'image' && (
                    <div>
                      <p className="mb-2">{message.content}</p>
                      {message.mediaUrl && (
                        <img src={message.mediaUrl} alt="Uploaded" className="max-w-full rounded" />
                      )}
                    </div>
                  )}
                  {message.type === 'video' && (
                    <div>
                      <p className="mb-2">{message.content}</p>
                      {message.mediaUrl && (
                        <video controls className="max-w-full rounded">
                          <source src={message.mediaUrl} />
                        </video>
                      )}
                    </div>
                  )}
                </div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2 mb-2">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            onClick={toggleVoiceRecording}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button
            variant={isCameraOn ? "destructive" : "outline"}
            size="sm"
            onClick={toggleCamera}
          >
            {isCameraOn ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={capturePhoto}
            disabled={!isCameraOn}
          >
            <Image className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Video className="h-4 w-4" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
            className="flex-1"
          />
          <Button onClick={handleSendText}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
