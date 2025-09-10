import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HealthCard } from "./HealthCard";
import { HealthMascot } from "./HealthMascot";
import { ChatInterface } from "./ChatInterface";
import { 
  Shield, 
  Calendar, 
  Heart, 
  AlertTriangle, 
  MessageCircle,
  Globe,
  Phone,
  Users
} from "lucide-react";

export const Dashboard = () => {
  const [showChat, setShowChat] = useState(false);

  const healthTopics = [
    {
      title: "टीकाकरण अनुसूची",
      description: "बच्चों और वयस्कों के लिए आवश्यक टीकों की जानकारी प्राप्त करें",
      icon: Calendar,
      variant: "primary" as const,
    },
    {
      title: "सामान्य बीमारियाँ",
      description: "बुखार, खांसी, पेट दर्द जैसी समस्याओं के लक्षण और उपचार जानें",
      icon: Heart,
      variant: "secondary" as const,
    },
    {
      title: "रोकथाम के उपाय",
      description: "स्वस्थ रहने और बीमारियों से बचने के लिए दैनिक सुझाव",
      icon: Shield,
      variant: "default" as const,
    },
    {
      title: "आपातकालीन सहायता",
      description: "गंभीर लक्षणों की पहचान और तुरंत क्या करना चाहिए",
      icon: AlertTriangle,
      variant: "default" as const,
    },
  ];

  const languages = [
    "हिंदी", "English", "বাংলা", "தமிழ்", "తెలుగు", "ગુજરાતી", "ಕನ್ನಡ", "മലയാളം"
  ];

  if (showChat) {
    return <ChatInterface onClose={() => setShowChat(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-chat p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="flex justify-center mb-6">
            <HealthMascot size="lg" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            स्वास्थ्य सहायक
          </h1>
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            ग्रामीण और अर्ध-शहरी क्षेत्रों के लिए AI-संचालित स्वास्थ्य सेवा
          </p>
          <Button 
            variant="health" 
            size="lg" 
            onClick={() => setShowChat(true)}
            className="mb-6"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            चैट शुरू करें
          </Button>
        </div>

        {/* Language Support */}
        <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-border animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">भाषा सहायता</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Health Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {healthTopics.map((topic, index) => (
            <HealthCard
              key={index}
              title={topic.title}
              description={topic.description}
              icon={topic.icon}
              variant={topic.variant}
              onClick={() => setShowChat(true)}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-border animate-slide-up">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            त्वरित सहायता
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button variant="outline" size="lg" className="h-auto py-4 flex-col">
              <Phone className="w-6 h-6 mb-2 text-primary" />
              <span className="text-sm">आपातकालीन नंबर</span>
              <span className="text-xs text-muted-foreground">108 / 102</span>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-4 flex-col">
              <Heart className="w-6 h-6 mb-2 text-health-good" />
              <span className="text-sm">स्वास्थ्य जांच</span>
              <span className="text-xs text-muted-foreground">लक्षण चेकर</span>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-4 flex-col">
              <Calendar className="w-6 h-6 mb-2 text-accent" />
              <span className="text-sm">निकटतम केंद्र</span>
              <span className="text-xs text-muted-foreground">स्वास्थ्य सेवा</span>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 py-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है। गंभीर समस्याओं के लिए डॉक्टर से संपर्क करें।
          </p>
        </div>
      </div>
    </div>
  );
};