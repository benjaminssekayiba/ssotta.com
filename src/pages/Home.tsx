import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bike, CalendarCheck, PackageCheck, Phone, PlayCircle, ShieldCheck, Store, Volume2 } from "lucide-react";
import heroImg from "@/assets/hero-dirt-road.png";
import showroomImg from "@/assets/showroom.png";
import kidsBikes from "@/assets/kids-bikes.png";
import sparePartsImg from "@/assets/spare-parts.png";
import cityCommuterImg from "@/assets/city-commuter.png";
import mountainBike from "@/assets/mountain-bike.png";
import roadCycling from "@/assets/road-cycling.png";
import workshopImg from "@/assets/workshop.png";
import cementCarrierImg from "@assets/ChatGPT_Image_May_25,_2026,_01_28_35_PM_1780641993032.png";
import kidsRidingUgandaOne from "@assets/kids-riding-uganda-01.png";
import kidsRidingUgandaTwo from "@assets/kids-riding-uganda-02.png";
import ssottaWordmark from "@/assets/brand/ssotta-wordmark.png";

/* hero slideshow images */
const HERO_SLIDES = [
  {
    src: kidsRidingUgandaOne,
    alt: "Ugandan kids riding bicycles on a village road",
    position: "center",
  },
  {
    src: kidsRidingUgandaTwo,
    alt: "Ugandan children laughing while riding kids bicycles",
    position: "center",
  },
  { src: heroImg, alt: "Cyclists racing on red dirt road in Kampala" },
  { src: roadCycling, alt: "Road cyclists in action" },
  { src: mountainBike, alt: "Mountain bike trail riding" },
];
const SLIDE_DURATION = 4500; // ms per slide

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
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ objectPosition: currentSlide.position ?? "center" }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-primary" : "w-1.5 bg-white/40"
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

const homeSections = [
  {
    icon: Bike,
    eyebrow: "Bikes",
    title: "Buy a bicycle that fits.",
    desc: "Shop kids, adult, carrier, mountain, road, and geared bicycles with showroom fitting before you buy.",
    img: kidsBikes,
    href: "/bikes",
    cta: "Shop Bikes",
    stat: "Kids / Adult / Carrier",
  },
  {
    icon: CalendarCheck,
    eyebrow: "Rentals",
    title: "Rent a bicycle when you need one.",
    desc: "Daily and weekly bicycle hire for errands, practice, deliveries, and moving around Kampala.",
    img: cityCommuterImg,
    href: "/showroom#rental-booking",
    cta: "Reserve Rental",
    stat: "Daily / Weekly",
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
  },
  {
    icon: Store,
    eyebrow: "Showroom",
    title: "Visit, test, and reserve.",
    desc: "Check sizes, confirm stock, book repairs, request parts, or reserve a bicycle before you travel.",
    img: showroomImg,
    href: "/showroom#booking",
    cta: "Plan Visit",
    stat: "Bwayise / Kawaala",
  },
];

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
      className="group relative overflow-hidden rounded-lg border border-background/12 bg-background/[0.035] p-5 text-left shadow-[0_18px_45px_-32px_rgba(255,90,44,0.65)] transition-transform duration-300 hover:-translate-y-1 sm:p-6 lg:p-7"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
      <div className="mb-4 text-[clamp(3rem,6vw,5.7rem)] font-black leading-none text-primary tabular-nums tracking-normal sm:mb-5">
        <span className="whitespace-nowrap">{count}{suffix}</span>
      </div>
      <div className="mb-1 text-sm font-black uppercase tracking-normal text-white sm:text-base">{label}</div>
      <div className="font-sans text-xs font-semibold text-background/50 sm:text-sm">{sub}</div>
    </motion.div>
  );
}

