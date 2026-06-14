import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const brand = {
  orange: "#ff5a2c",
  orangeSoft: "rgba(255,90,44,.18)",
  black: "#101010",
  ink: "#171717",
  cream: "#faf7f1",
  muted: "rgba(250,247,241,.70)",
  mono: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace",
  sans: "Sora, Arial, sans-serif",
};

const SCENE_FRAMES = 140;
const TOTAL_FRAMES = 1260;

const storyScenes = [
  {
    kicker: "01 / Customer question",
    title: "Egaali yo namu? Okakasa?",
    body:
      "Most riders just want certainty: the right bike, the right size, the right part, and a shop that answers fast.",
    image: "kids-riding-uganda-01.png",
    accent: "Start with confidence",
    notes: ["Kids bikes", "Adult bikes", "Spare parts", "Repairs"],
  },
  {
    kicker: "02 / Bike fitting",
    title: "Pick the right bicycle before you pay.",
    body:
      "Compare kids bikes, commuter bikes, carrier bicycles, mountain bikes, and geared bikes before you pay.",
    image: "video-assets/kids-bikes.png",
    accent: "Fit, budget, use",
    notes: ["Size checked", "Budget noted", "Use-case matched"],
  },
  {
    kicker: "03 / Parts stock",
    title: "All bicycle parts in one place.",
    body:
      "Brakes, chains, tyres, tubes, wheels, bearings, cables, saddles, racks, tools, and service spares are organised for quick fitment checks.",
    image: "video-assets/spare-parts.png",
    accent: "Retail parts supply",
    notes: ["Name the part", "Show a photo", "Confirm fitment"],
  },
  {
    kicker: "04 / Wholesale supply",
    title: "Mechanics and shops can buy bulk.",
    body:
      "Repair workshops, bicycle shops, rental fleets, schools, and delivery operators can request mixed cartons and repeat stock supply.",
    image: "video-assets/drivetrain-chain.jpg",
    accent: "Business orders welcome",
    notes: ["Bulk stock", "Repeat supply", "Workshop support"],
  },
  {
    kicker: "05 / Repair booking",
    title: "Describe the fault. Get clear action.",
    body:
      "Book puncture repair, brake adjustment, gear tuning, wheel truing, full service, or custom build work before coming in.",
    image: "video-assets/workshop-tools.jpg",
    accent: "3 mechanics on-site",
    notes: ["Issue captured", "Day selected", "WhatsApp sent"],
  },
  {
    kicker: "06 / Rentals",
    title: "Daily and weekly bicycle hire.",
    body:
      "Rental requests help the shop prepare the right ride for errands, practice, deliveries, weekend movement, or flexible city use.",
    image: "video-assets/showroom.png",
    accent: "Book before travel",
    notes: ["Daily hire", "Weekend hire", "Weekly hire"],
  },
  {
    kicker: "07 / Booking logic",
    title: "One clean request. One booking ID.",
    body:
      "Bike, part, wholesale, repair, and rental forms save a clear request and open WhatsApp with the important details ready.",
    image: null,
    accent: "+256 757 432 917",
    notes: ["Choose form", "Add details", "Save ID", "Send WhatsApp"],
  },
  {
    kicker: "08 / Contact us",
    title: "Contact the shop before you move.",
    body:
      "WhatsApp, call, or open maps for Bwayise / Kawaala / Kazo Junction. Send the request details and arrive prepared.",
    image: "video-assets/workshop.png",
    accent: "WhatsApp +256 757 432 917",
    notes: ["WhatsApp us", "Call the shop", "Open maps"],
  },
  {
    kicker: "09 / Launch message",
    title: "Ssotta. Egaali ennamu.",
    body:
      "A professional bicycle shop experience for Kampala: bikes, parts, wholesale supply, rentals, repairs, and showroom support.",
    image: "kids-riding-uganda-02.png",
    accent: "Ready to launch",
    notes: ["Choose", "Book", "Contact", "Ride"],
  },
];

