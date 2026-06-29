import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Disc,
  Frame,
  Handshake,
  Lightbulb,
  PackageCheck,
  Settings,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import spareParts from "@/assets/spare-parts.png";
import bikeFrameImg from "@/assets/parts/bike-frame.jpg";
import bikeLightImg from "@/assets/parts/bike-light.jpg";
import brakePadsImg from "@/assets/parts/brake-pads.jpg";
import drivetrainChainImg from "@/assets/parts/drivetrain-chain.jpg";
import tyresTubesImg from "@/assets/parts/tyres-tubes.jpg";
import workshopToolsImg from "@/assets/parts/workshop-tools.jpg";

const categories = [
  {
    name: "Brake Systems",
    icon: Disc,
    img: brakePadsImg,
    position: "center",
    desc: "Pads, cables, levers, and complete brake checks for all bike sizes.",
    stock: "High-demand stock",
    source: "https://commons.wikimedia.org/wiki/File:Disc_pad.jpg",
    credit: "Disc pad.jpg / Wikimedia Commons",
  },
  {
    name: "Drivetrain",
    icon: Settings,
    img: drivetrainChainImg,
    position: "left center",
    desc: "Chains, cassettes, cranks, derailleurs, and gear fitment support.",
    stock: "Mechanic checked",
    source: "https://commons.wikimedia.org/wiki/File:Bike_gears_and_chain.jpg",
    credit: "5 Cent Dollar / CC BY-SA 4.0",
  },
  {
    name: "Tyres & Tubes",
    icon: Zap,
    img: tyresTubesImg,
    position: "right center",
    desc: "Daily commuter, kids, cargo, mountain, and road bike sizes.",
    stock: "Most sizes available",
    source: "https://commons.wikimedia.org/wiki/File:Changing_an_inner_tube_-_Inflating_the_new_tube.jpg",
    credit: "Fanny Schertzer / CC BY-SA",
  },
  {
    name: "Lighting & Accessories",
    icon: Lightbulb,
    img: bikeLightImg,
    position: "center top",
    desc: "Front lights, rear reflectors, locks, baskets, and safety extras.",
    stock: "Ready to fit",
    source: "https://commons.wikimedia.org/wiki/File:Battery_powered_front_bike_light.jpg",
    credit: "Sdk16420 / CC BY-SA 4.0",
  },
  {
    name: "Frames & Forks",
    icon: Frame,
    img: bikeFrameImg,
    position: "center bottom",
    desc: "Steel and alloy options with sizing advice before purchase.",
    stock: "Ask for fitment",
    source: "https://commons.wikimedia.org/wiki/File:Bike_frame-Lapierre.jpg",
    credit: "Kornatka / CC BY-SA",
  },
  {
    name: "Tools & Workshop",
    icon: Wrench,
    img: workshopToolsImg,
    position: "center",
    desc: "Multi-tools, pumps, patch kits, and workshop-backed installation.",
    stock: "Shop supported",
    source: "https://commons.wikimedia.org/wiki/File:BicycleRepairTools.JPG",
    credit: "BicycleRepairTools.JPG / Wikimedia Commons",
  },
];

const process = [
  "Share the part name, bike type, or a clear photo.",
  "We check size, compatibility, and available alternatives.",
  "Reserve the right part or request a bulk order.",
];

