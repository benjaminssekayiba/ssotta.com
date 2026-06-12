import { useLocation } from "wouter";
import { PAGE_META, usePageMeta } from "@/lib/seo";

export function RouteSeo() {
  const [location] = useLocation();
  const path = location.split("#")[0] || "/";
  const meta = PAGE_META[path] ?? {
    title: "Page Not Found",
    description: "The page you requested could not be found at Ssotta Bicycle Shop.",
    path,
    noIndex: true,
  };

  usePageMeta(meta);
  return null;
}
