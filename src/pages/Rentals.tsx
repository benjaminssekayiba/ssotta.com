import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Clock, Shield, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/app-icons";
import cityCommuter from "@/assets/city-commuter.png";
import kidsBikes from "@/assets/kids-bikes.png";
import mountainBike from "@/assets/mountain-bike.png";
import cementCarrierImg from "@assets/ChatGPT_Image_May_25,_2026,_01_28_35_PM_1780641993032.png";

const rentals = [
  {
    id: "commuter",
    name: "City Commuter Bicycle",
    img: cityCommuter,
    price: "Ask the shop",
    duration: "Daily / Weekly",
    desc: "For errands, short commutes, and flexible movement around Kampala.",
    features: ["Lightweight frame", "City-ready tyres", "Basket included"],
    bestFor: "Errands and commuting",
  },
  {
    id: "cargo",
    name: "Carrier / Work Bicycle",
    img: cementCarrierImg,
    price: "Ask the shop",
    duration: "Daily / Weekly",
    desc: "For carrying goods, supplies, and heavier daily errands with a stronger carrier setup.",
    features: ["Strong carrier setup", "Shop checked", "Work-ready fit"],
    bestFor: "Goods and errands",
  },
  {
    id: "mountain",
    name: "Mountain Trail Bike",
    img: mountainBike,
    price: "Ask the shop",
    duration: "Daily / Weekend",
    desc: "For rough roads, hill routes, and weekend riding outside the main roads.",
    features: ["Front suspension", "Multi-gear", "Knobby tyres"],
    bestFor: "Trails and hills",
  },
];

const paymentMethods = ["Mobile Money", "Card", "Cash"];

function RentalCard({ rental, index }: { rental: (typeof rentals)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-lg border-4 border-foreground bg-card shadow-[8px_8px_0px_0px_#000]"
      data-testid={`card-rental-${rental.id}`}
    >
      <div className="relative h-52 overflow-hidden border-b-4 border-foreground sm:h-60 lg:h-64">
        <motion.img
          src={rental.img}
          alt={rental.name}
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-[115%] object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-normal bg-foreground text-primary font-bold px-3 py-1">
          {rental.duration}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-7 lg:p-8">
        <p className="mb-3 font-mono text-[10px] font-bold uppercase text-primary">{rental.bestFor}</p>
        <h3 className="mb-3 text-[clamp(1.45rem,4.8vw,1.9rem)] font-black uppercase leading-tight tracking-normal transition-colors group-hover:text-primary">
          {rental.name}
        </h3>
        <p className="font-sans text-muted-foreground text-sm leading-relaxed mb-6">{rental.desc}</p>
        <div className="space-y-2 mb-6">
          {rental.features.map((f) => (
            <div key={f} className="flex items-center gap-3 font-mono text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              <span className="uppercase font-bold">{f}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-4 border-t-2 border-foreground pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-sans text-xs tracking-normal text-muted-foreground">Price</p>
            <p className="font-black text-lg uppercase">{rental.price}</p>
          </div>
          <Button
            asChild
            className="h-11 w-full rounded-md bg-foreground font-black uppercase text-background hover:bg-foreground sm:w-fit"
            data-testid={`btn-rental-${rental.id}`}
          >
            <Link href="/showroom#rental-booking">
              Reserve <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Rentals() {
  return (
    <div className="bg-background min-h-screen pt-20" data-testid="page-rentals">
      {/* Hero */}
      <section className="relative overflow-hidden border-b-8 border-primary bg-foreground py-28 px-6 text-background md:px-12">
        <motion.img src={cityCommuter} alt="Rental bicycle in Kampala" initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 8, ease: "linear" }} className="absolute inset-0 h-full w-full object-cover opacity-42" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/72 to-foreground/25" />
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs text-primary font-bold uppercase tracking-normal mb-4"
          >
            Bike Rentals
          </motion.p>
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[clamp(3rem,12vw,9rem)] font-black uppercase tracking-normal leading-none mb-8">
              Hire<br />
              <span className="text-primary">A Ride</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl font-sans font-bold border-l-8 border-primary pl-6 py-1 max-w-2xl text-background/75"
          >
            Flexible bicycle hire for errands, work, practice, and weekend riding in Kampala.
          </motion.p>
        </div>
      </section>

      {/* Feature badges */}
      <section className="bg-foreground text-background py-8 px-6 border-y-4 border-foreground">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 sm:grid-cols-3">
          {[
            { icon: Clock, text: "Daily and weekly hire" },
            { icon: Shield, text: "Bikes checked before pickup" },
            { icon: MapPin, text: "Bwayise / Kawaala pickup" },
          ].map(({ icon: Icon, text }, i) => (
            <div key={text} className="flex items-center gap-4 border-b border-background/15 px-4 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 md:px-8">
              <Icon size={20} className="text-primary shrink-0" />
              <span className="font-mono font-bold uppercase text-sm tracking-normal">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Rental Cards */}
      <section className="py-24 lg:py-36 px-6 md:px-12">
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-normal mb-14"
          >
            Bikes for Hire
          </motion.h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rentals.map((rental, i) => (
              <RentalCard key={rental.id} rental={rental} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Payment methods */}
      <section className="bg-foreground text-background py-20 px-6 border-t-8 border-primary">
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="shrink-0"
            >
              <p className="font-mono text-xs text-primary uppercase tracking-normal font-bold mb-2">Payment Options</p>
              <h2 className="text-4xl font-black uppercase tracking-normal">Payments</h2>
            </motion.div>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:flex md:flex-wrap">
              {paymentMethods.map((method, i) => (
                <motion.div
                  key={method}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="border-4 border-background/20 bg-background px-6 py-4 text-center text-lg font-black uppercase text-foreground shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-colors hover:border-primary md:px-8"
                  data-testid={`badge-payment-${method.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {method}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-normal mb-8">
            Ready to hire?
          </h2>
          <Button
            asChild
            size="lg"
            className="h-16 w-full rounded-md border-4 border-foreground bg-primary px-8 text-base font-black uppercase tracking-normal text-foreground shadow-[8px_8px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-primary hover:shadow-[3px_3px_0px_0px_#000] sm:w-auto md:h-18 md:px-16 md:text-xl"
            data-testid="btn-rentals-showroom"
          >
            <Link href="/showroom#rental-booking">
              Book Rental <WhatsAppIcon mono className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
