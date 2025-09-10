import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { HealthMascot } from "./HealthMascot";
import { Mic, MicOff, Send, Volume2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onClose?: () => void;
}

export const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Health Assistant. I can help you with vaccination schedules, disease information, and health advice. You can speak to me in Hindi, English, or your local language. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const generateBotResponse = (userText: string): string => {
    const responses = [
      "Based on your symptoms, I recommend consulting a healthcare professional. In the meantime, ensure adequate rest and hydration.",
      "For vaccination schedules, children should receive their first dose at birth. Would you like specific information about any particular vaccine?",
      "Common signs of fever include elevated body temperature, chills, and fatigue. Please monitor your temperature and seek medical care if it exceeds 101°F.",
      "Preventive healthcare includes regular hand washing, balanced nutrition, adequate sleep, and staying up-to-date with vaccinations.",
      "If you're experiencing persistent symptoms, it's important to visit your nearest healthcare center. Would you like help finding one?",
      "For digestive issues, try eating smaller meals, staying hydrated, and avoiding spicy foods. Contact a doctor if symptoms persist.",
      "Regular health check-ups are crucial for early detection. Adults should have annual check-ups, while children need more frequent monitoring.",
      "Emergency warning signs include difficulty breathing, chest pain, severe headache, or loss of consciousness. Seek immediate medical attention."
    ];
    
    // Simple keyword matching for more relevant responses
    const lowerText = userText.toLowerCase();
    if (lowerText.includes('fever') || lowerText.includes('temperature')) {
      return responses[2];
    } else if (lowerText.includes('vaccine') || lowerText.includes('vaccination')) {
      return responses[1];
    } else if (lowerText.includes('stomach') || lowerText.includes('digestion')) {
      return responses[5];
    } else if (lowerText.includes('emergency') || lowerText.includes('urgent')) {
      return responses[7];
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Generate contextual bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);

    setInputText("");
  };

  const toggleListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      if (!isListening) {
        recognition.lang = 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
        };
        
        recognition.start();
      } else {
        recognition.stop && recognition.stop();
        setIsListening(false);
      }
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-[80vh] bg-gradient-chat">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 bg-background border-b border-border">
        <HealthMascot size="sm" />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-foreground">Health Assistant</h2>
          <p className="text-sm text-muted-foreground">Your Trusted Health Companion</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            ×
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            {!message.isUser && <HealthMascot size="sm" animate={false} />}
            
            <Card className={`max-w-[80%] ${
              message.isUser 
                ? "bg-chat-user text-chat-user-foreground" 
                : "bg-chat-bot text-chat-bot-foreground border-border"
            }`}>
              <CardContent className="p-4">
                <p className="text-sm leading-relaxed">{message.text}</p>
                {!message.isUser && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="mt-2 h-6 w-6"
                    onClick={() => speakMessage(message.text)}
                  >
                    <Volume2 className="w-3 h-3" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-background border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your question here or press the microphone..."
            className="flex-1"
          />
          <Button
            variant={isListening ? "emergency" : "voice"}
            size="icon"
            onClick={toggleListening}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>
          <Button variant="chat" size="icon" onClick={sendMessage}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Speak in Hindi, English, or your local language
        </p>
      </div>
    </div>
  );
};