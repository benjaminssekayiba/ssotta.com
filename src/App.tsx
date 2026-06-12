import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Bikes from "@/pages/Bikes";
import Parts from "@/pages/Parts";
import Rentals from "@/pages/Rentals";
import Repairs from "@/pages/Repairs";
import Showroom from "@/pages/Showroom";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/not-found";
import { RouteSeo } from "@/components/seo/RouteSeo";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";

const queryClient = new QueryClient();

function ScrollRestoration() {
  const [location] = useLocation();

  useEffect(() => {
    let frameOne = 0;
    let frameTwo = 0;
    const timeoutIds: number[] = [];

    const scrollToCurrentRoute = () => {
      const hash = window.location.hash;

      if (hash) {
        const id = decodeURIComponent(hash.slice(1));
        let target: HTMLElement | null = document.getElementById(id);

        if (!target) {
          try {
            const selected = document.querySelector(hash);
            target = selected instanceof HTMLElement ? selected : null;
          } catch {
            target = null;
          }
        }

        if (target) {
          const navHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 88;
          const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
          window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: "auto" });
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    const queueScrollChecks = () => {
      scrollToCurrentRoute();
      frameTwo = window.requestAnimationFrame(scrollToCurrentRoute);

      [80, 260, 520].forEach((delay) => {
        timeoutIds.push(window.setTimeout(scrollToCurrentRoute, delay));
      });
    };

    frameOne = window.requestAnimationFrame(queueScrollChecks);
    window.addEventListener("hashchange", scrollToCurrentRoute);

    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
      timeoutIds.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("hashchange", scrollToCurrentRoute);
    };
  }, [location]);

  return null;
}
function AnimatedRoutes() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      >
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/bikes" component={Bikes} />
          <Route path="/parts" component={Parts} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/repairs" component={Repairs} />
          <Route path="/showroom" component={Showroom} />
          <Route path="/privacy" component={Privacy} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <LocalBusinessSchema />
      <RouteSeo />
      <GoogleAnalytics />
      <GrainOverlay />
      <WhatsAppButton />
      <ScrollRestoration />
      <Navbar />
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppLayout />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
