"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="w-full overflow-hidden py-16 bg-white border-t border-neutral-100">
      <div className="mx-auto max-w-4xl px-4 flex flex-col w-full">
        <header className="relative mb-8 pt-10">
          <div className="absolute -top-2 -left-4 md:-left-8 z-0 text-[4rem] sm:text-[5rem] md:text-[6rem] tracking-[0.1em] leading-none opacity-5 font-extrabold uppercase pointer-events-none select-none text-neutral-900">
            GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold relative z-10 lowercase mb-4 text-neutral-900">
            get in touch
          </h2>
          <p className="text-neutral-600 text-sm md:text-base max-w-2xl leading-relaxed relative z-10">
            Still not sure what to do? Please fill our short form & one of our team members will contact you back.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="sr-only" htmlFor="first-name">First Name</label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                required
                placeholder="First Name"
                className="w-full p-4 rounded-xl border-none bg-neutral-100 focus:bg-white focus:ring-2 focus:ring-neutral-200 transition-all placeholder:text-neutral-500"
              />
            </div>
            
            <div>
              <label className="sr-only" htmlFor="last-name">Last Name</label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                required
                placeholder="Last Name"
                className="w-full p-4 rounded-xl border-none bg-neutral-100 focus:bg-white focus:ring-2 focus:ring-neutral-200 transition-all placeholder:text-neutral-500"
              />
            </div>
            
            <div>
              <label className="sr-only" htmlFor="contact-no">Contact No.</label>
              <input
                id="contact-no"
                name="contact-no"
                type="tel"
                required
                placeholder="Contact No."
                className="w-full p-4 rounded-xl border-none bg-neutral-100 focus:bg-white focus:ring-2 focus:ring-neutral-200 transition-all placeholder:text-neutral-500"
              />
            </div>
            
            <div>
              <label className="sr-only" htmlFor="email-id">Email Id</label>
              <input
                id="email-id"
                name="email-id"
                type="email"
                required
                placeholder="Email Id"
                className="w-full p-4 rounded-xl border-none bg-neutral-100 focus:bg-white focus:ring-2 focus:ring-neutral-200 transition-all placeholder:text-neutral-500"
              />
            </div>
          </div>

          <div>
            <label className="sr-only" htmlFor="query">Query</label>
            <textarea
              id="query"
              name="query"
              required
              placeholder="Please write your query here..."
              rows={5}
              className="w-full p-4 rounded-xl border-none bg-neutral-100 focus:bg-white focus:ring-2 focus:ring-neutral-200 transition-all resize-none placeholder:text-neutral-500"
            />
          </div>

          <div className="pt-2 flex flex-col md:flex-row items-center gap-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full md:w-auto inline-block px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-neutral-800 disabled:opacity-50 transition-colors"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
            
            {status === "success" && (
              <span className="text-green-600 font-medium text-sm">Message sent successfully! We will get back to you soon.</span>
            )}
            {status === "error" && (
              <span className="text-red-600 font-medium text-sm">Failed to send message. Please try again.</span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
