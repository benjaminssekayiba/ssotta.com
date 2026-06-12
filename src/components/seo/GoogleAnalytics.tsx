import { useEffect } from "react";
import { useLocation } from "wouter";
import { initAnalytics, trackPageView } from "@/lib/analytics";

export function GoogleAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const path = location.split("#")[0] || "/";
    trackPageView(path);
  }, [location]);

  return null;
}
