interface SectionHeadingProps {
  title: string;
}

export default function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div className="relative mb-6 flex h-16 w-full items-center justify-center overflow-hidden md:h-24">
      {/* Background Text */}
      <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[3.5rem] font-black tracking-tighter text-neutral-100/70 md:text-[6rem]">
        {title.toUpperCase()}
      </div>
      
      {/* Foreground Text */}
      <h2 className="text-2xl sm:text-3xl font-black lowercase tracking-tight text-neutral-900">
        {title.toLowerCase()}
      </h2>
    </div>
  );
}
