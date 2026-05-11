import { Leaf, PenTool, Scissors, Droplet } from "lucide-react";
import React from "react";

export const siteData = {
  header: {
    logo: "Beaches to Mountains",
    navLinks: [
      { label: "Domestic Trips", href: "/trips/domestic" },
      { label: "International Trips", href: "/trips/international" },
      { label: "Blogs", href: "/blogs" },
      { label: "About Us", href: "/about" },
    ]
  },
  hero: {
    title: "BEACHES TO \nMOUNTAINS",
    description: "A modern travel brand representing the journey from serene beaches to adventurous mountains. We combine exploration, freedom, and premium curated experiences.",
    bgImage: "/hero banner/1.jpg",
    nextProject: {
      name: "Serene Maldives",
      location: "Indian Ocean — Coastal Luxury",
      current: "01",
      total: "04"
    }
  },
  values: {
    title: "UNFORGETTABLE \nEXPERIENCES",
    description: "Every journey is a unique story. We don't just book trips; we curate moments that stay with you forever, from hidden coastal gems to majestic mountain peaks.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
    yearsExperience: "10+",
    yearsText: "Years of crafting memories",
    features: [
      {
        iconName: "MapPin",
        title: "Curated Locales",
        desc: "Handpicked destinations that offer both serenity and adventure.",
      },
      {
        iconName: "Compass",
        title: "Expert Guides",
        desc: "Local experts who bring the soul of every destination to life.",
      },
      {
        iconName: "Camera",
        title: "Unique Moments",
        desc: "Tailored activities designed for the modern explorer.",
      },
      {
        iconName: "Sun",
        title: "All Seasons",
        desc: "Breathtaking experiences available throughout the entire year.",
      },
    ]
  },
  process: {
    title: "SIMPLE STEPS FOR OUR\nLANDSCAPE WORK",
    steps: [
      {
        num: "01",
        title: "Design consultation",
        desc: "In the initial step, we sit down with you to have a detailed discussion about your gardening vision and preferences.",
      },
      {
        num: "02",
        title: "Design & planning",
        desc: "Our team of experts meticulously crafts a custom garden design that aligns with your desires and your space characteristics.",
      },
      {
        num: "03",
        title: "Implement construction",
        desc: "We present the design to you for review. Once approved, we move forward to implement the plan with construction.",
      },
      {
        num: "04",
        title: "Garden decorating",
        desc: "With your design finalized, we put on our gardening gloves and work, creating your garden to be as beautiful as envisioned.",
      },
    ]
  },
  services: [
    {
      title: "HOME\nGARDEN",
      desc: "Crafting the perfect garden space for your home.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKhPAXZZLrkvTphZ-NIgq3mf0QZNTL4AvTOS6D5-hw4U7PX7ai_E3Z9-R5zf69n7Zsd8j0QsPHvrQ5MV_OpvxpnaLTACXA2n6al1QiTPUcZpnFbs7OUv7abYkefobRkEUydo-Tu5lgrA8r_UQ32_gsnib7RdL9MoqXghOdhGdfqiQcAoxSKr9ZyALPXv6dXg_MRTieu1KM-Yu960dhOBOyZq4j4C7T_Oul3cYrvFpsnKoM_mN96cGYEmLhCeyxnmxCaTr8LYiw0MDG",
    },
    {
      title: "PLANT\nSELECTION",
      desc: "Selecting the best flora for your climate and soil.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuruMKbifObRzJPBBFnBNgbo_3QmF0PzM6NoxVUdc0yno5kz66bNOGZxtYRD4snjiODVITHyw2ZOxJxACDdUouJItBJ3z8dCDV3yTETOXnGKYcbon21W6x8ldtV3stk5QEzy82LDiyC1-5f2mtFuRuN_gnJ3qjOLNC7HO3gzC-5_ow4AvOoBQlVdKzr-JewwA9K_e9DuFAtVgsIPFQixDdVSdycb9HMOpczmBPCRlDYp3z5BG7tQ839Mp1Q9Ez2x3e29FcU-evFeyB",
    },
    {
      title: "HARD\nSCAPING",
      desc: "Building structured elements like patios and pathways.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2rrsEan0CG3J-7nXWXqrThTwEkJoqgpeI7ekQh8grXQcBF2q56bE7Lwu3xHs8QjgGcf9STaWiBJNEErDaDG2jf_JxcdU-pdVlsCQq3GUPFf3Sf4WFGfPPXNO7SR4fKWtUPUPo47IcaeFHA2Et79zStJ78aL4PxvI_QS2BvSpROzv6rE5xizcnjeVB2Io6Y0hYAUCFc2cPCj3ChAaAr0AoB2F1WAsvQQ75uUOib1Ry50GG8jLZZQbWRfVs59b8ySl-QvPw2MLM7HX6",
    },
    {
      title: "PUBLIC\nGARDEN",
      desc: "Whether indoor or outdoor, we got it all ready for your greenery needs.",
      tags: ["Home", "Garden", "Landscape Design", "Expert"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnoLERA8Dc5dVAK8yNMmcLpOL9yMmphrIk4xTD7gA-ueD1cyPiTKsSDMuUyuL2X5_U3v3rT3VqMelEpBbXHWUiO3-zmhyQ7rN5ls8htjLJ0cuzqJZ0M4TXNDfAxfmbGKPWmjzlXRzI-eUQCLXi9ZXQNtDatdhTMGopF33F0ujKHLZLx9hVMpWwD4c3_p6xCR5BrCDokoZEDmCfvz3hCxO34dCe8PWmryq1cXkMCIPznvczz4pp35ROmkPVBYQTzDvjGDKsi3Xkyf22",
    },
  ],
  testimonials: [
    {
      quote: "Beaches to Mountains crafted the perfect itinerary for our anniversary. The attention to detail and curated experiences were unmatched.",
      author: "Sarah Jenkins",
      platform: "Google",
      rating: 5
    },
    {
      quote: "Absolutely breathtaking views and stellar organization. It felt like an exclusive, private expedition tailored just for us.",
      author: "Michael T.",
      platform: "Instagram",
      rating: 5
    },
    {
      quote: "The best travel agency for bespoke trips. From the moment we landed, everything was handled with pure professionalism.",
      author: "Elena R.",
      platform: "Google",
      rating: 5
    },
    {
      quote: "Our group tour through the Alps was unforgettable. Expert guides, premium stays, and seamless logistics.",
      author: "David L.",
      platform: "Instagram",
      rating: 5
    },
    {
      quote: "It was a great trip to Kerala. It was my first trip with friends, and I enjoyed a lot, all thanks to Beaches2Mountains. I got to experience mountains, beaches, beautiful sceneries, and most wonderful of all the boathouses. Accommodation, services, and food were well taken care of by Beaches2Mountains. Special thanks to Dhanush Anna for making our trip beautiful and successful. Looking forward to more trips with Beaches2Mountains.",
      author: "KEERTHANA REDDY INTURI",
      platform: "Google",
      rating: 5
    },
    {
      quote: "As the first foreigner B2M ever hosted, it was an amazing experience. Harnath made sure to make my stay as enjoyable and safe as possible for me as a solo female traveler for the first time in India and made the arrangements on short notice. The group was very friendly and Kerala was magnificent. Would definitely recommend.",
      author: "HEND RABIE",
      platform: "Google",
      rating: 5
    },
    {
      quote: "I am a solo traveler, chose this group with few doubts but trust me it broke all the reluctance I had. I met many new people who are so sweet and fun to be with. They even made the trip the best. The itinerary was good. You can enjoy all the days without any second thought. You can enjoy the water activities there, rain DJ dance, and my favorite part of the trip. Special mention to Harnath, our trip organizer who was very fun and sweet and made the trip the best.",
      author: "DEEPIKA",
      platform: "Google",
      rating: 5
    }
  ],
  social: {
    title: "Follow Our Journey",
    description: "Join our community of explorers. Discover inspiration for your next breathtaking expedition.",
    instagramUrl: "https://www.instagram.com/beaches2mountains_?igsh=NHhoOXAzbHNxb2I4",
    youtubeUrl: "https://youtube.com/@beaches2mountainss?si=BreNQUa_N-VPK7zK",
    twitterUrl: "https://x.com/b2m39?s=21",
    linkedinUrl: "https://www.linkedin.com/company/beaches2mountains/",
    googleUrl: "#",
    feedImages: [
      "https://images.unsplash.com/photo-1527631746610-bca00c0f4f72?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
    ]
  },
  portfolio: {
    title: "EXPLORE OUR \nRECENT ",
    highlightText: "EXPEDITIONS",
    works: [
      {
        title: "ALPINE ESCAPE",
        loc: "SWITZERLAND",
        desc: "A breathtaking journey through the Swiss Alps, staying in premium mountain lodges.",
        img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
      },
      {
        title: "COASTAL BLISS",
        loc: "MALDIVES",
        desc: "Crystal clear waters and white sandy beaches in the heart of the Indian Ocean.",
        img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800",
      },
      {
        title: "CULTURAL ODYSSEY",
        loc: "KYOTO, JAPAN",
        desc: "Discovering the ancient traditions and serene temples of Japan's cultural heart.",
        img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
      },
    ]
  },
  cta: {
    title: "READY TO START YOUR NEXT ADVENTURE?",
    buttonText: "BOOK NOW",
    bgImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200"
  },
  footer: {
    logo: "Beaches to Mountains",
    description: "Elevating travel through curated, bespoke itineraries. Discover the world with unparalleled sophistication and rhythm.",
    bottomLinks: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cancellation Policy", href: "/cancellation" }
    ],
    quickLinks: [
      { label: "International Trips", href: "/trips/international" },
      { label: "Group Tours", href: "/trips/group" },
      { label: "Customised Trips", href: "/customised" },
      { label: "Blogs", href: "/blogs" },
      { label: "Payments", href: "/payments" },
      { label: "About Us", href: "/about" }
    ],
    contactInfo: {
      phone: "+1 (555) 123-4567",
      email: "hello@beachestomountains.com",
      office: "123 Explorer's Ave, Suite 400\nSan Francisco, CA 94107"
    },
    copyright: "© 2026 Beaches to Mountains. All rights reserved.",
  }
};

export type SiteData = typeof siteData;
