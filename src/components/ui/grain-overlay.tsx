export function GrainOverlay() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[9000] h-full w-full opacity-[0.045]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <filter id="ssotta-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.68"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#ssotta-grain)" />
    </svg>
  );
}
