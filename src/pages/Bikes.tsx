import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import kidsBikes from "@/assets/kids-bikes.png";
import carrierBike from "@/assets/carrier-bike.png";
import mountainBike from "@/assets/mountain-bike.png";
import cityCommuter from "@/assets/city-commuter.png";
import roadCycling from "@/assets/road-cycling.png";
import heroImg from "@/assets/hero-dirt-road.png";
import cementCarrierImg from "@assets/ChatGPT_Image_May_25,_2026,_01_28_35_PM_1780641993032.png";

const bikes = [
  {
    id: "kids",
    num: "01",
    name: "Kids Bikes",
    badge: "Priority Stock",
    img: kidsBikes,
    tags: ["Training Wheels", "Ages 2-12", "Bright Colors"],
    desc: "Choose kids bicycles with the right size, training support, bright colours, and accessories. Popular sizes are kept ready so families can compare before buying.",
  },
  {
    id: "carrier",
    num: "02",
    name: "Mannyi ga Kifuba",
    badge: null,
    img: cementCarrierImg,
    tags: ["Heavy Duty", "Cargo", "Steel Frame"],
    desc: "Heavy-duty carrier bicycles for work, errands, and load carrying. Practical steel builds for riders who need strength every day.",
  },
  {
    id: "mountain",
    num: "03",
    name: "Mountain Bikes",
    badge: null,
    img: mountainBike,
    tags: ["Suspension", "Trail Ready", "Multi-gear"],
    desc: "Reliable bicycles for rough roads, hills, and trail riding. Suspension, grip, and gearing are checked before you ride.",
  },
  {
    id: "used",
    num: "04",
    name: "Used & Checked",
    badge: null,
    img: cityCommuter,
    tags: ["Checked", "Value", "Tuned Up"],
    desc: "Pre-owned bicycles inspected and tuned by our mechanics. Each one is checked for brakes, gears, tyres, and ride readiness.",
  },
  {
    id: "changers",
    num: "05",
    name: "Changers",
    badge: null,
    img: roadCycling,
    tags: ["Geared", "Speed", "Commute"],
    desc: "Geared bicycles for commuting, climbing, and faster road use. We help you choose the setup that fits your route.",
  },
];

function BikePanel({
  bike,
  index,
}: {
  bike: (typeof bikes)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-0 mb-2 border-b-4 border-foreground`}
      data-testid={`bike-panel-${bike.id}`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2 relative overflow-hidden h-[380px] lg:h-[560px]">
        <motion.img
          src={bike.img}
          alt={bike.name}
          style={{ scale: imgScale }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />
        {/* Number */}
        <div className="absolute top-6 left-6 font-mono text-xs text-white/40 font-bold uppercase tracking-normal">
          {bike.num} / {String(bikes.length).padStart(2, "0")}
        </div>
        {bike.badge && (
          <div className="absolute top-6 right-6 bg-primary border-2 border-foreground px-3 py-1 shadow-[3px_3px_0px_0px_#000]">
            <span className="font-black text-xs uppercase tracking-normal text-foreground">
              {bike.badge}
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-16 px-8 md:px-14 lg:px-16 bg-background">
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {bike.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs font-bold bg-secondary text-secondary-foreground border-2 border-foreground px-3 py-1 uppercase shadow-[2px_2px_0px_0px_#000]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-normal leading-none mb-6">
            {bike.name}
          </h2>
          <p className="text-lg md:text-xl font-sans leading-relaxed text-muted-foreground border-l-4 border-primary pl-5 mb-8">
            {bike.desc}
          </p>
          <Button
            asChild
            size="lg"
            className="w-fit rounded-md font-black uppercase tracking-normal border-4 border-foreground shadow-[5px_5px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all"
            data-testid={`btn-ask-${bike.id}`}
          >
            <Link href="/showroom#bike-booking">
              Check Availability <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function Bikes() {
  return (
    <div className="bg-background min-h-screen pt-20" data-testid="page-bikes">
      {/* Header */}
      <section className="relative overflow-hidden bg-foreground py-28 px-6 text-background md:px-12 border-b-8 border-primary">
        <motion.img src={heroImg} alt="Bicycle riders on Kampala road" initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 8, ease: "linear" }} className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/72 to-foreground/25" />
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[clamp(3rem,12vw,9rem)] font-black uppercase tracking-normal leading-none mb-4">
              Shop Bikes
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="font-mono text-xl md:text-2xl text-primary font-bold uppercase tracking-normal max-w-2xl"
          >
            Compare kids, carrier, mountain, used, and geared bicycles before you buy.
          </motion.p>
        </div>
        <div
          className="absolute right-8 bottom-8 text-[12rem] md:text-[18rem] font-black uppercase text-white/[0.03] leading-none select-none pointer-events-none"
        >
          RIDE
        </div>
      </section>

      {/* Bike Panels */}
      <div className="border-t-0">
        {bikes.map((bike, i) => (
          <BikePanel key={bike.id} bike={bike} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="bg-primary py-24 px-6 text-center border-t-4 border-foreground">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-normal text-foreground mb-8">
            Need help choosing?
          </h2>
          <Button
            asChild
            size="lg"
            className="rounded-md bg-foreground text-background hover:bg-foreground font-black text-lg uppercase tracking-normal h-16 px-14 border-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-1 hover:translate-y-1 transition-all"
            data-testid="btn-bikes-talk"
          >
            <Link href="/showroom#bike-booking">Ask for Bike Advice</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
