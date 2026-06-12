import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-foreground text-background min-h-[80vh] flex flex-col items-center justify-center px-4" data-testid="page-not-found">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-[12rem] md:text-[20rem] font-black uppercase tracking-normal leading-none text-primary">
          404
        </h1>
        <p className="text-3xl md:text-5xl font-mono uppercase font-bold mb-12 border-b-4 border-background/20 pb-8">
          Lost in the dust.
        </p>
        <Button asChild size="lg" className="rounded-md text-2xl h-20 px-16 border-4 border-background bg-transparent text-background hover:bg-background hover:text-foreground shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:translate-y-2 hover:translate-x-2 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all">
          <Link href="/">Back to Shop</Link>
        </Button>
      </motion.div>
    </div>
  );
}
