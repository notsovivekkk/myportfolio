import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
}

export default function BentoCard({ children, className = "" }: BentoCardProps) {
  return (
    <div className={`bento-card ${className}`}>
      {children}
    </div>
  );
}
