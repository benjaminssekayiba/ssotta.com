import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import workshopImg from "@/assets/workshop.png";

const services = [
  { num: "01", name: "Full Service Overhaul", desc: "Cables, brakes, gears, wheels, and safety checks in one workshop service." },
  { num: "02", name: "Puncture Repair", desc: "Tube replacement or patching with common sizes ready." },
  { num: "03", name: "Brake Adjustment", desc: "Pads, cable tension, lever feel, and stopping power checked together." },
  { num: "04", name: "Gear Tuning", desc: "Derailleur alignment, shifter indexing, and smoother shifting." },
  { num: "05", name: "Wheel Truing", desc: "Spoke tension balanced so the wheel runs straight." },
  { num: "06", name: "Custom Builds", desc: "Parts-backed builds and upgrades for riders who want a specific setup." },
];

const trust = [
  { stat: "3", label: "Mechanics", sub: "On-site support" },
  { stat: "Same-day", label: "Assessment", sub: "For common repairs" },
  { stat: "100%", label: "Fitment Checked", sub: "Parts matched to bike" },
];

export default function Repairs() {
  return (
    <div className="bg-background min-h-screen pt-20" data-testid="page-repairs">
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[400px] overflow-hidden border-b-8 border-primary">
        <motion.img
          src={workshopImg}
          alt="Ssotta workshop"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "linear" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/60 to-foreground/20" />

        <div className="absolute inset-0 flex items-end pb-14 md:pb-20 px-6 md:px-12">
          <div className="max-w-screen-xl w-full mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-primary font-bold uppercase tracking-normal mb-4"
            >
              Repairs & Workshop
            </motion.p>
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-[clamp(3rem,10vw,8rem)] font-black uppercase tracking-normal leading-none text-white">
                Book a <span className="text-primary">Repair</span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-foreground text-background border-b-4 border-primary">
        <div className="max-w-screen-xl mx-auto flex flex-wrap">
          {trust.map(({ stat, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex-1 min-w-[160px] py-12 px-8 border-r border-background/15 last:border-r-0 text-center"
              data-testid={`trust-${label.toLowerCase().replace(/\s+/g,'-')}`}
            >
              <div className="text-4xl md:text-5xl font-black text-primary mb-1">{stat}</div>
              <div className="font-black uppercase text-sm tracking-normal mb-1">{label}</div>
              <div className="font-sans text-xs text-background/40 uppercase tracking-normal">{sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services list */}
      <section className="py-24 lg:py-36 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-normal mb-14"
          >
            Repairs We Handle
          </motion.h2>

          <div className="border-t-4 border-foreground">
            {services.map((service, i) => (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="group grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr_1.5fr] gap-x-6 gap-y-3 md:gap-x-12 py-8 border-b-2 border-foreground/15 hover:border-primary transition-colors items-start"
                data-testid={`service-${service.num}`}
              >
                <span className="font-mono text-xs text-primary font-bold pt-1">{service.num}</span>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-normal group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="col-start-2 md:col-start-auto font-sans text-muted-foreground text-sm leading-relaxed pt-0 md:pt-1">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA block */}
      <section className="bg-primary py-24 px-6 border-t-4 border-foreground">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs text-foreground/60 uppercase tracking-normal font-bold mb-2">Need Service?</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-normal text-foreground leading-none">
              Book a<br />Repair
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <p className="font-sans text-foreground/70 max-w-xs text-sm md:text-base uppercase font-bold">
              Send the issue first or visit the showroom. We confirm likely cost, parts, and timing before work begins.
            </p>
            <Button
              asChild
              size="lg"
              className="w-fit rounded-md bg-foreground text-background hover:bg-foreground font-black text-lg uppercase tracking-normal h-16 px-12 border-0 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.25)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.25)] hover:translate-x-1 hover:translate-y-1 transition-all"
              data-testid="btn-book-repair"
            >
              <Link href="/showroom#repair-booking">
                Book Repair <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
