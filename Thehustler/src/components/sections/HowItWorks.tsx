import { MousePointerClick, Upload, Receipt, Truck } from "lucide-react";

const steps = [
  { icon: MousePointerClick, title: "Choose Product", desc: "Tees, hoodies, polos, caps — pick your canvas." },
  { icon: Upload, title: "Upload Design", desc: "Drop your artwork or work with our designers." },
  { icon: Receipt, title: "Get Quote", desc: "Instant pricing based on quantity & print method." },
  { icon: Truck, title: "Delivery", desc: "Premium packed, dispatched pan-India in 7–10 days." },
];

export const HowItWorks = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <div className="inline-block glass rounded-full px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
            How it works
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gradient">
            Four steps. Zero friction.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, i) => (
            <div key={i} className="relative group">
              <div className="bg-gradient-card border border-border rounded-3xl p-7 h-full transition-all duration-500 hover:border-primary/40 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display font-black text-5xl text-muted-foreground/20 group-hover:text-primary/40 transition-colors">
                    0{i + 1}
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <s.icon size={20} />
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
