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
      title: "Vaccination Schedule",
      description: "Get information about essential vaccines for children and adults",
      icon: Calendar,
      variant: "primary" as const,
    },
    {
      title: "Common Diseases",
      description: "Learn about symptoms and treatments for fever, cough, stomach pain and more",
      icon: Heart,
      variant: "secondary" as const,
    },
    {
      title: "Prevention Tips",
      description: "Daily suggestions for staying healthy and preventing diseases",
      icon: Shield,
      variant: "default" as const,
    },
    {
      title: "Emergency Help",
      description: "Recognize serious symptoms and know what to do immediately",
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
            Health Assistant
          </h1>
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            AI-powered healthcare for rural and semi-urban areas
          </p>
          <Button 
            variant="health" 
            size="lg" 
            onClick={() => setShowChat(true)}
            className="mb-6"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Chat
          </Button>
        </div>

        {/* Language Support */}
        <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-border animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Language Support</h2>
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
            Quick Help
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button variant="outline" size="lg" className="h-auto py-4 flex-col">
              <Phone className="w-6 h-6 mb-2 text-primary" />
              <span className="text-sm">Emergency Numbers</span>
              <span className="text-xs text-muted-foreground">108 / 102</span>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-4 flex-col">
              <Heart className="w-6 h-6 mb-2 text-health-good" />
              <span className="text-sm">Health Check</span>
              <span className="text-xs text-muted-foreground">Symptom Checker</span>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-4 flex-col">
              <Calendar className="w-6 h-6 mb-2 text-accent" />
              <span className="text-sm">Nearest Center</span>
              <span className="text-xs text-muted-foreground">Health Services</span>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 py-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            This information is for educational purposes only. For serious health issues, please consult a doctor.
          </p>
        </div>
      </div>
    </div>
  );
};