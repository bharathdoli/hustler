import { Instagram, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-background border-t border-border pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="font-display font-extrabold text-2xl mb-3">THE HUSTLER<span className="text-primary">.</span></div>
            <p className="text-muted-foreground max-w-sm">
              Custom merchandise built for those who hustle, grind, and refuse to blend in.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/thehustler.merchandise/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/918247244596"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.554-5.338 11.89-11.893 11.89a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z"/></svg>
              </a>
              <a
                href="https://maps.google.com/?q=DD+Colony+Amberpet+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Location"
                className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <MapPin size={18} />
              </a>
            </div>
          </div>
          <div>
            <div className="font-display font-bold mb-4">Explore</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground">Services</a></li>
              <li><a href="#portfolio" className="hover:text-foreground">Portfolio</a></li>
              <li><a href="#customize" className="hover:text-foreground">Customize</a></li>
              <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-display font-bold mb-4">Get in touch</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:hello@thehustler.in" className="hover:text-foreground">hello@thehustler.in</a></li>
              <li>
                <a href="https://wa.me/918247244596" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  WhatsApp: +91 82472 44596
                </a>
              </li>
              <li className="text-foreground/60">DD Colony, Amberpet, Hyderabad</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© 2026 The Hustler Merchandise. All rights reserved.</div>
          <div>Built for the relentless.</div>
        </div>
      </div>
    </footer>
  );
};
