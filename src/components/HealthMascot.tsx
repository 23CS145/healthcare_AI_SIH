import mascotImage from "@/assets/health-mascot.png";

interface HealthMascotProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
}

export const HealthMascot = ({ size = "md", className = "", animate = true }: HealthMascotProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  return (
    <div className={`${sizeClasses[size]} ${animate ? "animate-float" : ""} ${className}`}>
      <img
        src={mascotImage}
        alt="स्वास्थ्य सहायक - आपका विश्वसनीय स्वास्थ्य मित्र"
        className="w-full h-full object-contain"
      />
    </div>
  );
};