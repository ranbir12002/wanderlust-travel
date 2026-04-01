import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  variant?: "hero" | "section" | "card" | "accent";
  className?: string;
  light?: boolean;
}

export function Heading({
  children,
  as: Component = "h2" as any,
  variant = "section",
  className = "",
  light = false,
}: HeadingProps) {
  const variants = {
    hero: "font-headline font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tighter",
    section: "font-headline font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight",
    card: "font-headline font-bold text-base sm:text-lg md:text-xl",
    accent: "font-serif text-lg sm:text-xl md:text-2xl tracking-wide lowercase",
  };

  const baseColor = light ? "text-white" : "text-primary";

  return (
    <Component
      className={`${baseColor} ${variants[variant]} whitespace-pre-line ${className}`}
    >
      {children}
    </Component>
  );
}

interface SubheadingProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
  light?: boolean;
}

export function Subheading({
  children,
  className = "",
  accent = false,
  light = false,
}: SubheadingProps) {
  let colorClass = accent ? "text-secondary" : "text-on-primary-container";
  if (light) colorClass = "text-white/80";
  return (
    <span
      className={`${colorClass} font-headline font-bold tracking-[0.3em] uppercase text-xs sm:text-sm block ${className}`}
    >
      {children}
    </span>
  );
}

interface TextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "body" | "small" | "caption";
  light?: boolean;
}

export function Text({
  children,
  className = "",
  variant = "body",
  light = false,
}: TextProps) {
  const variants = {
    body: "text-sm sm:text-base md:text-lg xl:text-xl font-body leading-relaxed",
    small: "text-xs sm:text-sm font-body leading-relaxed",
    caption: "text-[10px] sm:text-xs font-body uppercase tracking-wider",
  };

  const baseColor = light ? "text-on-primary-container" : "text-on-surface-variant";

  return (
    <p className={`${baseColor} ${variants[variant]} ${className}`}>
      {children}
    </p>
  );
}
