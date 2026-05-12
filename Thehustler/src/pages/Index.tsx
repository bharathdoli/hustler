import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { StackingCards } from "@/components/sections/StackingCards";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Portfolio } from "@/components/sections/Portfolio";
import { Customize } from "@/components/sections/Customize";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { MessageCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <StackingCards />
        <Services />
        <WhyUs />
        <Portfolio />
        <Customize />
        <Testimonials />
        <Contact />
      </main>
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/918247244596?text=Hi%20Hustler%2C%20I%27d%20like%20a%20quote"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-black flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
};

export default Index;
