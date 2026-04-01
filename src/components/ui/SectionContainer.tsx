import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function SectionContainer({
  children,
  className = "",
  as: Component = "div",
}: SectionContainerProps) {
  return (
    <Component
      className={`mx-auto w-full max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 ${className}`}
    >
      {children}
    </Component>
  );
}
