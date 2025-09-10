import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface HealthCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: "default" | "primary" | "secondary";
  className?: string;
  style?: React.CSSProperties;
}

export const HealthCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  variant = "default",
  className = "",
  style = {}
}: HealthCardProps) => {
  const variantClasses = {
    default: "hover:bg-gradient-card border-border",
    primary: "bg-primary-light border-primary hover:bg-primary-light/80",
    secondary: "bg-accent-light border-accent hover:bg-accent-light/80",
  };

  return (
    <Card 
      className={`
        cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 
        animate-slide-up ${variantClasses[variant]} ${className}
      `}
      style={style}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="p-4 rounded-full bg-background shadow-md">
            <Icon className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};