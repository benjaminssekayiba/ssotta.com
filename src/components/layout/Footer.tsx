import { Link } from "wouter";
import { Clock } from "lucide-react";
import { GoogleMapsIcon, PhoneAppIcon, WhatsAppIcon } from "@/components/icons/app-icons";
import ssottaWordmark from "@/assets/brand/ssotta-wordmark.png";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 lg:py-24 border-t-8 border-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">

          <div>
            <Link href="/" className="mb-1 inline-flex flex-col" aria-label="Ssotta Bicycle Shop home">
              <img
                src={ssottaWordmark}
                alt="Ssotta Bicycle Shop"
                className="h-10 w-[220px] object-contain object-left drop-shadow-sm md:h-12 md:w-[270px]"
              />
              <span className="mt-[-2px] text-[10px] font-mono font-bold uppercase tracking-normal text-primary">
                Egaali Ennamu
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Bicycles, spare parts, repairs, rentals, and wholesale supply from our showroom in Bwayise, Kawaala, Kazo Junction, Kampala.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold uppercase mb-6 text-white border-b border-background/20 pb-4">Shop</h3>
            <ul className="space-y-4 font-sans text-muted-foreground">
              <li><Link href="/bikes" className="hover:text-primary transition-colors">Shop Bikes</Link></li>
              <li><Link href="/parts" className="hover:text-primary transition-colors">Spare Parts</Link></li>
              <li><Link href="/rentals" className="hover:text-primary transition-colors">Rentals</Link></li>
              <li><Link href="/repairs" className="hover:text-primary transition-colors">Repairs</Link></li>
              <li><Link href="/showroom" className="hover:text-primary transition-colors">Showroom</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold uppercase mb-6 text-white border-b border-background/20 pb-4">Find Us</h3>
            <ul className="space-y-4 font-sans text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <GoogleMapsIcon size={17} className="mt-0.5 shrink-0" />
                <span>Bwayise, Kawaala, Kazo Junction, Kampala</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneAppIcon size={17} className="shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+256757432917" className="hover:text-primary transition-colors">+256 757 432 917</a>
                  <a href="tel:+256750439085" className="hover:text-primary transition-colors">+256 750 439 085</a>
                  <a href="tel:+256778577085" className="hover:text-primary transition-colors">+256 778 577 085</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppIcon size={17} className="shrink-0" />
                <a
                  href="https://wa.me/256757432917"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  WhatsApp: +256 757 432 917
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={15} className="text-primary shrink-0" />
                <span>Mon-Sat 8am-6pm / Sun 10am-4pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-xs text-muted-foreground uppercase">
          <p>(c) 2026 Ssotta Bicycle Shop / Bwayise, Kawaala, Kampala</p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-end">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <a href="tel:+256757432917" className="hover:text-primary transition-colors">Call</a>
            <a
              href="https://wa.me/256757432917"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://maps.google.com/?q=Bwayise+Kawaala+Kampala"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Map
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
