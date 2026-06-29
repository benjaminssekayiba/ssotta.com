import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Bike, CalendarCheck, PackageCheck, Phone, ShieldCheck, Store, Wrench, ArrowRight, PlayCircle, Volume2 } from "lucide-react";
import ssottaWordmark from "@/assets/brand/ssotta-wordmark.png";

/* Authentic Images from Chat */
const kidOnBikeImg = "/hd-images/img-1.png";
const hangingBikesImg = "/hd-images/img-2.png";
const bikesOutsideVanImg = "/hd-images/img-3.png";
const cargoBikesImg = "/hd-images/img-4.png";
const managerImg = "/hd-images/manager.jpg";

import mountainBikeImg from "@/assets/mountain-bike.png";
import sparePartsImg from "@/assets/spare-parts.png";
import heroDirtRoadImg from "@/assets/hero-dirt-road.png";
import cityCommuterImg from "@/assets/city-commuter.png";
import roadCyclingImg from "@/assets/road-cycling.png";
import showroomImg from "@/assets/showroom.png";
import workshopImg from "@/assets/workshop.png";
import kidsBikes from "@/assets/kids-bikes.png";

/* hero slideshow images */
const HERO_SLIDES = [
  { src: bikesOutsideVanImg, alt: "Ssotta Bicycle Shop Front", position: "center", label: "Bwayise Storefront" },
  { src: kidOnBikeImg, alt: "Kids trying out bikes at Ssotta", position: "center", label: "Customer Fitting" },
  { src: "/kids-riding-uganda-01.png", alt: "Kids riding bikes in Kampala", position: "center", label: "Uganda Cycling Group" },
  { src: "/kids-riding-uganda-02.png", alt: "Children cycling outdoors", position: "center", label: "Kids Track Ride" },
  { src: hangingBikesImg, alt: "Bicycles lined up outside", position: "center", label: "In-Stock Showroom" },
  { src: heroDirtRoadImg, alt: "Bicycle on dirt road", position: "center" },
  { src: cityCommuterImg, alt: "City commuter bike", position: "center" },
  { src: roadCyclingImg, alt: "Road cycling experience", position: "center" },
];
const SLIDE_DURATION = 5000;

function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const currentSlide = HERO_SLIDES[index];

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
      SLIDE_DURATION,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={currentSlide.src}
          alt={currentSlide.alt}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ objectPosition: currentSlide.position ?? "center" }}
        />
      </AnimatePresence>

      {currentSlide.label && (
        <div className="absolute top-6 left-6 z-20 rounded border border-white/20 bg-black/60 px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-wider text-white backdrop-blur shadow-[3px_3px_0px_0px_#000]">
          {currentSlide.label}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-8 bg-primary" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const marqueeItems = [
  "Egaali Ennamu",
  "Bicycles for sale in Kampala",
  "Parts checked for fit before purchase",
  "Repairs handled by 3 on-site mechanics",
  "Mobile money, card, and cash accepted",
  "Bwayise, Kawaala, Kazo Junction",
  "10 years serving Kampala",
  "10,000+ riders helped",
];
const marqueeText = marqueeItems.map((t) => t + "  |  ").join("");

function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress >= 1) { setCount(target); clearInterval(timer); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return count;
}

function StatCounter({
  value, suffix = "", label, sub, delay = 0,
}: { value: number; suffix?: string; label: string; sub: string; delay?: number; }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(value, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-xl border border-primary/20 bg-black/40 p-5 text-left backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 sm:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-primary/80" />
      <div className="mb-4 text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-none text-primary tabular-nums tracking-normal">
        <span className="whitespace-nowrap">{count}{suffix}</span>
      </div>
      <div className="mb-1 text-sm font-black uppercase tracking-wider text-white sm:text-base">{label}</div>
      <div className="font-sans text-xs font-semibold text-white/60 sm:text-sm">{sub}</div>
    </motion.div>
  );
}

