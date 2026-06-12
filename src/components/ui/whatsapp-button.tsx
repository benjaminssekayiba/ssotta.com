import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/app-icons";

const WHATSAPP_NUMBER = "256757432917";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Ssotta! I would like to enquire about bicycles / parts / repairs / rentals."
);

export function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Ssotta on WhatsApp"
      className="fixed bottom-5 right-5 z-[9990] flex h-14 items-center gap-3 rounded-full border-2 border-white/70 bg-[#25D366] px-5 text-sm font-black uppercase tracking-normal text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      data-testid="btn-whatsapp"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <WhatsAppIcon size={24} mono className="text-white" />
      </motion.div>
      <span className="hidden sm:inline">WhatsApp Us</span>
    </motion.a>
  );
}