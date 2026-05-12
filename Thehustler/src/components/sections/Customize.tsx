import { Palette, Layers, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import cardCustom from "@/assets/card-custom.jpg";

const methods = [
  { icon: Palette, name: "DTF Printing", desc: "Vibrant, full-color prints with crisp detail and stretch." },
  { icon: Layers, name: "Sublimation", desc: "All-over prints fused into the fabric. Won't fade, ever." },
  { icon: Scissors, name: "Embroidery", desc: "Premium stitched logos for that elevated corporate finish." },
];

export const Customize = () => {
  return (
    <section id="customize" className="relative py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-[2rem] overflow-hidden border border-border shadow-elevated order-2 lg:order-1">
          <img src={cardCustom} alt="Custom design preview" loading="lazy" className="w-full h-auto" />
          <div className="absolute top-4 left-4 glass rounded-full px-3 py-1.5 text-xs">Live Preview</div>
          <div className="absolute bottom-4 right-4 glass rounded-2xl px-4 py-3">
            <div className="text-xs text-muted-foreground">Method</div>
            <div className="font-display font-semibold text-primary">DTF · 4 colors</div>
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-8">
          <div className="inline-block glass rounded-full px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground">
            Customization
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gradient leading-tight">
            Three methods. <br />Infinite possibilities.
          </h2>
          <div className="space-y-4">
            {methods.map((m, i) => (
              <div key={i} className="flex gap-5 p-5 rounded-2xl bg-gradient-card border border-border hover:border-primary/40 transition-all">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <m.icon size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">{m.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="hero" size="lg" asChild>
            <Link to="/customize">Customize Yours</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
