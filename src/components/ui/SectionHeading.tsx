interface SectionHeadingProps {
  title: string;
}

export default function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div className="relative mb-12 flex h-32 w-full items-center justify-center overflow-hidden md:h-48">
      {/* Background Text */}
      <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[6rem] font-black tracking-tighter text-neutral-100 md:text-[12rem]">
        {title.toUpperCase()}
      </div>
      
      {/* Foreground Text */}
      <h2 className="text-3xl font-bold lowercase text-neutral-900">
        {title.toLowerCase()}
      </h2>
    </div>
  );
}
