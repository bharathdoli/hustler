import { useEffect, useRef, useState } from "react";
import cardBulk from "@/assets/card-bulk.jpg";
import cardCustom from "@/assets/card-custom.jpg";
import cardCollege from "@/assets/card-college.jpg";
import cardCorporate from "@/assets/card-corporate.jpg";

const cards = [
  {
    tag: "01 / Bulk Orders",
    title: "Bulk Orders, Built to Scale",
    desc: "From 25 pieces to 25,000 — premium fabric, sharp prints, fast turnaround. The bigger you go, the better the price.",
    img: cardBulk,
    accent: "from-orange-500/20 to-transparent",
  },
  {
    tag: "02 / Custom Designs",
    title: "Designs That Hit Different",
    desc: "Bring your vision or work with our in-house designers. DTF, sublimation, embroidery — every detail dialed in.",
    img: cardCustom,
    accent: "from-rose-500/20 to-transparent",
  },
  {
    tag: "03 / College Merch",
    title: "Signature Day, Sorted",
    desc: "Class hoodies, fest tees, departmental drops. Trusted by 200+ colleges across India for unforgettable merch moments.",
    img: cardCollege,
    accent: "from-amber-500/20 to-transparent",
  },
  {
    tag: "04 / Corporate Branding",
    title: "Brand It Like You Mean It",
    desc: "Premium polos, jackets and giveaways that elevate your team and your brand. Subtle, sharp, and unmistakably you.",
    img: cardCorporate,
    accent: "from-blue-500/20 to-transparent",
  },
];

export const StackingCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const maxProgress = Math.max(cards.length, 1);

    const updateProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const rawProgress = total > 0 ? scrolled / total : 0;
      setProgress(rawProgress * maxProgress);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const animationProgress = Math.min(progress, cards.length - 1);
  const activeIdx = Math.min(cards.length - 1, Math.round(animationProgress));

  return (
    <section id="stack" className="relative bg-background">
      {/* Intro */}
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <div className="inline-block glass rounded-full px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
          What we make
        </div>
        <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-gradient leading-tight">
          One Brand. <br />Every Kind of Drop.
        </h2>
        <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg">
          Scroll through the four pillars of The Hustler — every category engineered for impact.
        </p>
      </div>

      {/* Stacking */}
      <div ref={containerRef} style={{ height: `${(cards.length + 1) * 120}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center px-4 py-14 sm:px-6 sm:py-20">
          <div className="relative w-full max-w-6xl h-[78vh] max-h-[760px]">
            {cards.map((card, i) => {
              const revealProgress = i === 0 ? 1 : Math.min(Math.max(animationProgress - (i - 1), 0), 1);
              const stackDepth = Math.min(Math.max(animationProgress - i, 0), cards.length - 1);
              const incomingY = i === 0 ? 0 : (1 - revealProgress) * 118;
              const liftY = stackDepth * 18;
              const scale = Math.max(0.82, 1 - stackDepth * 0.045);
              const rotate = stackDepth * -1.4;
              const opacity = i === 0 ? 1 : Math.min(Math.max(revealProgress * 1.4, 0), 1);

              return (
              <div
                key={i}
                className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-border bg-gradient-card shadow-elevated will-change-transform"
                style={{
                  zIndex: i + 1,
                  opacity,
                  transform: `translate3d(0, ${incomingY}%, 0) translateY(${-liftY}px) scale(${scale}) rotate(${rotate}deg)`,
                  transformOrigin: "top center",
                  transition: "transform 90ms linear, opacity 90ms linear",
                }}
              >
                <div className="grid lg:grid-cols-2 min-h-[70vh]">
                  <div className="relative p-10 sm:p-14 flex flex-col justify-between">
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} pointer-events-none`} />
                    <div className="relative">
                      <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-6">
                        {card.tag}
                      </div>
                      <h3 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-gradient">
                        {card.title}
                      </h3>
                      <p className="mt-6 text-muted-foreground text-lg max-w-md leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                    <div className="relative mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex gap-1">
                        {cards.map((_, j) => (
                          <div
                            key={j}
                            className={`h-1 rounded-full transition-all ${
                              j <= activeIdx ? "w-8 bg-primary" : "w-4 bg-border"
                            }`}
                          />
                        ))}
                      </div>
                      <span>{i + 1} / {cards.length}</span>
                    </div>
                  </div>
                  <div className="relative h-72 lg:h-auto overflow-hidden">
                    <img
                      src={card.img}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-card/40 lg:to-card/60" />
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
