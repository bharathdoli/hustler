import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    qty: "25 – 99",
    price: "₹229",
    perks: ["DTF / Screen print", "1 color print", "Standard cotton tee", "7–10 day delivery"],
  },
  {
    qty: "100 – 499",
    price: "₹189",
    perks: ["Multi-color print", "Premium cotton 180 GSM", "Free design assist", "Priority shipping"],
    featured: true,
  },
  {
    qty: "500+",
    price: "₹169",
    perks: ["Sublimation / embroidery", "Custom tags & packaging", "Dedicated account mgr", "Express dispatch"],
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <div className="inline-block glass rounded-full px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Pricing
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gradient">
            Starting from <span className="text-gradient-primary">₹169</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Bulk pricing that rewards ambition. The more you order, the lower it goes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <div
              key={i}
              className={`relative rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-1 ${
                t.featured
                  ? "bg-gradient-primary text-primary-foreground border-primary shadow-glow"
                  : "bg-gradient-card border-border hover:border-primary/40"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background text-primary border border-primary/40 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  Most popular
                </div>
              )}
              <div className={`text-xs uppercase tracking-widest mb-2 ${t.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {t.qty} pieces
              </div>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-display font-black text-5xl">{t.price}</span>
                <span className={`text-sm ${t.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>/ piece</span>
              </div>
              <ul className="space-y-3 mb-8">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <Check size={16} className={t.featured ? "text-primary-foreground mt-0.5" : "text-primary mt-0.5"} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={t.featured ? "glass" : "hero"}
                className="w-full"
                asChild
              >
                <a href="#contact">Get Quote</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
