import { Sparkles, Zap, ShieldCheck, HeartHandshake, Palette, Truck } from "lucide-react";

const reasons = [
  { icon: Palette, title: "Free Design Support", desc: "Our in-house designers refine your idea — no extra cost, unlimited revisions." },
  { icon: Sparkles, title: "Premium Fabrics Only", desc: "Bio-washed cotton, heavyweight hoodies, fabrics that survive a 100 washes." },
  { icon: Zap, title: "Fast Turnaround", desc: "Orders dispatched in 7–10 days. Rush production available on request." },
  { icon: ShieldCheck, title: "100% Quality Promise", desc: "Every piece QC-checked. We re-print at our cost if it's not perfect." },
  { icon: Truck, title: "Pan-India Delivery", desc: "Door-step shipping anywhere in India with live tracking." },
  { icon: HeartHandshake, title: "Built on Trust", desc: "Hyderabad-based, 500+ brands, colleges & startups already hustled with us." },
];

export const WhyUs = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-background">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <div className="inline-block glass rounded-full px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Why Hustler
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gradient leading-tight">
            Loud prints. <span className="text-gradient-primary">Louder reasons.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            Six reasons our customers come back — and bring their whole batch with them.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="group bg-gradient-card border border-border rounded-3xl p-7 transition-all duration-500 hover:border-primary/40 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <r.icon size={22} />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