function ease(frame: number, input: [number, number], output: [number, number]) {
  return interpolate(frame, input, output, {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function TypewriterText({
  text,
  start = 18,
  charsPerFrame = 1.6,
  style,
}: {
  text: string;
  start?: number;
  charsPerFrame?: number;
  style?: CSSProperties;
}) {
  const frame = useCurrentFrame();
  const visibleChars = Math.max(0, Math.min(text.length, Math.floor((frame - start) * charsPerFrame)));
  const cursorOpacity = Math.floor(frame / 12) % 2 === 0 ? 1 : 0.25;

  return (
    <span style={style}>
      {text.slice(0, visibleChars)}
      <span style={{ color: brand.orange, opacity: visibleChars < text.length ? cursorOpacity : 0 }}>|</span>
    </span>
  );
}

function ProgressRail() {
  const frame = useCurrentFrame();
  const width = interpolate(frame, [0, TOTAL_FRAMES], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 36,
        right: 36,
        bottom: 24,
        height: 8,
        border: "2px solid rgba(250,247,241,.18)",
        backgroundColor: "rgba(250,247,241,.08)",
      }}
    >
      <div style={{ width: `${width}%`, height: "100%", backgroundColor: brand.orange }} />
    </div>
  );
}

function BottomTicker() {
  const frame = useCurrentFrame();
  const x = interpolate(frame % 360, [0, 360], [0, -580], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const text =
    "BIKES - SPARE PARTS - WHOLESALE SUPPLY - REPAIRS - RENTALS - CONTACT +256 757 432 917 - WHATSAPP BOOKING - ";

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 42,
        overflow: "hidden",
        borderTop: "2px solid rgba(250,247,241,.14)",
        borderBottom: "2px solid rgba(250,247,241,.14)",
        background: "rgba(16,16,16,.70)",
      }}
    >
      <div
        style={{
          transform: `translateX(${x}px)`,
          whiteSpace: "nowrap",
          color: brand.cream,
          fontFamily: brand.mono,
          fontSize: 17,
          fontWeight: 900,
          padding: "8px 0",
        }}
      >
        {text.repeat(8)}
      </div>
    </div>
  );
}

