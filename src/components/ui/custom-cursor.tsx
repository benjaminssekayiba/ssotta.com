import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 70 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 70 });

  const ringX = useSpring(mouseX, { stiffness: 140, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 140, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const el = e.target as HTMLElement;
      setIsHovering(
        !!el.closest('a, button, [role="button"], input, select, label, textarea, [data-cursor="hover"]')
      );
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] hidden lg:block">
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ left: dotX, top: dotY, width: 8, height: 8 }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      />
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary"
        style={{ left: ringX, top: ringY }}
        animate={{
          width: isHovering ? 52 : 34,
          height: isHovering ? 52 : 34,
          opacity: isHovering ? 0.55 : 1,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
      />
    </div>
  );
}
