import { MessageCircle, ArrowRight } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/918247244596?text=" +
  encodeURIComponent(
    "Hi Hustler 👋, I'd like to request a quote for custom merch. Please share details."
  );

export const Contact = () => {
  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/15 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative w-full px-4 sm:px-8 lg:px-16">
        <div className="text-center mb-14">
          <div className="inline-block glass rounded-full px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Let's build
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-gradient leading-[1.05]">
            Get Your Custom <br /><span className="text-gradient-primary">Merch Today.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-lg">
            One tap to WhatsApp — we'll send a tailored quote within minutes.
          </p>
        </div>

        <div className="w-full max-w-[1600px] mx-auto">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 sm:gap-5 bg-[#25D366] text-black rounded-full px-6 py-5 sm:px-12 sm:py-7 lg:py-8 font-display font-bold text-lg sm:text-2xl lg:text-3xl hover:scale-[1.02] transition-transform shadow-elevated w-full"
          >
            <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
            Send Quote Request
            <span className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black text-[#25D366] flex items-center justify-center group-hover:rotate-[-45deg] transition-transform shrink-0">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </a>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center max-w-5xl mx-auto">
            <div className="bg-gradient-card border border-border rounded-2xl p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">WhatsApp</div>
              <div className="font-display font-semibold">+91 82472 44596</div>
            </div>
            <div className="bg-gradient-card border border-border rounded-2xl p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Visit us</div>
              <div className="font-display font-semibold text-sm">DD Colony, Amberpet, Hyderabad</div>
            </div>
            <a
              href="https://www.instagram.com/thehustler.merchandise/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-card border border-border rounded-2xl p-5 hover:border-primary transition"
            >
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Instagram</div>
              <div className="font-display font-semibold text-primary">@thehustler.merchandise</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
