import { Star } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const REVIEWS = [
    {
      id: 1,
      name: "JOHN DOE",
      age: "25",
      role: "Story Teller",
      trip: "Tawang",
      text: "Lorem Ipsum Lorem Ipsum",
      image: "https://picsum.photos/seed/user1/400/400"
    },
    {
      id: 2,
      name: "JOHN DOE",
      age: "25",
      role: "Story Teller",
      trip: "Tawang",
      text: "Lorem Ipsum Lorem Ipsum",
      image: "https://picsum.photos/seed/user2/400/400"
    },
    {
      id: 3,
      name: "JOHN DOE",
      age: "25",
      role: "Story Teller",
      trip: "Spiti Valley",
      text: "The great cold dessert",
      image: "https://picsum.photos/seed/user3/400/400"
    }
  ];

  return (
    <section className="w-full overflow-hidden py-16 bg-white border-t border-neutral-100">
      <div className="mx-auto max-w-7xl px-4 flex flex-col w-full">
        <header className="relative mb-8 pt-10">
          <div className="absolute -top-2 -left-4 md:-left-8 z-0 text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] tracking-[0.1em] leading-none opacity-5 font-extrabold uppercase pointer-events-none select-none text-neutral-900">
            TESTIMONIALS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold relative z-10 lowercase mb-4 text-neutral-900">
            testimonials
          </h2>
          <p className="text-neutral-600 text-sm md:text-base max-w-2xl leading-relaxed relative z-10">
            Hear from our travelers. Read about their experiences and stories.
          </p>
        </header>
      </div>
      
      <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <div key={review.id} className="relative h-48 overflow-hidden rounded-[2rem] bg-black text-white shadow-lg">
            <Image
              src={review.image}
              alt={review.name}
              fill
              className="object-cover opacity-40 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
            
            <div className="relative z-10 flex h-full flex-col justify-end p-6">
              <div className="mb-2 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-white text-white" />
                ))}
              </div>
              
              <div className="mb-1 text-sm text-white">
                <span className="font-bold uppercase drop-shadow-md">{review.name},</span>
                <span className="ml-1 text-xs text-neutral-300 drop-shadow-md">
                  {review.age} yrs old, {review.role}
                </span>
              </div>
              
              <p className="line-clamp-2 text-xs font-medium italic text-neutral-300 drop-shadow-md">
                {review.trip} - {review.text}
              </p>

              {review.id === 3 && (
                <button className="absolute bottom-4 right-4 flex items-center text-[10px] font-bold uppercase tracking-wider text-neutral-400 transition-colors hover:text-white">
                  ALL REVIEWS &gt;
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
