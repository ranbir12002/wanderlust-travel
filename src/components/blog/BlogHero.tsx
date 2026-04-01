import Image from "next/image";

interface BlogHeroProps {
  title: string;
  category: string;
  date: string;
  author: string;
  heroImage: string;
  videoUrl?: string;
}

export default function BlogHero({ title, category, date, author, heroImage, videoUrl }: BlogHeroProps) {
  return (
    <div className="relative flex min-h-[70vh] w-full flex-col justify-end overflow-hidden pb-16 pt-32">
      {/* Background Media */}
      {videoUrl ? (
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

      {/* Typography */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center">
        <span className="mb-6 inline-block rounded-full bg-white/20 px-6 py-2 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md">
          {category}
        </span>
        <h1 className="mb-6 text-4xl font-black leading-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl">
          {title}
        </h1>
        
        <div className="flex items-center justify-center gap-4 text-sm font-semibold text-neutral-300 md:text-base">
          <span className="italic">By {author}</span>
          <span className="h-1 w-1 rounded-full bg-neutral-400" />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
