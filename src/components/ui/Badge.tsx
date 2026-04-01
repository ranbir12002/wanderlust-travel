import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "white";
  className?: string;
}

export default function Badge({
  children,
  variant = "primary",
  className = "",
}: BadgeProps) {
  const baseStyles = "inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest";
  
  const variants = {
    primary: "bg-neutral-900 text-white",
    secondary: "bg-neutral-200 text-neutral-800",
    outline: "border border-neutral-300 text-neutral-600",
    white: "bg-white/20 backdrop-blur-md text-white border border-white/60",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
