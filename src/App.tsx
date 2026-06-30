import { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RouteSeo } from "@/components/seo/RouteSeo";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { LoadingScreen } from "@/components/ui/loading-screen";

const Home = lazy(() => import("@/pages/Home"));
const Bikes = lazy(() => import("@/pages/Bikes"));
const Parts = lazy(() => import("@/pages/Parts"));
const Rentals = lazy(() => import("@/pages/Rentals"));
const Repairs = lazy(() => import("@/pages/Repairs"));
const Showroom = lazy(() => import("@/pages/Showroom"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const NotFound = lazy(() => import("@/pages/not-found"));


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
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="h-10 w-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" /></div>}>
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
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[999] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:font-bold focus:text-foreground">
        Skip to main content
      </a>
      <LocalBusinessSchema />
      <RouteSeo />
      <GoogleAnalytics />
      <GrainOverlay />
      <CustomCursor />
      <WhatsAppButton />
      <ScrollToTop />
      <ScrollRestoration />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="flex-1">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingScreen />
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