const showcaseItems = [
  { title: "Kids Bikes", tag: "Always stocked", img: kidsBikes, href: "/bikes" },
  { title: "Mannyi ga Kifuba", tag: "Heavy-duty carrier", img: cementCarrierImg, href: "/bikes" },
  { title: "Mountain Bikes", tag: "Rough-road ready", img: mountainBike, href: "/bikes" },
  { title: "Geared Bikes", tag: "Speed and climbing", img: roadCycling, href: "/bikes" },
];

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
          <h2 className="mb-6 text-4xl font-black uppercase leading-none tracking-normal md:text-6xl">
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
      <section className="relative h-[100dvh] min-h-[600px] w-full flex items-end overflow-hidden">
        <HeroSlideshow />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full pb-12 sm:pb-16 md:pb-24 px-5 sm:px-8 md:px-12 lg:px-16"
        >
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-mono text-[10px] sm:text-xs font-bold text-primary tracking-normal sm:tracking-normal mb-3 md:mb-4 leading-relaxed"
          >
            <span className="sm:hidden">Bwayise, Kawaala - Kampala</span>
            <span className="hidden sm:inline">Bwayise - Kawaala - Kazo Junction - Kampala</span>
          </motion.p>

          {/* Brand name */}
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <img
              src={ssottaWordmark}
              alt="SSOTTA"
              className="mb-3 h-auto w-[min(78vw,70rem)] max-w-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)] md:mb-4"
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            <h2 className="mb-4 md:mb-6 text-[clamp(1.4rem,5.8vw,4.8rem)] font-black uppercase tracking-normal leading-[0.88] text-primary">
              Egaali Ennamu
            </h2>
          </motion.div>

          {/* Business capsule */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mb-6 md:mb-8 font-sans text-xs sm:text-sm md:text-base font-bold uppercase tracking-normal text-white/80"
          >
            <span className="sm:hidden">
              Bikes / Parts / Repairs / Rentals
            </span>
            <span className="hidden sm:inline">
              Bicycles / Parts / Repairs / Rentals / Wholesale
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto rounded-md h-13 sm:h-14 px-8 sm:px-10 text-sm sm:text-base font-black uppercase tracking-normal border-0 shadow-[5px_5px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all"
              data-testid="btn-hero-bikes"
            >
              <Link href="/bikes">View Bikes</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto rounded-md h-13 sm:h-14 px-8 sm:px-10 text-sm sm:text-base font-black uppercase tracking-normal bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground shadow-[5px_5px_0px_0px_rgba(255,255,255,0.25)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.25)] hover:translate-x-1 hover:translate-y-1 transition-all"
              data-testid="btn-hero-call"
            >
              <a href="tel:+256757432917">
                <Phone size={16} className="mr-2 inline" />Call the Shop
              </a>
            </Button>
          </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-14 bg-gradient-to-b from-white/60 to-transparent"
          />
          <span className="font-mono text-[10px] uppercase tracking-normal text-white/40 rotate-90 origin-center mt-2">
            Scroll
          </span>
        </motion.div>
        </motion.div>
      </section>

      <div className="bg-primary border-y-4 border-foreground overflow-hidden py-3 md:py-4 relative z-10">
        <div className="flex whitespace-nowrap">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="font-black uppercase text-foreground text-base sm:text-xl md:text-2xl tracking-normal shrink-0 inline-block"
              animate={{ x: [0, "-100%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              &nbsp;&nbsp;{marqueeText}&nbsp;&nbsp;{marqueeText}&nbsp;&nbsp;
            </motion.span>
          ))}
        </div>
      </div>

      <section className="px-5 py-16 md:px-12 md:py-24 lg:py-32 border-b-4 border-foreground" data-testid="section-start-here">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-normal text-primary">
                Start Here
              </p>
              <h2 className="text-4xl font-black uppercase leading-none tracking-normal sm:text-5xl md:text-7xl">
                Start with the<br />service you need.
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.55 }}
              className="max-w-md font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
            >
              Choose bikes, rentals, spare parts, wholesale supply, repairs, or showroom help from one place.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {homeSections.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.article
                  key={section.title}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex h-full min-h-0 flex-col overflow-hidden rounded-lg border-4 border-foreground bg-card shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_#000]"
                  data-testid={`home-section-${section.eyebrow.toLowerCase()}`}
                >
                  <div className="relative h-48 overflow-hidden border-b-4 border-foreground sm:h-56 lg:h-64">
                    <img
                      src={section.img}
                      alt={`${section.eyebrow} at Ssotta`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-foreground shadow-[3px_3px_0px_0px_#000]">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="rounded-full bg-white/90 px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-foreground">
                        {section.stat}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-8">
                    <p className="mb-3 font-mono text-xs font-bold uppercase tracking-normal text-primary">
                      {section.eyebrow}
                    </p>
                    <h3 className="mb-4 text-[clamp(1.35rem,3.8vw,1.9rem)] font-black uppercase leading-tight tracking-normal">
                      {section.title}
                    </h3>
                    <p className="mb-7 flex-1 font-sans text-xs leading-relaxed text-muted-foreground md:text-sm">
                      {section.desc}
                    </p>
                    <Button
                      asChild
                      className="h-12 w-full rounded-md bg-foreground font-black uppercase tracking-normal text-background hover:bg-foreground sm:w-fit"
                      data-testid={`btn-home-${section.eyebrow.toLowerCase()}`}
                    >
                      <Link href={section.href}>
                        {section.cta} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <PromoVideoPanel />

      <section className="py-16 md:py-24 lg:py-36 px-5 md:px-12" data-testid="section-showcase">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-normal leading-none"
            >
              The<br />Fleet
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-sans text-base md:text-lg text-muted-foreground uppercase max-w-xs"
            >
              Bicycles for children, commuters, work, and weekend riding.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {showcaseItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.025, rotate: i % 2 === 0 ? 0.8 : -0.8 }}
                className="group relative border-4 border-foreground shadow-[5px_5px_0px_0px_#000] overflow-hidden aspect-[3/4] bg-muted"
                data-testid={`card-showcase-${i}`}
              >
                <Link href={item.href} className="absolute inset-0 z-20" />
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 z-10">
                  <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-normal text-primary font-bold mb-1">{item.tag}</div>
                  <h3 className="text-sm sm:text-xl font-black uppercase leading-tight text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-primary border-2 border-foreground w-8 h-8 flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                    <ArrowRight className="w-4 h-4 text-foreground" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 md:mt-10 flex justify-end"
          >
            <Button
              asChild variant="outline" size="lg"
              className="rounded-md font-black uppercase tracking-normal border-4 border-foreground shadow-[5px_5px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all"
              data-testid="btn-all-bikes"
            >
              <Link href="/bikes">View All Bikes <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="border-y-8 border-foreground overflow-hidden" data-testid="section-cargo">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] sm:h-[400px] lg:h-auto min-h-[400px] border-b-4 lg:border-b-0 lg:border-r-4 border-foreground overflow-hidden"
          >
            <img
              src={cementCarrierImg}
              alt="Kampala rider carrying cement on a bicycle"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </motion.div>

          <div className="bg-foreground text-background py-14 md:py-20 px-6 md:px-14 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-primary font-bold uppercase tracking-normal mb-3"
            >
              Mannyi ga Kifuba
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-normal leading-none mb-5"
            >
              Built for<br />Everyday<br />Work
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-sans text-background/60 text-sm md:text-base leading-relaxed mb-8 max-w-sm"
            >
              Strong carrier bicycles for daily work, errands, and practical transport across Bwayise, Kawaala, and Kampala.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
            >
              <Button
                asChild size="lg"
                className="w-full sm:w-fit rounded-md font-black uppercase tracking-normal bg-primary text-foreground hover:bg-primary border-0 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:translate-x-1 hover:translate-y-1 transition-all"
                data-testid="btn-cargo-bikes"
              >
                <Link href="/bikes">See Carrier Bikes</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden h-44 sm:h-56 md:h-72 border-b-4 border-foreground">
        <img src={workshopImg} alt="Ssotta workshop" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.05em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono font-bold uppercase text-white text-xs sm:text-sm md:text-lg text-center"
          >
            Repairs, parts, and advice from one trusted shop
          </motion.p>
        </div>
      </section>

      <section className="overflow-hidden border-y-4 border-primary bg-foreground px-5 py-14 text-background md:px-12 md:py-20 lg:py-24" data-testid="section-stats">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-8 max-w-2xl md:mb-10">
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-normal text-primary">
              Trusted in Kampala
            </p>
            <h2 className="text-3xl font-black uppercase leading-none tracking-normal text-white sm:text-4xl md:text-5xl">
              Stock, service, and support you can check in person.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCounter value={10} suffix="" label="Years Serving" sub="Rooted in Kampala" delay={0} />
            <StatCounter value={10} suffix="K+" label="Riders" sub="Riders served" delay={0.1} />
            <StatCounter value={3} suffix="" label="Mechanics" sub="On-site support" delay={0.2} />
            <StatCounter value={100} suffix="%" label="Parts Checked" sub="Fitment support" delay={0.3} />
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b-4 border-foreground bg-background px-5 py-16 md:px-12 md:py-24 lg:py-28" data-testid="section-cta">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-normal text-primary">
              Ready to choose?
            </p>
            <h2 className="mb-6 text-[clamp(2.6rem,8vw,6.8rem)] font-black uppercase leading-[0.92] tracking-normal text-foreground">
              Egaali Yo Namu?<br />
              <span className="text-primary">Okakasa?</span>
            </h2>
            <p className="max-w-2xl text-base font-semibold leading-relaxed text-muted-foreground md:text-lg">
              Visit the showroom, confirm the right fit, or send your request on WhatsApp before you travel.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.55 }}
            className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row lg:flex-col"
          >
            <Button
              asChild size="lg"
              className="h-14 w-full rounded-md border-4 border-foreground bg-primary px-9 text-base font-black uppercase tracking-normal text-foreground shadow-[6px_6px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-primary hover:shadow-[2px_2px_0px_0px_#000] sm:w-auto md:h-16"
              data-testid="btn-cta-showroom"
            >
              <Link href="/showroom#booking">Visit Showroom</Link>
            </Button>
            <Button
              asChild size="lg" variant="outline"
              className="h-14 w-full rounded-md border-4 border-foreground px-9 text-base font-black uppercase tracking-normal shadow-[6px_6px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] sm:w-auto md:h-16"
              data-testid="btn-cta-call"
            >
              <a href="tel:+256757432917">
                <Phone size={18} className="mr-2 inline" />Call the Shop
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
