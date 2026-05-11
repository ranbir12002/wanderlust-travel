import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "blur" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "font-headline font-bold uppercase tracking-widest rounded-sm transition-all duration-300 inline-flex items-center justify-center text-center disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--color-ocean-blue)] text-white hover:brightness-110 shadow-sm hover:shadow-md",
    secondary: "bg-[var(--color-sky-blue)] text-white hover:brightness-110 hover:translate-y-[-2px] hover:shadow-lg",
    outline: "border border-white/30 text-white hover:bg-white/20",
    blur: "bg-surface-container-highest/20 backdrop-blur-md text-white hover:bg-white/20",
    ghost: "bg-transparent text-[var(--color-ocean-blue)] hover:bg-[var(--color-ocean-blue)]/10",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-xs sm:text-sm",
    lg: "px-8 py-4 text-xs sm:text-sm",
    xl: "px-10 py-5 text-sm sm:text-base tracking-[0.15em] sm:tracking-[0.2em]",
  };

  return (
    <button
      className={
        `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : "w-auto"} ${className || ""}`
      }
      {...props}
    >
      {children}
    </button>
  );
}