const homeSections = [
  {
    icon: Bike,
    eyebrow: "Bikes",
    title: "Buy a bicycle that fits.",
    desc: "Shop kids, adult, carrier, mountain, road, and geared bicycles with showroom fitting before you buy.",
    img: hangingBikesImg,
    href: "/bikes",
    cta: "Shop Bikes",
    stat: "Kids / Adult / Carrier",
    contextLabel: "Browse ready-to-ride stock",
  },
  {
    icon: CalendarCheck,
    eyebrow: "Rentals",
    title: "Rent a bicycle when you need one.",
    desc: "Daily and weekly bicycle hire for errands, practice, deliveries, and moving around Kampala.",
    img: bikesOutsideVanImg,
    href: "/showroom#rental-booking",
    cta: "Reserve Rental",
    stat: "Daily / Weekly",
    contextLabel: "Kampala commuter & rentals",
  },
  {
    icon: PackageCheck,
    eyebrow: "Wholesale",
    title: "Order parts in bulk.",
    desc: "Mechanics, workshops, bicycle shops, fleets, schools, and regular buyers can request bulk parts with fitment support.",
    img: sparePartsImg,
    href: "/showroom#wholesale-booking",
    cta: "Request Supply",
    stat: "Bulk / Repeat",
    contextLabel: "Direct import bulk pricing",
  },
  {
    icon: Store,
    eyebrow: "Showroom",
    title: "Visit, test, and reserve.",
    desc: "Check sizes, confirm stock, book repairs, request parts, or reserve a bicycle before you travel.",
    img: cargoBikesImg,
    href: "/showroom",
    cta: "Plan Visit",
    stat: "Bwayise / Kawaala",
    contextLabel: "Test-ride before you pay",
  },
];

