import { useEffect } from "react";

const SITE_NAME = "Ssotta Bicycle Shop";

const DEFAULT_TITLE =
  "Ssotta Bicycle Shop | Bicycles for Sale, Parts, Repairs & Rentals in Kampala";

const DEFAULT_DESCRIPTION =
  "Buy kids and adult bicycles at Ssotta Bicycle Shop in Bwayise and Kawaala. Shop spare parts, book repairs, rent bicycles, and request wholesale supply with mechanic-supported fitment.";

const OG_DESCRIPTION =
  "Bicycles for sale, spare parts, repairs, rentals, and wholesale supply in Bwayise, Kawaala, Kampala.";

export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

export const SITE = {
  name: SITE_NAME,
  url: SITE_URL,
  defaultTitle: DEFAULT_TITLE,
  defaultDescription: DEFAULT_DESCRIPTION,
  ogDescription: OG_DESCRIPTION,
  ogImagePath: "/opengraph.png",
  locale: "en_UG",
  phone: "+256757432917",
  phones: ["+256757432917", "+256750439085", "+256778577085"],
  address: {
    streetAddress: "Bwayise, Kawaala, Kazo Junction",
    addressLocality: "Kampala",
    addressCountry: "UG",
  },
  geo: {
    latitude: 0.3476,
    longitude: 32.5825,
  },
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "18:00" },
    { days: ["Sunday"], opens: "10:00", closes: "16:00" },
  ],
} as const;

export type PageMeta = {
  title?: string;
  description?: string;
  path: string;
  noIndex?: boolean;
};

export const PAGE_META: Record<string, PageMeta> = {
  "/": {
    description: DEFAULT_DESCRIPTION,
    path: "/",
  },
  "/bikes": {
    title: "Bicycles for Sale",
    description:
      "Shop kids, carrier, mountain, geared, and checked used bicycles at Ssotta in Bwayise and Kawaala, Kampala.",
    path: "/bikes",
  },
  "/parts": {
    title: "Spare Parts",
    description:
      "Brakes, drivetrain, tyres, tubes, lights, frames, and workshop parts with mechanic fitment support in Kampala.",
    path: "/parts",
  },
  "/rentals": {
    title: "Bicycle Rentals",
    description:
      "Rent commuter, carrier, and mountain bicycles daily or weekly from Ssotta Bicycle Shop in Kampala.",
    path: "/rentals",
  },
  "/repairs": {
    title: "Repairs & Workshop",
    description:
      "Book puncture repair, brake tuning, gear service, wheel truing, and full overhauls with Ssotta mechanics.",
    path: "/repairs",
  },
  "/showroom": {
    title: "Showroom & Bookings",
    description:
      "Visit Ssotta in Bwayise, Kawaala. Reserve bikes, request parts, book repairs, rentals, or wholesale supply.",
    path: "/showroom",
  },
  "/privacy": {
    title: "Privacy Policy",
    description: "How Ssotta Bicycle Shop handles booking requests and contact information shared on this website.",
    path: "/privacy",
    noIndex: true,
  },
};

function absoluteUrl(path: string) {
  if (SITE.url) return `${SITE.url}${path}`;
  if (typeof window !== "undefined") return `${window.location.origin}${path}`;
  return path;
}

function setMeta(name: string, content: string, attribute: "name" | "property" = "name") {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setLink(rel: string, href: string | null) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!href) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    const pageTitle = meta.title ? `${meta.title} | ${SITE_NAME}` : DEFAULT_TITLE;
    const description = meta.description ?? DEFAULT_DESCRIPTION;
    const canonical = absoluteUrl(meta.path);
    const image = absoluteUrl(SITE.ogImagePath);
    const robots = meta.noIndex ? "noindex, follow" : "index, follow";

    document.title = pageTitle;
    setMeta("description", description);
    setMeta("robots", robots);
    setMeta("og:title", meta.title ?? SITE_NAME, "property");
    setMeta("og:description", meta.description ?? OG_DESCRIPTION, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:image", image, "property");
    setMeta("og:locale", SITE.locale, "property");
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("og:url", canonical, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", meta.title ?? SITE_NAME);
    setMeta("twitter:description", meta.description ?? OG_DESCRIPTION);
    setMeta("twitter:image", image);
    setLink("canonical", canonical);
  }, [meta.description, meta.noIndex, meta.path, meta.title]);
}

export function getLocalBusinessSchema() {
  const openingHoursSpecification = SITE.hours.map((entry) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: entry.days,
    opens: entry.opens,
    closes: entry.closes,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BicycleStore",
    name: SITE.name,
    description: DEFAULT_DESCRIPTION,
    url: SITE.url || undefined,
    image: SITE.url ? absoluteUrl(SITE.ogImagePath) : SITE.ogImagePath,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.addressLocality,
      addressCountry: SITE.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification,
    areaServed: {
      "@type": "City",
      name: "Kampala",
    },
    sameAs: [`https://wa.me/${SITE.phone.replace(/\D/g, "")}`],
  };
}

export const SITEMAP_ROUTES = Object.values(PAGE_META)
  .filter((page) => !page.noIndex)
  .map((page) => page.path);
