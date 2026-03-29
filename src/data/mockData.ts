import { Leaf, PenTool, Scissors, Droplet } from "lucide-react";
import React from "react";

export const siteData = {
  header: {
    logo: "Wanderlust",
    navLinks: [
      { label: "HOME", href: "/" },
      { label: "TRIPS", href: "/trips" },
      { label: "BLOGS", href: "/blogs" },
      { label: "CONTACT", href: "/#contact" },
    ]
  },
  hero: {
    title: "DREAM \nGARDEN",
    description: "A decade of passion for creating breathtaking outdoor living spaces. We blend architectural precision with organic beauty to transform your environment.",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHha1j5QPBgUI-45_H45Mixlkn8NkDJ4l_C9s6DKA3ELWlx4eBgML8J9mI6TR_nrpyM7AfQhRbhv7pn4agweoKZ6tcB8KUdPTDMofHSL1tjz3xP2FyOg1EjjV86LH3AvUgTO6suh85Pt5LD55f3UCfqzVlZ8WVlvZxfcs9zmquk9qkH6bqecSwH0mWQSBosuSgLKIZqyVSWmGnLUzR4MwTSTJ4BQ-QQ8mNDTMyif6_5JhtpJiT_k109TKbe9jDR90t4dgk3Hz28sdz",
    nextProject: {
      name: "Hachioji Garden",
      location: "Tokyo, Japan — Zen Minimalism",
      current: "01",
      total: "04"
    }
  },
  values: {
    title: "WE ARE DIFFERENT \nIN EVERY WAYS",
    description: "Each project is a blank canvas. We don't just plant trees; we curate experiences that evolve with the seasons and integrate seamlessly with your architecture.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiN_c9vhRU47Hahhan6K7i37hzLqotQdk6nnjZNKE0kwe-IirBJbIgn6jzYQ2WYIuSxzT2QEHzfdeCPxFv3mTrkdsW50aGprI-eiph149sRK_trPg7mPC3sSqi4GdPXCOAkhcZN0qf6tPy4BmQxDxaOfz-f9sDsexCKJcoFvAbut6Xpb67r4QsnFBzIQwF8CqmGLDXlReWY8uYSk4sWLgwM8hggVn0tlxXw1e_GkqChmJqP9SQ5FBbDkEBOdEDI7dBJjKM2U2-CN-R",
    yearsExperience: "10+",
    yearsText: "Years of excellence in design",
    features: [
      {
        iconName: "Leaf",
        title: "Sustainability",
        desc: "Xeriscaping and native planting strategies for minimal maintenance.",
      },
      {
        iconName: "PenTool",
        title: "Design-Led",
        desc: "Our architects craft layouts that enhance the flow of your estate.",
      },
      {
        iconName: "Scissors",
        title: "Precision",
        desc: "Expert craftsmanship in every stone placement and shrub pruning.",
      },
      {
        iconName: "Droplet",
        title: "Hydro-Efficiency",
        desc: "Smart irrigation systems that conserve resources beautifully.",
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
  testimonial: {
    quote: "LeafLife took our sprawling, untamed backyard and turned it into a sophisticated oasis that feels like a natural extension of our home.",
    author: "Steve Evans",
    role: "CEO of Malibu Company"
  },
  portfolio: {
    title: "GET TO KNOW OUR \nLATEST GARDEN ",
    highlightText: "WORKS",
    works: [
      {
        title: "URBAN EDEN",
        loc: "SAN FRANCISCO, CA",
        desc: "An urban backyard transformed into a vibrant, green escape with blooming flowers and winding paths.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5s0TGJFgm3bnUIPC_MUhE6prburXPDmXIErOJfnBttRplqtS5vIWBZmuwTC13lGahklKZmrh-Et9a1lLS_oo_epuDlEK0lwRpFpxkaTag7jQLXSxmBeaNNpFHjYGIVQENgOq_Ovja0TcfqVpFSf9aj__feuQQVuNx44rlOOLHIwSXnBXFKCZW4NV2IVxQdQFDp_1IizLUm2QMPfEwhAVaXKmyOlKRntp6Mo-AT5CliDFjLfAh2xeYlJhDYhzVix0ENscmxyzLOgoO",
      },
      {
        title: "SERENE RETREAT",
        loc: "SUNNYVALE, CA",
        desc: "A peaceful garden designed for relaxation and meditation.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4PjgrCingmmdATnngBfMsrH9DbyjcV_fOIIWr-A6vIks2dJJEqaUXaqmmZ4vNv5YNR8gevAYSnOqWeF8yG51ftAMry9WH16QIpir0MkSd93pKarqJ-iudBGtaOgO-EKcgy1jzMcRsTd-NhyzVcTNB6Rnp4PwmOjMTFOFDtdHgP7UXwR5DG2Hfe-UvhfqqGDooGcxanqFppaGLsvwbYv31qxoQFjWobmkVkTdA2PPPTdnt2lj2ZluPpayHGMGOSiiiGKzciOuly-b8",
      },
      {
        title: "MODERN MANOR",
        loc: "SURREY, UK",
        desc: "A contemporary landscape blending sleek design with natural elements.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-VllUjZh2493QIvoAolP5paChzPI4RVXlyUOXWSHn0FmTURX2Vw7w8OJTK4LCjGI_zpHdHDFzjtQw3IaBx0AVc5NSM_F6ioqnsnh48Yv9T-eGG-2o-WgFfwK66hcW1zb5-xbjVu22fmY27ZXZeSYQmlkITV06QRL-MmXKH_ruHmZzI1XYX4j8AEr2cmh1NJj9WotF4HNR1AeVQt16ImvWvbssimr_hixAu6Mu4ScCw0RLu8R9KMHFR8HCUahoKlMmshgc8To-Yf6B",
      },
    ]
  },
  cta: {
    title: "READY TO TRANSFORM YOUR GARDEN?",
    buttonText: "CONTACT US",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiZgDdVfF1gQjKDWkZBlePIHU-H3qfvM5zFeN6yiuwftlu-BlsuU3uZFBNVTSFZOi8gsdrQOEFnVFPc4QpspR5Irborvr6gHszzstuagAABDL8Bi1D_imM_6NnL6jHq68bUBsq7G_xnrNWiPB9JaTRvbklEnxRY8vbe3vyopUt8gY66o56KM8dIBVLecxP5P94YfjbZ6jmRNAIsN0ndRzK7fvoFG-MElU6iQ5-aYW9YEb1mB4OMT4bIJO060Pj786tHn_N7mg-vTFU"
  },
  footer: {
    logo: "LeafLife",
    description: "Elevating architecture through organic landscape artistry. Boutique design for discerning estates.",
    newsletterTitle: "Newsletter",
    newsletterPlaceholder: "Email Address",
    columns: [
      {
        title: "SUPPORT",
        links: [
          { label: "Help Center", href: "/#contact" },
          { label: "Consultation", href: "/#contact" },
          { label: "FAQs", href: "/#contact" },
        ]
      },
      {
        title: "LINKS",
        links: [
          { label: "Home", href: "/" },
          { label: "Destinations", href: "/destinations" },
          { label: "Our Trips", href: "/trips" },
          { label: "Blogs", href: "/blogs" },
        ]
      },
      {
        title: "TRAVEL STYLES",
        links: [
          { label: "Group Tours", href: "/trips" },
          { label: "Solo Travel", href: "/trips" },
          { label: "Adventure", href: "/trips" },
          { label: "Heritage", href: "/trips" },
        ]
      }
    ],
    copyright: "© 2024 Wanderlust Travel. All rights reserved.",
    legalLinks: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ]
  }
};

export type SiteData = typeof siteData;