const showcaseItems = [
  { title: "Kids Bikes", tag: "Ages 3 - 12", img: kidOnBikeImg, href: "/bikes" },
  { title: "Mannyi ga Kifuba", tag: "150kg+ Heavy-Duty Capacity", img: cargoBikesImg, href: "/bikes" },
  { title: "Mountain & Geared", tag: "Kampala Dirt Road Ready", img: mountainBikeImg, href: "/bikes" },
  { title: "Spare Parts", tag: "Mechanic Approved Fitment", img: sparePartsImg, href: "/parts" },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    {
      q: "What payment methods do you accept?",
      a: "We accept MTN Mobile Money, Airtel Money, credit/debit cards at the showroom, and cash."
    },
    {
      q: "Can I get my bicycle delivered?",
      a: "Yes! Once you confirm the order details with our manager on WhatsApp, we can arrange safe motorcycle or vehicle delivery anywhere around Kampala."
    },
    {
      q: "How does the size check work?",
      a: "You can send the rider's age and height to Brenda on WhatsApp. She will verify the frame and tyre sizes (e.g. 16, 20, 24 inch) to ensure a perfect fit."
    },
    {
      q: "Do you offer warranties on parts?",
      a: "All spare parts and workshop repairs are verified by our 3 on-site mechanics to guarantee fitment and long-term durability."
    }
  ];

  return (
    <section className="bg-foreground text-background px-5 py-16 md:px-12 md:py-24 border-b-4 border-foreground" data-testid="section-faq">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="font-mono text-xs font-bold uppercase text-primary mb-2">Got Questions?</p>
          <h2 className="text-3xl font-black uppercase text-white md:text-4xl">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-4 border-background rounded-lg bg-card text-foreground overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left font-black uppercase text-sm md:text-base border-b-2 border-foreground"
                >
                  <span>{faq.q}</span>
                  <span className="font-mono text-xl">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="p-5 font-sans text-xs md:text-sm leading-relaxed text-muted-foreground bg-muted">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PromoVideoPanel() {
  const videoShellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoInView, setVideoInView] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const target = videoShellRef.current;
    if (!target) return;

    const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;
    const minimumRatio = isSmallScreen ? 0.35 : 0.5;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= minimumRatio;
        setVideoInView(isVisible);

        if (!isVisible) {
          videoRef.current?.pause();
        }
      },
      {
        root: null,
        rootMargin: isSmallScreen ? "-8% 0px -8% 0px" : "-12% 0px -12% 0px",
        threshold: [0, 0.25, 0.5, minimumRatio, 0.85, 1],
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        videoRef.current?.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;

    if (video.readyState >= 2) {
      setVideoReady(true);
    } else {
      video.load();
    }
  }, [videoFailed]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed || !videoReady) return;

    if (!videoInView) {
      video.pause();
      return;
    }

    video.muted = !soundEnabled;
    video.playsInline = true;
    const playPromise = video.play();

    if (playPromise) {
      playPromise.catch(() => {
        video.muted = true;
        setSoundEnabled(false);
        video.play().catch(() => undefined);
      });
    }
  }, [soundEnabled, videoFailed, videoInView, videoReady]);

  const enableSound = () => {
    const video = videoRef.current;
    setSoundEnabled(true);

    if (video) {
      video.muted = false;
      video.volume = 0.85;
      video.play().catch(() => undefined);
    }
  };

  return (
    <section
      className="border-b-4 border-foreground bg-foreground px-5 py-16 text-background md:px-12 md:py-24"
      data-testid="section-promo-video"
    >
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-normal text-primary">
            How We Help
          </p>
          <h2 className="mb-6 text-4xl font-black uppercase leading-none tracking-normal md:text-6xl text-white">
            Find the right bike<br />or part faster.
          </h2>
          <p className="mb-8 max-w-xl font-sans text-sm leading-relaxed text-background/60 md:text-base">
            Tell us what you need, confirm stock or fitment, save the request, and send it to WhatsApp before you visit.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Bikes ready to fit", "Parts checked", "Bulk supply supported", "Repairs scheduled"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
                className="rounded-md border border-background/15 bg-background/5 p-4"
              >
                <ShieldCheck className="mb-3 h-5 w-5 text-primary" />
                <p className="font-sans text-xs font-bold text-background/70">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-lg border-4 border-primary bg-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.12)]"
        >
          <div ref={videoShellRef} className="relative aspect-video min-h-[240px]">
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${!videoFailed ? "opacity-100" : "opacity-0"}`}
              src="/ssotta-explainer.mp4"
              poster={showroomImg}
              muted={!soundEnabled}
              autoPlay
              controls
              preload="metadata"
              loop
              playsInline
              onLoadedMetadata={() => setVideoReady(true)}
              onLoadedData={() => setVideoReady(true)}
              onCanPlay={() => setVideoReady(true)}
              onPlay={() => setVideoReady(true)}
              onError={() => setVideoFailed(true)}
              aria-label="Ssotta explainer video"
            />

            {!videoFailed && !soundEnabled && (
              <button
                type="button"
                onClick={enableSound}
                className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-md border-2 border-white/70 bg-white px-4 py-2 font-mono text-xs font-black uppercase text-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.55)] transition-transform hover:-translate-y-0.5"
              >
                <Volume2 className="h-4 w-4 text-primary" />
                Sound On
              </button>
            )}

            {videoFailed && (
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={kidsBikes}
                  alt="Kids bicycles at Ssotta"
                  className="absolute inset-0 h-full w-full object-cover"
                  animate={{ scale: [1, 1.08, 1.02], opacity: [0.85, 1, 0.9] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.img
                  src={workshopImg}
                  alt="Ssotta workshop"
                  className="absolute inset-0 h-full w-full object-cover mix-blend-screen"
                  animate={{ opacity: [0, 0.32, 0], x: ["-6%", "4%", "0%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-black/10" />
                <motion.div
                  className="absolute inset-x-5 bottom-5 top-5 flex flex-col justify-between"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-foreground shadow-[3px_3px_0px_0px_#000]">
                      <PlayCircle className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-normal text-primary">
                        Ssotta Explainer
                      </p>
                      <p className="font-black uppercase text-white">Request Flow</p>
                    </div>
                  </div>
                  <div>
                    <motion.p
                      animate={{ opacity: [0.65, 1, 0.65] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      className="max-w-md text-3xl font-black uppercase leading-none tracking-normal text-white md:text-5xl"
                    >
                      Choose. Confirm. Visit with confidence.
                    </motion.p>
                    <p className="mt-3 font-mono text-xs font-bold uppercase text-white/60">
                      Bikes, parts, repairs, rentals, and wholesale supply.
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <div className="bg-background overflow-x-hidden" data-testid="page-home">
      {/* 1. HERO SECTION */}
      <section className="relative h-[100dvh] min-h-[600px] w-full flex items-end overflow-hidden">
        <HeroSlideshow />
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full pb-16 sm:pb-24 px-5 sm:px-8 md:px-12 lg:px-16"
        >
          <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 0.95, delay: 0.1 }}>
            <img src={ssottaWordmark} alt="SSOTTA" className="mb-4 h-auto w-[min(75vw,60rem)] max-w-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]" />
          </motion.div>
          <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 0.95, delay: 0.25 }}>
            <h2 className="mb-6 text-[clamp(1.6rem,6vw,5rem)] font-black uppercase tracking-normal leading-[0.88] text-primary">
              Egaali Ennamu
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.5 }} className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="h-14 px-10 text-base font-black uppercase border-0 shadow-[5px_5px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all rounded-md">
              <Link href="/bikes">View Bikes</Link>
            </Button>
            <Button asChild size="lg" className="h-14 px-10 text-base font-black uppercase bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground shadow-[5px_5px_0px_0px_rgba(255,255,255,0.25)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.25)] hover:translate-x-1 hover:translate-y-1 transition-all rounded-md">
              <a href="tel:+256757432917"><Phone size={16} className="mr-2" />Call the Shop</a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y-4 border-foreground bg-primary py-3">
        <div className="flex w-fit animate-marquee items-center font-mono text-[11px] font-black uppercase tracking-normal text-foreground md:text-xs">
          <span className="whitespace-nowrap">{marqueeText}</span>
          <span className="whitespace-nowrap">{marqueeText}</span>
        </div>
      </div>

      {/* 2. ABOUT & STATS SECTION (MOVED UP) */}
      <section className="relative overflow-hidden border-b-4 border-foreground bg-foreground px-5 py-16 text-background md:px-12 md:py-24" data-testid="section-about">
        <div className="absolute inset-0 z-0">
          <img src={hangingBikesImg} alt="Ssotta shop" className="h-full w-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/90 to-foreground/80" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-primary">Trusted in Kampala</p>
              <h2 className="mb-6 text-4xl font-black uppercase leading-none tracking-normal text-white md:text-5xl lg:text-6xl">
                Real shop. Real stock. Real mechanics.
              </h2>
              <p className="max-w-xl font-sans text-base leading-relaxed text-background/70 mb-8">
                For over a decade, we have been Bwayise's trusted bicycle hub. Whether you're a parent buying a first bike, a mechanic needing bulk parts, or a daily commuter, we ensure every bicycle is road-ready before it leaves our showroom.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["Bikes ready to fit", "Parts checked", "Bulk supply", "On-site repairs"].map((item, i) => (
                  <div key={item} className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="font-sans text-sm font-bold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <StatCounter value={10} suffix="" label="Years" sub="Rooted in Kampala" delay={0} />
              <StatCounter value={10} suffix="K+" label="Riders" sub="Riders served" delay={0.1} />
              <StatCounter value={3} suffix="" label="Mechanics" sub="On-site support" delay={0.2} />
              <StatCounter value={100} suffix="%" label="Checked" sub="Fitment guaranteed" delay={0.3} />
            </div>
          </div>
        </div>
      </section>

      {/* 2.2 HOW IT WORKS SECTION */}
      <section className="bg-background border-b-4 border-foreground px-5 py-12 md:px-12 md:py-16" data-testid="section-how-it-works">
        <div className="mx-auto max-w-screen-xl">
          <div className="text-center mb-10">
            <p className="font-mono text-xs font-bold uppercase text-primary mb-2">Frictionless Process</p>
            <h2 className="text-3xl font-black uppercase text-foreground md:text-4xl">How to get your bike</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Browse & Select", desc: "Look through our high-quality kids, commuter, or carrier bicycles online." },
              { step: "02", title: "WhatsApp Manager", desc: "Send your inquiry. Brenda will instantly verify sizes, stock, and fitment details." },
              { step: "03", title: "Visit & Collect", desc: "Come by the Bwayise showroom to test-ride, adjust your fit, and pay securely." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-card border-4 border-foreground rounded-lg shadow-[5px_5px_0px_0px_#000]"
              >
                <div className="font-mono text-3xl font-black text-primary mb-3">{item.step}</div>
                <h4 className="text-lg font-black uppercase text-foreground mb-2">{item.title}</h4>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 MANAGER SECTION */}
      <section className="border-b-4 border-foreground bg-background px-5 py-16 md:px-12 md:py-24" data-testid="section-manager">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="overflow-hidden rounded-xl border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_#000]">
                <img
                  src={managerImg}
                  alt="Ssotta Shop Manager"
                  className="w-full h-auto object-cover object-center max-h-[550px]"
                />
              </div>
              <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                Brenda coordinating daily workshop repairs, parts inventory, and WhatsApp bookings.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-primary">Operations & Support</p>
              <h2 className="mb-6 text-4xl font-black uppercase leading-none tracking-normal text-foreground md:text-5xl lg:text-6xl">
                Direct support from our manager.
              </h2>
              <p className="font-sans text-base leading-relaxed text-muted-foreground mb-8">
                Get in touch directly with our shop manager to confirm bike availability, check spare parts compatibility, schedule repairs, or coordinate wholesale supply before you visit. We keep our communication direct and local to save your time.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Direct WhatsApp Booking",
                    desc: "All requests are sent straight to our manager to confirm prices, sizes, and stock details in real-time.",
                  },
                  {
                    title: "Mechanic & Workshop Supervision",
                    desc: "Our manager coordinates our 3 on-site mechanics to ensure your repairs are completed on schedule.",
                  },
                  {
                    title: "Wholesale & Business Operations",
                    desc: "Efficient stock tracking and bulk orders management for workshops, fleets, and retail shops.",
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary text-foreground font-black font-mono text-sm border-2 border-foreground shadow-[2px_2px_0px_0px_#000]">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-sans text-base font-bold text-foreground mb-1">{feature.title}</h4>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-14 px-10 text-base font-black uppercase border-2 border-foreground bg-primary text-foreground hover:bg-primary shadow-[5px_5px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all rounded-md">
                  <a href="https://wa.me/256757432917" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES */}
      <section className="bg-background px-5 py-16 md:px-12 md:py-24" data-testid="section-services">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-2 font-mono text-xs font-bold uppercase text-primary">What We Do</p>
              <h2 className="text-4xl font-black uppercase leading-none tracking-normal text-foreground md:text-6xl">
                Start with the<br />service you need.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {homeSections.map((section, i) => (
              <motion.div
                key={section.eyebrow}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border-4 border-foreground bg-white shadow-[6px_6px_0px_0px_#000] transition-transform hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#000]"
              >
                <div className="relative h-48 overflow-hidden border-b-4 border-foreground sm:h-56 lg:h-52">
                  <img src={section.img} alt={`${section.eyebrow} at Ssotta`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Context Badge */}
                  <div className="absolute top-3 left-3 z-10 rounded border border-white/20 bg-black/75 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                    {section.contextLabel}
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-foreground shadow-[3px_3px_0px_0px_#000]">
                      <section.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase text-primary">{section.stat}</p>
                      <h3 className="font-black uppercase text-white">{section.eyebrow}</h3>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h4 className="mb-2 text-lg font-black uppercase text-foreground">{section.title}</h4>
                  <p className="mb-6 flex-1 font-sans text-sm font-medium leading-relaxed text-muted-foreground">{section.desc}</p>
                  <Button asChild className="w-full rounded-md border-2 border-foreground bg-background text-foreground hover:bg-primary shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                    <Link href={section.href}>
                      {section.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PromoVideoPanel />

      {/* 4. FEATURED FLEET */}
      <section className="border-t-4 border-foreground bg-primary px-5 py-12 pb-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black uppercase leading-none tracking-normal text-foreground md:text-5xl">Shop By Category</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {showcaseItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-lg border-4 border-foreground bg-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-1"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary">{item.tag}</p>
                    <h3 className="mb-3 text-xl font-black uppercase text-white">{item.title}</h3>
                    <Button asChild size="sm" variant="outline" className="w-full border-2 border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-foreground">
                      <Link href={item.href}>View Range</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WORKSHOP & UTILITY */}
      <section className="relative overflow-hidden border-y-8 border-foreground h-[600px] lg:h-[700px] flex items-center justify-center">
        <img src={cargoBikesImg} alt="Kampala bikes ready for work" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
        
        <div className="relative z-10 mx-auto max-w-4xl text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Wrench className="mx-auto mb-6 h-12 w-12 text-primary" />
            <p className="mb-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-primary">Mannyi ga Kifuba & Repairs</p>
            <h2 className="mb-6 text-4xl font-black uppercase leading-none tracking-normal text-white md:text-6xl">
              Built for everyday work.
            </h2>
            <p className="mx-auto mb-10 max-w-2xl font-sans text-lg font-medium leading-relaxed text-white/80">
              From assembling heavy-duty carrier bicycles (Mannyi ga Kifuba) for transport across Bwayise and Kawaala, to tuning geared bikes and replacing worn parts. Our 3 on-site mechanics ensure every bike leaves the workshop ready for the road.
            </p>
            <Button asChild size="lg" className="rounded-md h-14 px-10 text-base font-black uppercase tracking-normal bg-primary text-foreground hover:bg-primary border-0 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-1 hover:translate-y-1 transition-all">
              <Link href="/showroom#booking">Book a Repair</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 5.5 CUSTOMER REVIEWS */}
      <section className="bg-background px-5 py-16 md:px-12 md:py-24 border-b-4 border-foreground" data-testid="section-reviews">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-10 text-center">
            <p className="font-mono text-xs font-bold uppercase text-primary mb-2">Social Proof</p>
            <h2 className="text-4xl font-black uppercase text-foreground md:text-5xl">Kampala Riders Trust Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "I bought a Mannyi ga Kifuba carrier bike for my store deliveries. The manager Brenda verified the frame strength and the mechanics fitted heavy tyres. Outstanding service!",
                author: "Joseph K., Commuter",
                location: "Bwayise"
              },
              {
                quote: "Finding the right kids bicycle can be tough, but Brenda helped us pick the perfect 18-inch bike. My daughter rides it every day around Kawaala. Highly recommended!",
                author: "Nalongo S., Parent",
                location: "Kawaala"
              },
              {
                quote: "As a local repair workshop owner, I order spare parts in bulk from Ssotta. Sourcing is fast, pricing is direct, and the quality is mechanic-certified.",
                author: "Mukasa D., Mechanic",
                location: "Kazo Junction"
              }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-card border-4 border-foreground rounded-lg shadow-[5px_5px_0px_0px_#000] flex flex-col justify-between"
              >
                <p className="text-sm font-medium text-foreground italic mb-6 leading-relaxed">\"{review.quote}\"</p>
                <div>
                  <h4 className="font-sans text-base font-black text-foreground">{review.author}</h4>
                  <span className="font-mono text-xs text-primary font-bold uppercase">{review.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.8 FAQ SECTION */}
      <FAQSection />

      {/* 6. CTA SECTION */}
      <section className="overflow-hidden bg-background px-5 py-16 md:px-12 md:py-24 lg:py-28" data-testid="section-cta">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-normal text-primary">Ready to choose?</p>
            <h2 className="mb-6 text-[clamp(2.6rem,8vw,6.8rem)] font-black uppercase leading-[0.92] tracking-normal text-foreground">
              Tobonabona nga<br /><span className="text-primary">"Ssotta" wetuli.</span>
            </h2>
            <p className="max-w-2xl text-base font-semibold leading-relaxed text-muted-foreground md:text-lg">
              Visit the showroom, confirm the right fit, or send your request on WhatsApp before you travel.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row lg:flex-col">
            <Button asChild size="lg" className="h-14 w-full rounded-md border-4 border-foreground bg-primary px-9 text-base font-black uppercase text-foreground shadow-[6px_6px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-primary hover:shadow-[2px_2px_0px_0px_#000] sm:w-auto md:h-16">
              <Link href="/showroom#booking">Visit Showroom</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 w-full rounded-md border-4 border-foreground px-9 text-base font-black uppercase shadow-[6px_6px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] sm:w-auto md:h-16">
              <a href="tel:+256757432917"><Phone size={18} className="mr-2" />Call the Shop</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