function NoteCards({ notes }: { notes: string[] }) {
  const frame = useCurrentFrame();

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {notes.map((note, index) => {
        const appear = ease(frame, [28 + index * 10, 52 + index * 10], [0, 1]);

        return (
          <div
            key={note}
            style={{
              opacity: appear,
              transform: `translateX(${(1 - appear) * 46}px) rotate(${(1 - appear) * 2}deg)`,
              background: index === 1 ? brand.orange : "rgba(250,247,241,.08)",
              color: index === 1 ? brand.black : brand.cream,
              border: `2px solid ${index === 1 ? brand.orange : "rgba(250,247,241,.18)"}`,
              boxShadow: "8px 8px 0 rgba(0,0,0,.25)",
              padding: "16px 18px",
              fontFamily: brand.mono,
              fontSize: 19,
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            {String(index + 1).padStart(2, "0")} / {note}
          </div>
        );
      })}
    </div>
  );
}

function PhotoScene({
  scene,
  index,
}: {
  scene: (typeof storyScenes)[number];
  index: number;
}) {
  const frame = useCurrentFrame();
  const imageScale = interpolate(frame, [0, SCENE_FRAMES], [1.08, 1.01], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const enter = ease(frame, [0, 34], [0, 1]);
  const titleMask = ease(frame, [8, 34], [100, 0]);
  const accent = ease(frame, [76, 104], [0, 1]);
  const sideShift = index % 2 === 0 ? -32 : 32;

  return (
    <AbsoluteFill style={{ backgroundColor: brand.black }}>
      {scene.image ? (
        <Img
          src={staticFile(scene.image)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imageScale}) translateX(${sideShift * (1 - imageScale)}px)`,
            filter: "saturate(1.04) contrast(1.08)",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at 76% 22%, rgba(255,90,44,.35), transparent 30%), linear-gradient(135deg, #101010, #2a211c)",
          }}
        />
      )}

      <AbsoluteFill
        style={{
          background:
            index % 2 === 0
              ? "linear-gradient(90deg, rgba(16,16,16,.96), rgba(16,16,16,.74) 52%, rgba(16,16,16,.16))"
              : "linear-gradient(270deg, rgba(16,16,16,.96), rgba(16,16,16,.72) 52%, rgba(16,16,16,.12))",
        }}
      />

      <AbsoluteFill style={{ padding: "64px 72px 92px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: index % 2 === 0 ? "1.05fr .75fr" : ".75fr 1.05fr",
            gap: 56,
            height: "100%",
            alignItems: "center",
          }}
        >
          {index % 2 === 1 && <NoteCards notes={scene.notes} />}
          <div
            style={{
              opacity: enter,
              transform: `translateY(${(1 - enter) * 32}px)`,
              maxWidth: 760,
            }}
          >
            <div
              style={{
                color: brand.orange,
                fontFamily: brand.mono,
                fontSize: 22,
                fontWeight: 900,
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              {scene.kicker}
            </div>

            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  transform: `translateY(${titleMask}%)`,
                  color: brand.cream,
                  fontFamily: brand.sans,
                  fontSize: 76,
                  lineHeight: 0.94,
                  fontWeight: 900,
                  textTransform: "uppercase",
                }}
              >
                {scene.title}
              </div>
            </div>

            <div
              style={{
                marginTop: 28,
                minHeight: 142,
                color: brand.muted,
                fontFamily: brand.mono,
                fontSize: 23,
                lineHeight: 1.34,
                fontWeight: 700,
                textTransform: "uppercase",
                maxWidth: 690,
              }}
            >
              <TypewriterText text={scene.body} start={28} charsPerFrame={1.8} />
            </div>

            <div
              style={{
                marginTop: 22,
                width: `${interpolate(frame, [38, 78], [0, 360], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}px`,
                height: 8,
                background: brand.orange,
              }}
            />
          </div>
          {index % 2 === 0 && <NoteCards notes={scene.notes} />}
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          top: 44,
          right: 44,
          transform: `translateY(${(1 - accent) * -22}px)`,
          opacity: accent,
          background: brand.orange,
          color: brand.black,
          border: `3px solid ${brand.black}`,
          boxShadow: "8px 8px 0 rgba(0,0,0,.45)",
          padding: "16px 22px",
          fontFamily: brand.mono,
          fontSize: 17,
          fontWeight: 900,
          textTransform: "uppercase",
        }}
      >
        {scene.accent}
      </div>
    </AbsoluteFill>
  );
}


function WhatsAppGlyph({ size = 76 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect width="64" height="64" rx="18" fill="#25D366" />
      <path fill="#fff" d="M32 12.5c-10.8 0-19.6 8.4-19.6 18.8 0 3.4 1 6.7 2.8 9.5L12.8 52l11.6-2.9c2.4 1.2 5 1.9 7.6 1.9 10.8 0 19.6-8.4 19.6-18.8S42.8 12.5 32 12.5Zm0 34.4c-2.3 0-4.5-.6-6.5-1.8l-.8-.4-6.8 1.7 1.8-6.4-.5-.8c-1.4-2.3-2.1-5-2.1-7.8 0-8.2 6.7-14.9 14.9-14.9s14.9 6.7 14.9 14.9S40.2 46.9 32 46.9Z" />
      <path fill="#25D366" d="M40.7 35.8c-.5-.3-3.1-1.5-3.6-1.7-.5-.2-.9-.3-1.2.3-.4.5-1.4 1.7-1.7 2.1-.3.4-.6.4-1.2.1-.5-.3-2.2-.8-4.1-2.5-1.5-1.3-2.6-3-2.9-3.5-.3-.5 0-.8.2-1.1.2-.2.5-.6.8-.9.3-.3.4-.5.5-.9.2-.4.1-.7 0-1-.1-.3-1.2-2.9-1.7-4-.4-1.1-.9-.9-1.2-.9h-1c-.4 0-1 .1-1.5.7-.5.5-2 1.9-2 4.7s2 5.4 2.3 5.8c.3.4 4 6.1 9.8 8.4 1.4.6 2.4.9 3.3 1.1 1.4.4 2.6.3 3.6.2 1.1-.2 3.1-1.3 3.6-2.5.4-1.2.4-2.3.3-2.5-.2-.3-.6-.5-1.3-.8Z" />
    </svg>
  );
}

function PhoneGlyph({ size = 76 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect width="64" height="64" rx="18" fill="#1ec75d" />
      <path fill="#fff" d="M43.8 39.6c-1.6-1.3-3.5-2.4-5.3-3.3-1.4-.7-2.7-.4-3.6.8l-1.4 1.8c-.5.7-1.4.9-2.2.6-3.9-1.6-7-4.7-8.6-8.6-.3-.8-.1-1.7.6-2.2l1.8-1.4c1.2-.9 1.5-2.2.8-3.6-.9-1.8-2-3.7-3.3-5.3-1-1.2-2.6-1.6-4-.9l-3.2 1.5c-1.4.7-2.2 2.2-1.9 3.7 1.8 12.3 11.5 22 23.8 23.8 1.5.2 3-.6 3.7-1.9l1.5-3.2c.7-1.4.3-3-1-4Z" />
    </svg>
  );
}

function MapGlyph({ size = 76 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect width="64" height="64" rx="18" fill="#fff" />
      <path fill="#34a853" d="M14 46.5 31 14l8 11-16 27H17a3 3 0 0 1-3-3v-2.5Z" />
      <path fill="#fbbc04" d="M39 25 31 14h16a3 3 0 0 1 3 3v12l-11-4Z" />
      <path fill="#4285f4" d="M23 52h24a3 3 0 0 0 3-3V29L39 25 23 52Z" />
      <path fill="#ea4335" d="M32 10c-8.1 0-14.7 6.4-14.7 14.3 0 10.5 14.7 27.7 14.7 27.7s14.7-17.2 14.7-27.7C46.7 16.4 40.1 10 32 10Z" />
      <circle cx="32" cy="24.5" r="5.2" fill="#fff" />
    </svg>
  );
}

function ContactIcon({ kind }: { kind: string }) {
  if (kind === "whatsapp") return <WhatsAppGlyph />;
  if (kind === "phone") return <PhoneGlyph />;
  return <MapGlyph />;
}

function ContactScene({ scene }: { scene: (typeof storyScenes)[number] }) {
  const frame = useCurrentFrame();
  const methods = [
    { kind: "whatsapp", label: "WhatsApp", value: "+256 757 432 917", detail: "Send bike, part, repair, rental, or bulk order details." },
    { kind: "phone", label: "Call", value: "+256 757 432 917", detail: "Speak to the shop before you travel." },
    { kind: "map", label: "Visit", value: "Bwayise / Kawaala", detail: "Kazo Junction, Kampala." },
  ];
  const titleIn = ease(frame, [6, 34], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 18% 16%, rgba(37,211,102,.28), transparent 28%), radial-gradient(circle at 84% 20%, rgba(255,90,44,.38), transparent 32%), linear-gradient(135deg, #101010, #201915)",
        padding: "62px 72px 94px",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: ".95fr 1.05fr", gap: 50, height: "100%", alignItems: "center" }}>
        <div style={{ opacity: titleIn, transform: `translateY(${(1 - titleIn) * 28}px)` }}>
          <div style={{ color: brand.orange, fontFamily: brand.mono, fontSize: 22, fontWeight: 900, textTransform: "uppercase" }}>
            {scene.kicker}
          </div>
          <div
            style={{
              marginTop: 20,
              color: brand.cream,
              fontFamily: brand.sans,
              fontSize: 74,
              lineHeight: 0.94,
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            {scene.title}
          </div>
          <div
            style={{
              marginTop: 28,
              minHeight: 126,
              color: brand.muted,
              fontFamily: brand.mono,
              fontSize: 22,
              lineHeight: 1.34,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            <TypewriterText text={scene.body} start={18} charsPerFrame={1.55} />
          </div>
          <div
            style={{
              marginTop: 22,
              display: "inline-flex",
              background: brand.orange,
              color: brand.black,
              border: `3px solid ${brand.black}`,
              boxShadow: "8px 8px 0 rgba(0,0,0,.42)",
              padding: "16px 22px",
              fontFamily: brand.mono,
              fontSize: 18,
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Contact us before you come
          </div>
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          {methods.map((method, index) => {
            const appear = ease(frame, [22 + index * 12, 54 + index * 12], [0, 1]);

            return (
              <div
                key={method.label}
                style={{
                  opacity: appear,
                  transform: `translateX(${(1 - appear) * 72}px) scale(${0.96 + appear * 0.04})`,
                  display: "grid",
                  gridTemplateColumns: "92px 1fr",
                  alignItems: "center",
                  gap: 22,
                  background: index === 0 ? "#25D366" : "rgba(250,247,241,.08)",
                  color: index === 0 ? brand.black : brand.cream,
                  border: `3px solid ${index === 0 ? "#25D366" : "rgba(250,247,241,.18)"}`,
                  boxShadow: "10px 10px 0 rgba(0,0,0,.35)",
                  padding: "18px 22px",
                }}
              >
                <ContactIcon kind={method.kind} />
                <div>
                  <div style={{ fontFamily: brand.sans, fontSize: 31, fontWeight: 900, textTransform: "uppercase" }}>
                    {method.label}
                  </div>
                  <div style={{ marginTop: 4, fontFamily: brand.mono, fontSize: 20, fontWeight: 900, textTransform: "uppercase" }}>
                    {method.value}
                  </div>
                  <div style={{ marginTop: 5, fontFamily: brand.mono, fontSize: 13, fontWeight: 800, opacity: 0.72, textTransform: "uppercase" }}>
                    {method.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}
function BookingLogicScene({ scene, index }: { scene: (typeof storyScenes)[number]; index: number }) {
  const frame = useCurrentFrame();
  const steps = ["Bike", "Part", "Wholesale", "Repair", "Rental"];

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 70% 18%, rgba(255,90,44,.35), transparent 30%), linear-gradient(135deg, #111, #211915)",
        padding: "62px 72px 94px",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: ".95fr 1.05fr", gap: 48, height: "100%", alignItems: "center" }}>
        <div>
          <div style={{ color: brand.orange, fontFamily: brand.mono, fontSize: 22, fontWeight: 900, textTransform: "uppercase" }}>
            {scene.kicker}
          </div>
          <div
            style={{
              marginTop: 20,
              color: brand.cream,
              fontFamily: brand.sans,
              fontSize: 78,
              lineHeight: 0.94,
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            {scene.title}
          </div>
          <div
            style={{
              marginTop: 28,
              minHeight: 150,
              color: brand.muted,
              fontFamily: brand.mono,
              fontSize: 23,
              lineHeight: 1.34,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            <TypewriterText text={scene.body} start={18} charsPerFrame={1.7} />
          </div>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          {steps.map((step, stepIndex) => {
            const progress = ease(frame, [14 + stepIndex * 11, 46 + stepIndex * 11], [0, 1]);
            const isWholesale = step === "Wholesale";
            return (
              <div
                key={step}
                style={{
                  opacity: progress,
                  transform: `translateX(${(1 - progress) * 64}px)`,
                  border: `3px solid ${isWholesale ? brand.orange : "rgba(250,247,241,.18)"}`,
                  background: isWholesale ? brand.orange : "rgba(250,247,241,.07)",
                  color: isWholesale ? brand.black : brand.cream,
                  boxShadow: "10px 10px 0 rgba(0,0,0,.34)",
                  padding: "20px 24px",
                  display: "grid",
                  gridTemplateColumns: "86px 1fr",
                  alignItems: "center",
                  gap: 18,
                }}
              >
                <div style={{ fontFamily: brand.sans, fontSize: 42, fontWeight: 900 }}>
                  {String(stepIndex + 1).padStart(2, "0")}
                </div>
                <div>
                  <div style={{ fontFamily: brand.mono, fontSize: 23, fontWeight: 900, textTransform: "uppercase" }}>
                    {step} request
                  </div>
                  <div style={{ fontFamily: brand.mono, fontSize: 14, fontWeight: 800, opacity: 0.68, textTransform: "uppercase", marginTop: 4 }}>
                    Saved ID - WhatsApp-ready message
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          bottom: 76,
          height: 4,
          background: `linear-gradient(90deg, ${brand.orange}, rgba(250,247,241,.20))`,
          transform: `scaleX(${ease(frame, [32, 116], [0, 1])})`,
          transformOrigin: "left center",
        }}
      />
    </AbsoluteFill>
  );
}

function AudioBed() {
  const { fps } = useVideoConfig();
  return (
    <Audio
      src={staticFile("audio/sunborn-vacation.mp3")}
      volume={(frame) =>
        interpolate(frame, [0, fps * 2, TOTAL_FRAMES - fps * 2, TOTAL_FRAMES], [0, 0.28, 0.28, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      }
    />
  );
}

export function SsottaExplainer() {
  return (
    <AbsoluteFill style={{ backgroundColor: brand.black }}>
      <AudioBed />
      {storyScenes.map((scene, index) => (
        <Sequence key={scene.kicker} from={index * SCENE_FRAMES} durationInFrames={SCENE_FRAMES} premountFor={30}>
          {index === 6 ? <BookingLogicScene scene={scene} index={index} /> : index === 7 ? <ContactScene scene={scene} /> : <PhotoScene scene={scene} index={index} />}
        </Sequence>
      ))}
      <BottomTicker />
      <ProgressRail />
    </AbsoluteFill>
  );
}