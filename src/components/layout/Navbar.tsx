import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ssottaWordmark from "@/assets/brand/ssotta-wordmark.png";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";
  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const eatTime = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Kampala" }));
      const day = eatTime.getDay();
      const hour = eatTime.getHours();
      if (day === 0) {
        setIsOpen(hour >= 10 && hour < 16);
      } else {
        setIsOpen(hour >= 8 && hour < 18);
      }
    };
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/bikes", label: "Bikes" },
    { href: "/parts", label: "Parts" },
    { href: "/rentals", label: "Rentals" },
    { href: "/repairs", label: "Repairs" },
    { href: "/showroom", label: "Showroom" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent text-white"
          : "bg-background/95 text-foreground shadow-sm border-b border-foreground/10 backdrop-blur-xl"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 h-18 md:h-20 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="group flex flex-col" aria-label="Ssotta Bicycle Shop home">
            <img
              src={ssottaWordmark}
              alt="Ssotta Bicycle Shop"
              className="h-8 w-[154px] object-contain object-left drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.02] sm:w-[178px] md:h-9 md:w-[190px] lg:h-10 lg:w-[220px]"
            />
            <span className="mt-[-2px] text-[9px] font-mono font-bold uppercase tracking-normal text-primary md:text-[10px]">
              Egaali Ennamu
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-bold text-sm uppercase tracking-normal transition-colors hover:text-primary"
              data-testid={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
              {location === link.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <div className="flex items-center gap-2 mr-2 text-xs font-mono font-black uppercase">
            <span className="relative flex h-2 w-2">
              {isOpen && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpen ? "bg-emerald-500" : "bg-red-500"}`}></span>
            </span>
            <span className={isTransparent ? "text-white/80" : "text-foreground/80"}>
              {isOpen ? "Shop Open" : "Shop Closed"}
            </span>
          </div>
          <Button
            asChild
            className={`uppercase font-bold tracking-normal rounded-md border transition-all active:scale-95 ${
              isTransparent
                ? "border-white/40 bg-white text-neutral-950 hover:bg-primary hover:text-neutral-950"
                : "border-foreground/10 bg-foreground text-background hover:bg-primary hover:text-foreground"
            }`}
            size="lg"
          >
            <Link href="/showroom#booking">Book or Visit</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-md border border-current/15"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-foreground text-background border-t border-background/15 overflow-hidden"
          >
            <nav className="flex flex-col p-6 space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-2xl font-black uppercase ${
                    location === link.href ? "text-primary" : "text-background"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild size="lg" className="w-full mt-4 rounded-md uppercase font-bold text-lg">
                <Link href="/showroom#booking">
                  Book or Visit
                </Link>
              </Button>
              <div className="flex items-center justify-center gap-2 py-2">
                <span className="relative flex h-2 w-2">
                  {isOpen && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpen ? "bg-emerald-500" : "bg-red-500"}`}></span>
                </span>
                <span className="font-mono text-xs font-bold uppercase text-background/60">
                  {isOpen ? "Shop is Open Now" : "Shop is Closed Now"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-background/10">
                <span className="font-mono text-xs font-bold uppercase text-background/60">Theme</span>
                <ThemeToggle />
              </div>
              <a
                href="tel:+256757432917"
                className="font-mono text-primary font-bold text-center text-sm"
              >
                +256 757 432 917
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
