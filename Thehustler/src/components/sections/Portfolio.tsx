import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";

const items = [
  { img: p1, label: "Street Drop", tag: "Lookbook" },
  { img: p2, label: "College Crew", tag: "Signature Day" },
  { img: p3, label: "Embroidered", tag: "Detail" },
  { img: p4, label: "Event Kit", tag: "Concert" },
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="relative py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-block glass rounded-full px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
              Portfolio
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gradient leading-tight">
              Worn by the<br />ones who hustle.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <div
              key={i}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-border cursor-pointer"
            >
              <img
                src={it.img}
                alt={it.label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90" />
              <div className="absolute inset-0 ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/40 group-hover:shadow-glow transition-all duration-500 rounded-3xl" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-xs uppercase tracking-widest text-primary mb-1">{it.tag}</div>
                <div className="font-display font-bold text-lg">{it.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
