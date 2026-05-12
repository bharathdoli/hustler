import { Shirt, GraduationCap, Calendar, Building2, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Shirt,
    title: "Bulk T-Shirt Printing",
    desc: "Premium cotton, pin-sharp prints, MOQ from 25 pieces.",
    details: [
      "180–240 GSM bio-washed cotton",
      "DTF, screen & sublimation printing",
      "MOQ: 25 pieces · 7–10 day delivery",
      "Unlimited colour & size options",
    ],
  },
  {
    icon: GraduationCap,
    title: "College Signature Day",
    desc: "Class hoodies, batch tees, fest merch — fully customized.",
    details: [
      "Batch hoodies, jackets & varsity sets",
      "Free design assistance for class reps",
      "Name & roll number printing on back",
      "Bulk discounts on 50+ pieces",
    ],
  },
  {
    icon: Calendar,
    title: "Event Merchandise",
    desc: "Concerts, hackathons, weddings — branded crew kits.",
    details: [
      "Crew tees, caps, lanyards & wristbands",
      "Rush delivery available",
      "On-site sample approvals in Hyderabad",
      "Eco-friendly packaging on request",
    ],
  },
  {
    icon: Building2,
    title: "Corporate Branding",
    desc: "Polos, jackets, giveaways for teams that mean business.",
    details: [
      "Premium polos, oxfords & windcheaters",
      "Embroidered logos & monograms",
      "Onboarding kits & welcome boxes",
      "GST invoicing & PO support",
    ],
  },
];

export const Services = () => {
  return (
    <section id="services" className="relative py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="inline-block glass rounded-full px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
              Services
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gradient leading-tight max-w-2xl">
              Everything you need. <br />Printed loud, delivered fast.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Whether it's 25 hoodies for your hostel or 5,000 tees for a corporate event — we've got the kit.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={i}
              className="group relative bg-gradient-card rounded-3xl border border-border p-7 min-h-[280px] flex flex-col transition-all duration-500 hover:border-primary/40 hover:-translate-y-2 hover:shadow-glow overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-primary">
                  <s.icon size={22} />
                </div>
                <ArrowUpRight className="text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" size={20} />
              </div>
              <h3 className="font-display font-bold text-xl mb-2 transition-opacity duration-300 group-hover:opacity-0">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed transition-opacity duration-300 group-hover:opacity-0">{s.desc}</p>

              {/* Hover overlay with more info */}
              <div className="absolute inset-0 bg-card rounded-3xl p-6 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 flex flex-col border border-primary/30 overflow-y-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <s.icon size={16} />
                  </div>
                  <h3 className="font-display font-bold text-base leading-tight">{s.title}</h3>
                </div>
                <ul className="space-y-2 text-[13px] leading-snug text-foreground/90">
                  {s.details.map((d, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-primary mt-0.5 shrink-0">▸</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
