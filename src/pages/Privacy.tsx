import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Privacy() {
  return (
    <div className="bg-background min-h-screen pt-20" data-testid="page-privacy">
      <section className="border-b-4 border-primary bg-foreground px-6 py-14 text-background md:px-12 md:py-20">
        <div className="mx-auto max-w-screen-xl">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-normal text-primary">Legal</p>
          <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-none tracking-normal">
            Privacy Policy
          </h1>
        </div>
      </section>

      <section className="px-6 py-14 md:px-12 md:py-20">
        <div className="prose prose-neutral mx-auto max-w-3xl font-sans">
          <p className="text-muted-foreground leading-relaxed">
            Ssotta Bicycle Shop uses this website to help customers browse bicycles, spare parts, repairs,
            rentals, and showroom services. When you submit a booking or request form, we collect the details
            you enter, such as your name, phone number, and request information.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Requests are saved in your browser on your device so you can review recent submissions on the
            Showroom page. When you continue to WhatsApp, the same request details are sent in your message
            to our shop number so we can respond.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We use your contact details only to respond to your enquiry, confirm stock or fitment, arrange
            repairs or rentals, and provide customer support. We do not sell your personal information.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If you call, visit, or message us directly, we may keep your contact details for follow-up and
            service records in the normal course of running the shop.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For questions about this policy, contact us at{" "}
            <a href="tel:+256757432917" className="text-primary hover:underline">
              +256 757 432 917
            </a>{" "}
            or{" "}
            <a
              href="https://wa.me/256757432917"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              WhatsApp
            </a>
            .
          </p>
          <p className="text-sm text-muted-foreground">Last updated: June 2026</p>
        </div>
      </section>

      <section className="border-t border-foreground/10 px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-3xl justify-center">
          <Button asChild size="lg" className="rounded-md uppercase font-bold">
            <Link href="/">Back to Shop</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
