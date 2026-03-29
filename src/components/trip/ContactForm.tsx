

export default function ContactForm() {
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

        <form action="#" className="space-y-4 w-full" method="POST">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="sr-only" htmlFor="first-name">First Name</label>
              <input
                id="first-name"
                name="first-name"
                type="text"
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
              placeholder="Please write your query here..."
              rows={5}
              className="w-full p-4 rounded-xl border-none bg-neutral-100 focus:bg-white focus:ring-2 focus:ring-neutral-200 transition-all resize-none placeholder:text-neutral-500"
            />
          </div>

          <div className="pt-2 text-center md:text-left">
            <button
              type="submit"
              className="inline-block px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-neutral-800 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