const partCatalog = [
  {
    group: "Braking",
    items: [
      "Brake pads",
      "Brake shoes",
      "Disc rotors",
      "Calipers",
      "V-brake arms",
      "Brake levers",
      "Brake cables",
      "Hydraulic hoses",
    ],
  },
  {
    group: "Drivetrain",
    items: [
      "Chains",
      "Cassettes",
      "Freewheels",
      "Chainrings",
      "Cranksets",
      "Bottom brackets",
      "Derailleurs",
      "Jockey wheels",
    ],
  },
  {
    group: "Wheels",
    items: [
      "Rims",
      "Hubs",
      "Spokes",
      "Nipples",
      "Axles",
      "Quick releases",
      "Wheel bearings",
      "Rim tape",
    ],
  },
  {
    group: "Tyres",
    items: [
      "Tyres",
      "Inner tubes",
      "Valves",
      "Tube patches",
      "Tyre liners",
      "Sealant",
      "Tubeless valves",
      "Valve caps",
    ],
  },
  {
    group: "Steering",
    items: [
      "Handlebars",
      "Stems",
      "Grips",
      "Bar tape",
      "Headsets",
      "Forks",
      "Spacers",
      "Bells",
    ],
  },
  {
    group: "Seating",
    items: [
      "Saddles",
      "Seatposts",
      "Seat clamps",
      "Seat rails",
      "Comfort cushions",
      "Kids seats",
      "Seat bolts",
      "Reflector mounts",
    ],
  },
  {
    group: "Pedals & Footing",
    items: [
      "Flat pedals",
      "Pedal axles",
      "Toe clips",
      "Cleats",
      "Pedal reflectors",
      "Crank bolts",
      "Dust caps",
      "Pedal straps",
    ],
  },
  {
    group: "Cables & Controls",
    items: [
      "Gear cables",
      "Brake housing",
      "Gear housing",
      "Cable ends",
      "Barrel adjusters",
      "Shifters",
      "Levers",
      "Cable guides",
    ],
  },
  {
    group: "Cargo & Utility",
    items: [
      "Rear racks",
      "Front baskets",
      "Carrier racks",
      "Mudguards",
      "Kickstands",
      "Chain guards",
      "Bottle cages",
      "Mirrors",
    ],
  },
  {
    group: "Safety",
    items: [
      "Front lights",
      "Rear lights",
      "Reflectors",
      "Locks",
      "Helmets",
      "Gloves",
      "High-visibility gear",
      "Horns",
    ],
  },
  {
    group: "Service Spares",
    items: [
      "Bearings",
      "Cones",
      "Nuts",
      "Bolts",
      "Washers",
      "Springs",
      "Grease",
      "Lubricants",
    ],
  },
  {
    group: "Tools & Care",
    items: [
      "Pumps",
      "Patch kits",
      "Multi-tools",
      "Chain tools",
      "Spanners",
      "Cleaners",
      "Brushes",
      "Maintenance oil",
    ],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Parts() {
  return (
    <div className="min-h-screen bg-background pt-20" data-testid="page-parts">
      <section className="relative overflow-hidden border-b-8 border-primary bg-foreground px-6 py-28 text-background md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.24, scale: 1 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0 z-0"
        >
          <img src="/hd-images/img-4.png" alt="Spare parts display" className="h-full w-full object-cover grayscale mix-blend-luminosity" />
        </motion.div>
        <div className="relative z-10 mx-auto max-w-screen-xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 font-mono text-xs font-bold uppercase tracking-normal text-primary"
          >
            Parts & Accessories
          </motion.p>
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="mb-6 text-[clamp(3rem,12vw,9rem)] font-black uppercase leading-none tracking-normal">
              Spare Parts
            </h1>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mb-7 h-2 bg-primary"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-2xl font-sans text-xl leading-snug text-white/80 md:text-2xl"
          >
            Find the right bicycle part with stock, size, and fitment checked before you buy.
          </motion.p>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:py-32">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-black uppercase tracking-normal md:text-5xl"
            >
              Shop by Category
            </motion.h2>
            <Button
              asChild
              size="lg"
              className="w-fit rounded-md bg-foreground px-8 font-black uppercase text-background hover:bg-foreground"
            >
              <Link href="/showroom#parts-booking">
                Request a Part <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.name}
                  variants={item}
                  whileHover={{ y: -4 }}
                  className="group overflow-hidden rounded-lg border border-foreground/15 bg-card shadow-sm transition-all hover:border-primary hover:shadow-xl"
                  data-testid={`card-part-${i}`}
                >
                  <div className="relative h-56 overflow-hidden border-b border-foreground/10">
                    <img
                      src={cat.img}
                      alt={`${cat.name} at Ssotta`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: cat.position }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-foreground shadow-md">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-bold uppercase text-foreground">
                        {cat.stock}
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="mb-2 text-2xl font-black uppercase tracking-normal transition-colors group-hover:text-primary">
                      {cat.name}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-muted-foreground">{cat.desc}</p>
                    <a
                      href={cat.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-block font-sans text-[10px] text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                    >
                      Image: {cat.credit}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/40 px-6 py-20 md:px-12 lg:py-28">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-12 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-normal text-primary">
                Complete Bicycle Parts Range
              </p>
              <h2 className="text-4xl font-black uppercase tracking-normal md:text-6xl">
                Parts for every area<br />of the bike.
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.55 }}
              className="font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
            >
              If it fits a kids bike, city bike, cargo bike, mountain bike, road bike, or daily commuter, ask us first. We check size and compatibility before reserving it for you.
            </motion.p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {partCatalog.map((section) => (
              <motion.div
                key={section.group}
                variants={item}
                className="rounded-lg border border-foreground/15 bg-background p-5 shadow-sm"
              >
                <h3 className="mb-4 border-b border-foreground/10 pb-3 text-lg font-black uppercase tracking-normal">
                  {section.group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {section.items.map((part) => (
                    <span
                      key={part}
                      className="rounded-full border border-foreground/10 bg-card px-3 py-1.5 font-sans text-[10px] font-bold text-muted-foreground"
                    >
                      {part}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="wholesale-parts" className="border-y-8 border-foreground bg-background px-6 py-20 md:px-12 lg:py-28">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-normal text-primary">
              Wholesale Parts Supply
            </p>
            <h2 className="mb-6 text-4xl font-black uppercase leading-none tracking-normal md:text-6xl">
              Bulk supply for<br />mechanics and shops.
            </h2>
            <p className="mb-8 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
              Repair workshops, bicycle shops, rental fleets, schools, and delivery operators can request regular supply, mixed cartons, and fitment-checked parts.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-md bg-foreground px-8 font-black uppercase text-background hover:bg-foreground">
                <Link href="/showroom#wholesale-booking">
                  Request Wholesale Supply <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-md border-2 border-foreground px-8 font-black uppercase">
                <a href="tel:+256757432917">Call About Supply</a>
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { title: "Bulk Stock", text: "Fast-moving chains, tyres, tubes, brakes, bearings, cables, and workshop spares." },
              { title: "Fitment Support", text: "Send the bike model, size, or photo so the correct parts are reserved." },
              { title: "Repeat Supply", text: "Set weekly, monthly, or as-needed restock requests for your business." },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="rounded-lg border border-foreground/15 bg-card p-6 shadow-sm"
              >
                <Handshake className="mb-5 h-7 w-7 text-primary" />
                <h3 className="mb-3 text-xl font-black uppercase tracking-normal">{card.title}</h3>
                <p className="font-sans text-xs leading-relaxed text-muted-foreground">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y-8 border-primary bg-foreground px-6 py-16 text-background">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-normal text-primary">
              Fitment Promise
            </p>
            <h2 className="text-4xl font-black uppercase tracking-normal md:text-5xl">
              Check fitment before<br />you buy.
            </h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-3">
            {process.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="rounded-lg border border-background/15 bg-background/5 p-5"
              >
                <ShieldCheck className="mb-4 h-6 w-6 text-primary" />
                <p className="font-sans text-sm leading-relaxed text-background/65">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:py-36">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-lg border border-primary/50 bg-primary p-10 text-center shadow-xl md:p-14"
          >
            <PackageCheck className="mx-auto mb-5 h-10 w-10 text-foreground" />
            <h2 className="mb-4 text-4xl font-black uppercase tracking-normal text-foreground md:text-6xl">
              Need a Specific Part?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl font-sans text-base font-bold text-foreground/70 md:text-lg">
              Send the part name, bike type, and urgency. Get stock and fitment checked before you travel.
            </p>
            <Button
              asChild
              size="lg"
              className="h-16 rounded-md bg-foreground px-10 text-lg font-black uppercase tracking-normal text-background hover:bg-foreground md:px-14"
              data-testid="btn-parts-ask"
            >
              <Link href="/showroom#parts-booking">
                Open Parts Request <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
