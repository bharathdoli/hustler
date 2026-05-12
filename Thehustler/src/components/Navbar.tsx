import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#services" },
  { label: "Bulk Orders", href: "#stack" },
  { label: "Customize", href: "#customize" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav
        className={cn(
          "glass rounded-full transition-all duration-500 w-full max-w-5xl",
          scrolled ? "shadow-elevated" : "shadow-soft"
        )}
      >
        <div className="flex items-center justify-between pl-6 pr-2 py-2">
          <a href="#home" className="font-display font-extrabold tracking-tight text-base sm:text-lg">
            THE HUSTLER<span className="text-primary">.</span>
          </a>

          <ul className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground transition-colors duration-200">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button variant="hero" size="sm" className="hidden sm:inline-flex" asChild>
              <a href="#contact">Get Quote</a>
            </Button>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden rounded-full p-2 text-foreground hover:bg-secondary transition"
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden px-4 pb-4 pt-2 animate-fade-in">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm hover:bg-secondary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button variant="hero" className="w-full" asChild>
                  <a href="#contact" onClick={() => setOpen(false)}>Get Quote</a>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
