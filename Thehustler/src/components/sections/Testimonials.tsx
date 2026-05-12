const reviews = [
  { name: "@karthik.reddyy", role: "Customer · Hyderabad", quote: "Best custom tees in Hyderabad hands down. Fabric feels premium and the print is crisp. Repeat customer for sure." },
  { name: "@meghana.designs", role: "Signature Day · Osmania", quote: "Our entire batch ordered signature day shirts from The Hustler. On time, perfect fit, everyone loved them." },
  { name: "@arjun.fitness", role: "Corporate Order", quote: "Got branded tees for my gym staff. The team was super responsive on WhatsApp and delivered ahead of schedule." },
  { name: "@thecollege_fest", role: "Event Merch", quote: "Ordered 400+ event tees on a tight deadline. The Hustler pulled through with zero compromise on quality." },
];

export const Testimonials = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <div className="inline-block glass rounded-full px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
            From Instagram
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gradient">
            Real love from <br />@thehustler.merchandise
          </h2>
          <a
            href="https://www.instagram.com/thehustler.merchandise/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-primary font-semibold hover:underline"
          >
            Follow us on Instagram →
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-gradient-card border border-border rounded-3xl p-8 hover:border-primary/30 transition-all"
            >
              <div className="text-primary text-4xl font-display font-black mb-4 leading-none">"</div>
              <p className="text-foreground/90 text-lg leading-relaxed mb-6">{r.quote}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
