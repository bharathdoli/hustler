import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import model1 from "@/assets/hero-customized-tee.jpg";
import model2 from "@/assets/hero-signature-day.jpg";
import model3 from "@/assets/hero-corporate.jpg";
import model4 from "@/assets/hero-events.jpg";
import model5 from "@/assets/hero-college.jpg";

const models = [
  { img: model1, label: "Customized Tee" },
  { img: model2, label: "Signature Day Tshirts" },
  { img: model3, label: "Corporate Branding" },
  { img: model4, label: "Events" },
  { img: model5, label: "College Merch" },
];

export const Hero = () => {
  const mobileStackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const maxProgress = Math.max(models.length - 1, 1);

    const updateProgress = () => {
      if (!mobileStackRef.current) return;
      const rect = mobileStackRef.current.getBoundingClientRect();
      const total = mobileStackRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p * maxProgress);
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

  return (
    <section
      id="home"
      className="relative bg-background grain"
    >
      {/* MOBILE: pin entire hero while cards stack */}
      <div className="sm:hidden">
        <div ref={mobileStackRef} className="relative" style={{ height: `${(models.length + 1) * 100}vh` }}>
          <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-24 pb-8">
            {/* ambient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/10 blur-[180px] pointer-events-none rounded-full" />
            <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="relative px-6 text-center">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-foreground/80">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                New Drop · Spring 2026
              </div>
              <h1 className="mt-4 font-display font-black leading-[0.95] tracking-tight text-4xl text-gradient">
                Built for the hustle,
                <br />
                <span className="text-gradient-primary">made to stand out.</span>
              </h1>
              <div className="mt-5 flex justify-center">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 bg-foreground text-background rounded-full pl-5 pr-2 py-1.5 font-semibold text-xs shadow-soft"
                >
                  Start Custom Order
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <ArrowRight size={14} />
                  </span>
                </a>
              </div>
            </div>

            <div className="relative flex-1 flex items-center justify-center">
              <div className="relative w-[70%] max-w-[260px] aspect-[3/4]">
                {models.map((m, i) => {
                  const revealProgress = i === 0 ? 1 : Math.min(Math.max(progress - (i - 1), 0), 1);
                  const stackDepth = Math.min(Math.max(progress - i, 0), models.length - 1);
                  const translateY = (1 - revealProgress) * 115;
                  const translateX = -stackDepth * 7;
                  const liftY = stackDepth * 16;
                  const rotate = (1 - revealProgress) * 18 - stackDepth * 4;
                  const scale = Math.max(0.8, 1 - stackDepth * 0.04);
                  const opacity = i === 0 ? 1 : Math.min(Math.max(revealProgress * 1.25, 0), 1);
                  return (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-2xl overflow-hidden border border-border bg-secondary shadow-elevated will-change-transform"
                      style={{
                        zIndex: i + 1,
                        transform: `translate3d(${translateX}%, ${translateY}%, 0) translateY(${-liftY}px) rotate(${rotate}deg) scale(${scale})`,
                        opacity,
                        transition: 'transform 90ms linear, opacity 90ms linear',
                      }}
                    >
                      <img
                        src={m.img}
                        alt={m.label}
                        width={768}
                        height={1024}
                        loading={i > 0 ? "lazy" : "eager"}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 text-[10px] tracking-widest text-white/80 font-mono">
                        A{(i + 1).toString().padStart(2, '0')}-{(i + 7) * 11}FL
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">{m.label}</span>
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <ShoppingBag size={12} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP: original layout */}
      <div className="hidden sm:block pt-32">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        {/* badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-xs sm:text-sm text-foreground/80 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          New Drop · Spring Collection 2026
        </div>

        {/* headline */}
        <h1 className="mt-8 font-display font-black leading-[0.95] tracking-tight text-5xl sm:text-7xl lg:text-8xl text-gradient animate-fade-up">
          Built for the hustle, <br className="hidden sm:block" />
          <span className="text-gradient-primary">made to stand out.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground animate-fade-up">
          Custom merch crafted for those who hustle, grind, and refuse to blend in.
          Premium tees, hoodies & gear — built bold, delivered fast.
        </p>

        {/* CTA pill */}
        <div className="mt-10 flex justify-center animate-fade-up">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-foreground text-background rounded-full pl-6 pr-2 py-2 font-semibold text-sm hover:scale-105 transition-transform shadow-soft"
          >
            Start Custom Order
            <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center group-hover:rotate-[-45deg] transition-transform">
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
      </div>

      {/* Arch model row */}
      <div className="relative mt-16 sm:mt-20">
        {/* Desktop: curved arc row */}
        <div className="hidden sm:block">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative">
            {/* nav arrows */}
            <button
              aria-label="Previous"
              className="absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              aria-label="Next"
              className="absolute -right-2 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <ChevronRight size={18} />
            </button>

            <div className="flex items-end justify-center gap-2 sm:gap-4 px-6 sm:px-12 pb-4 [perspective:1200px]">
              {models.map((m, i) => {
                // Arc layout: outer cards rotate outward and sit lower
                const offset = i - (models.length - 1) / 2; // -2,-1,0,1,2
                const rotate = offset * 8; // degrees
                const translateY = Math.abs(offset) * 18; // px down
                const scale = 1 - Math.abs(offset) * 0.04;
                return (
                <div
                  key={i}
                  className="group relative aspect-[3/5] w-[18%] min-w-[110px] overflow-hidden border border-border bg-secondary transition-transform duration-500 hover:!translate-y-0 hover:!rotate-0 hover:scale-105"
                  style={{
                    borderTopLeftRadius: '999px',
                    borderTopRightRadius: '999px',
                    borderBottomLeftRadius: '1.5rem',
                    borderBottomRightRadius: '1.5rem',
                    transform: `rotate(${rotate}deg) translateY(${translateY}px) scale(${scale})`,
                    transformOrigin: 'bottom center',
                    zIndex: 10 - Math.abs(offset),
                  }}
                >
                  <img
                    src={m.img}
                    alt={m.label}
                    width={768}
                    height={1280}
                    loading={i > 1 ? "lazy" : "eager"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-xs font-semibold">{m.label}</span>
                    <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <ShoppingBag size={12} />
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>

      {/* Marquee */}
      <div className="relative mt-16 sm:mt-24 overflow-hidden border-y border-border py-5 bg-surface/40">
        <div className="flex animate-marquee whitespace-nowrap gap-12 font-display font-bold text-2xl sm:text-3xl text-muted-foreground/40">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span>BULK ORDERS</span><span className="text-primary">★</span>
              <span>DTF PRINTING</span><span className="text-primary">★</span>
              <span>EMBROIDERY</span><span className="text-primary">★</span>
              <span>COLLEGE MERCH</span><span className="text-primary">★</span>
              <span>SUBLIMATION</span><span className="text-primary">★</span>
              <span>CORPORATE</span><span className="text-primary">★</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
