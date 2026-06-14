import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import showroomImg from "@/assets/showroom.png";
import {
  Bike,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Handshake,
  PackageCheck,
  Wrench,
} from "lucide-react";
import { GoogleMapsIcon, MobileMoneyIcon, PhoneAppIcon, WhatsAppIcon } from "@/components/icons/app-icons";
import {
  type BookingRecord,
  createBooking,
  getBookings,
  openBookingWhatsApp,
} from "@/lib/bookings";

const commonContact = {
  customerName: z.string().min(2, "Name is required"),
  contact: z.string().min(5, "Phone or WhatsApp is required"),
};

const bikeSchema = z.object({
  ...commonContact,
  category: z.string().min(1, "Please select a category"),
  size: z.string().optional(),
  budget: z.string().optional(),
  timing: z.string().min(1, "Please select timing"),
});

const partsSchema = z.object({
  ...commonContact,
  partName: z.string().min(2, "Part name is required"),
  bikeType: z.string().min(2, "Bike type is required"),
  urgency: z.string().min(1, "Please select urgency"),
  notes: z.string().optional(),
});

const repairSchema = z.object({
  ...commonContact,
  service: z.string().min(1, "Please select a repair service"),
  bikeType: z.string().min(2, "Bike type is required"),
  preferredDay: z.string().min(2, "Preferred day is required"),
  issue: z.string().min(8, "Describe the issue briefly"),
});

const rentalSchema = z.object({
  ...commonContact,
  rentalType: z.string().min(1, "Please select a rental type"),
  duration: z.string().min(1, "Please select duration"),
  startDate: z.string().min(2, "Start day is required"),
  purpose: z.string().optional(),
});
const wholesaleSchema = z.object({
  ...commonContact,
  businessName: z.string().min(2, "Business or workshop name is required"),
  businessType: z.string().min(1, "Please select business type"),
  partsList: z.string().min(6, "List the parts you need"),
  quantity: z.string().min(1, "Please select quantity"),
  frequency: z.string().min(1, "Please select supply frequency"),
  delivery: z.string().min(1, "Please select pickup or delivery"),
  notes: z.string().optional(),
});

const bikeDefaults: z.infer<typeof bikeSchema> = {
  customerName: "",
  contact: "",
  category: "",
  size: "",
  budget: "",
  timing: "today",
};

const partsDefaults: z.infer<typeof partsSchema> = {
  customerName: "",
  contact: "",
  partName: "",
  bikeType: "",
  urgency: "today",
  notes: "",
};

const repairDefaults: z.infer<typeof repairSchema> = {
  customerName: "",
  contact: "",
  service: "",
  bikeType: "",
  preferredDay: "Today",
  issue: "",
};

const rentalDefaults: z.infer<typeof rentalSchema> = {
  customerName: "",
  contact: "",
  rentalType: "",
  duration: "daily",
  startDate: "Today",
  purpose: "",
};
const wholesaleDefaults: z.infer<typeof wholesaleSchema> = {
  customerName: "",
  contact: "",
  businessName: "",
  businessType: "",
  partsList: "",
  quantity: "mixed-order",
  frequency: "as-needed",
  delivery: "pickup",
  notes: "",
};

const bikeCategoryLabels: Record<string, string> = {
  kids: "Kids bike",
  carrier: "Mannyi ga Kifuba carrier bike",
  mountain: "Mountain bike",
  used: "Used or pre-owned bike",
  changer: "Changer or geared bike",
};

const rentalTypeLabels: Record<string, string> = {
  commuter: "Daily city commuter",
  cargo: "Carrier / work bicycle",
  mountain: "Mountain trail bike",
  kids: "Kids practice bike",
  weekly: "Weekly hire package",
};

const contacts = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    title: "+256 757 432 917",
    href: "https://wa.me/256757432917",
    desc: "Send a bike, part, repair, rental, or wholesale request before you visit.",
    color: "text-[#25D366]",
  },
  {
    icon: PhoneAppIcon,
    label: "Phone",
    title: "+256 757 432 917",
    href: "tel:+256757432917",
    desc: "Call for stock, prices, directions, or booking help.",
    color: "text-primary",
  },
  {
    icon: GoogleMapsIcon,
    label: "Location",
    title: "Bwayise, Kawaala",
    href: "https://maps.google.com/?q=Bwayise+Kawaala+Kampala",
    desc: "Kazo Junction, Kampala, Uganda. Call if you need directions.",
    color: "text-primary",
  },
  {
    icon: Clock,
    label: "Hours",
    title: "Mon-Sat 8am-6pm",
    href: undefined,
    desc: "Monday to Saturday 8am-6pm. Sunday 10am-4pm.",
    color: "text-primary",
  },
  {
    icon: MobileMoneyIcon,
    label: "Payments",
    title: "Mobile Money / Card / Cash",
    href: undefined,
    desc: "Pay by mobile money, card, or cash at the shop.",
    color: "text-primary",
  },
];

const promises = [
  "Compare bikes, parts, and accessories in person.",
  "Get mechanic support before you buy a part.",
  "Choose from well-stocked kids and adult bicycle options.",
  "Book repairs with clear diagnosis and timing.",
  "Pay by mobile money, card, or cash.",
];

function BookingResult({ booking }: { booking: BookingRecord | null }) {
  if (!booking) return null;

  return (
    <div className="rounded-lg border border-primary/50 bg-primary/10 p-4 text-sm text-background">
      <p className="font-black uppercase text-primary">Request Saved</p>
      <p className="mt-1 font-sans text-background/70">
        Booking ID: <span className="text-background">{booking.id}</span>
      </p>
    </div>
  );
}

function RecentBookings({ bookings }: { bookings: BookingRecord[] }) {
  if (bookings.length === 0) return null;

  return (
    <div className="mt-8 rounded-lg border border-background/15 bg-background/5 p-5">
      <p className="mb-4 font-mono text-xs font-bold uppercase text-primary">
        Saved requests on this device
      </p>
      <div className="space-y-3">
        {bookings.slice(0, 4).map((booking) => (
          <div
            key={booking.id}
            className="flex flex-col gap-1 border-b border-background/10 pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-black uppercase text-background">{booking.summary}</p>
              <p className="font-sans text-xs text-background/45">
                {booking.id} / {booking.type}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="h-9 rounded-md border-background/25 bg-transparent text-background hover:bg-background hover:text-foreground"
              onClick={() => openBookingWhatsApp(booking)}
            >
              Reopen WhatsApp
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Showroom() {
  const { toast } = useToast();
  const [lastBooking, setLastBooking] = useState<BookingRecord | null>(null);
  const [recentBookings, setRecentBookings] = useState<BookingRecord[]>(() =>
    getBookings(),
  );

  const bikeForm = useForm<z.infer<typeof bikeSchema>>({
    resolver: zodResolver(bikeSchema),
    defaultValues: bikeDefaults,
  });

  const partsForm = useForm<z.infer<typeof partsSchema>>({
    resolver: zodResolver(partsSchema),
    defaultValues: partsDefaults,
  });

  const repairForm = useForm<z.infer<typeof repairSchema>>({
    resolver: zodResolver(repairSchema),
    defaultValues: repairDefaults,
  });

  const rentalForm = useForm<z.infer<typeof rentalSchema>>({
    resolver: zodResolver(rentalSchema),
    defaultValues: rentalDefaults,
  });
  const wholesaleForm = useForm<z.infer<typeof wholesaleSchema>>({
    resolver: zodResolver(wholesaleSchema),
    defaultValues: wholesaleDefaults,
  });

  function finishBooking(record: BookingRecord) {
    setLastBooking(record);
    setRecentBookings(getBookings());
    openBookingWhatsApp(record);
    toast({
      title: "Request Saved",
      description: `${record.id} is ready to send on WhatsApp.`,
    });
  }

  function onBikeSubmit(values: z.infer<typeof bikeSchema>) {
    const category = bikeCategoryLabels[values.category] ?? values.category;
    const record = createBooking(
      "bike",
      values.customerName,
      values.contact,
      `${category} availability`,
      {
        Category: category,
        Size: values.size ?? "",
        Budget: values.budget ?? "",
        Timing: values.timing,
      },
    );
    finishBooking(record);
    bikeForm.reset(bikeDefaults);
  }

  function onPartsSubmit(values: z.infer<typeof partsSchema>) {
    const record = createBooking(
      "part",
      values.customerName,
      values.contact,
      values.partName,
      {
        Part: values.partName,
        "Bike type": values.bikeType,
        Urgency: values.urgency,
        Notes: values.notes ?? "",
      },
    );
    finishBooking(record);
    partsForm.reset(partsDefaults);
  }

  function onRepairSubmit(values: z.infer<typeof repairSchema>) {
    const record = createBooking(
      "repair",
      values.customerName,
      values.contact,
      values.service,
      {
        Service: values.service,
        "Bike type": values.bikeType,
        "Preferred day": values.preferredDay,
        Issue: values.issue,
      },
    );
    finishBooking(record);
    repairForm.reset(repairDefaults);
  }


  function onWholesaleSubmit(values: z.infer<typeof wholesaleSchema>) {
    const record = createBooking(
      "wholesale",
      values.customerName,
      values.contact,
      `${values.businessName} wholesale parts`,
      {
        "Business / workshop": values.businessName,
        "Business type": values.businessType,
        "Parts needed": values.partsList,
        Quantity: values.quantity,
        Frequency: values.frequency,
        "Pickup / delivery": values.delivery,
        Notes: values.notes ?? "",
      },
    );
    finishBooking(record);
    wholesaleForm.reset(wholesaleDefaults);
  }

  function onRentalSubmit(values: z.infer<typeof rentalSchema>) {
    const rentalType = rentalTypeLabels[values.rentalType] ?? values.rentalType;
    const record = createBooking(
      "rental",
      values.customerName,
      values.contact,
      `${rentalType} rental`,
      {
        "Rental type": rentalType,
        Duration: values.duration,
        "Start day": values.startDate,
        Purpose: values.purpose ?? "",
      },
    );
    finishBooking(record);
    rentalForm.reset(rentalDefaults);
  }

  return (
    <div className="min-h-screen bg-background pt-20" data-testid="page-showroom">
      <section className="relative h-[60vh] min-h-[380px] overflow-hidden border-b-8 border-foreground">
        <motion.img
          src={showroomImg}
          alt="Ssotta showroom"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "linear" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/10" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-screen-xl px-6 pb-12 md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-3 font-mono text-xs font-bold uppercase tracking-normal text-primary"
          >
            Bwayise / Kawaala / Kazo Junction / Kampala
          </motion.p>
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[clamp(2.5rem,9vw,7rem)] font-black uppercase leading-none tracking-normal text-white">
              Visit the Showroom
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="border-b-4 border-foreground bg-primary">
        <div className="mx-auto flex max-w-screen-xl flex-wrap">
          {[
            { icon: PhoneAppIcon, text: "+256 757 432 917", href: "tel:+256757432917" },
            { icon: WhatsAppIcon, text: "WhatsApp Us", href: "https://wa.me/256757432917" },
            { icon: GoogleMapsIcon, text: "Bwayise, Kawaala, Kazo Jct", href: "https://maps.google.com/?q=Bwayise+Kawaala+Kampala" },
          ].map(({ icon: Icon, text, href }, i) => (
            <a
              key={text}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-r-2 border-foreground/20 px-8 py-4 font-mono text-sm font-bold uppercase text-foreground transition-colors last:border-r-0 hover:bg-foreground hover:text-background"
              data-testid={`quick-contact-${i}`}
            >
              <Icon size={16} />
              {text}
            </a>
          ))}
        </div>
      </section>

      <section className="border-b-4 border-foreground px-6 py-20 md:px-12">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-normal text-primary">
              Find Us
            </p>
            <h2 className="text-4xl font-black uppercase tracking-normal md:text-5xl">
              Contact Details
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contacts.map((card, i) => {
              const Icon = card.icon;
              const content = (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="group h-full rounded-lg border border-foreground/15 bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
                  data-testid={`card-contact-${card.label.toLowerCase()}`}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md border border-foreground/10 bg-muted transition-all group-hover:bg-primary">
                    <Icon size={20} className={`${card.color} group-hover:text-foreground`} />
                  </div>
                  <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-normal text-primary">
                    {card.label}
                  </p>
                  <h3 className="mb-2 text-lg font-black uppercase leading-tight">{card.title}</h3>
                  <p className="font-sans text-xs leading-relaxed text-muted-foreground">{card.desc}</p>
                </motion.div>
              );
              return card.href ? (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                content
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="booking"
        className="border-b-8 border-primary bg-foreground px-6 py-24 text-background md:px-12"
      >
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-normal text-primary">
              Send a Request
            </p>
            <h2 className="text-4xl font-black uppercase tracking-normal md:text-5xl">
              Tell Us What You Need
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-sans text-sm text-background/55">
              Save the details, get a booking ID, then open WhatsApp with a ready message.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <motion.div
              id="bike-booking"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-lg border border-primary/50 bg-background/5 p-7 shadow-lg"
            >
              <div className="mb-7 flex items-center gap-3">
                <Bike className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-2xl font-black uppercase text-background">Bike Request</h3>
                  <p className="font-sans text-xs text-background/50">Availability and price</p>
                </div>
              </div>
              <Form {...bikeForm}>
                <form onSubmit={bikeForm.handleSubmit(onBikeSubmit)} className="space-y-4">
                  <FormField control={bikeForm.control} name="customerName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Your Name</FormLabel>
                      <FormControl><Input {...field} className="form-input-dark" placeholder="Name" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={bikeForm.control} name="contact" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Phone / WhatsApp</FormLabel>
                      <FormControl><Input {...field} className="form-input-dark" placeholder="+256..." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={bikeForm.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Bike Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-input-dark"><SelectValue placeholder="Select type" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="kids">Kids bike</SelectItem>
                          <SelectItem value="carrier">Mannyi ga Kifuba carrier</SelectItem>
                          <SelectItem value="mountain">Mountain bike</SelectItem>
                          <SelectItem value="used">Used / pre-owned bike</SelectItem>
                          <SelectItem value="changer">Changer / geared bike</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField control={bikeForm.control} name="size" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label-dark">Size</FormLabel>
                        <FormControl><Input {...field} className="form-input-dark" placeholder="e.g. 24 inch" /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={bikeForm.control} name="budget" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label-dark">Budget</FormLabel>
                        <FormControl><Input {...field} className="form-input-dark" placeholder="Optional" /></FormControl>
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={bikeForm.control} name="timing" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">When do you need it?</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-input-dark"><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="this-week">This week</SelectItem>
                          <SelectItem value="just-checking">Just checking</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button className="h-13 w-full rounded-md bg-primary font-black uppercase text-foreground hover:bg-primary">
                    Save and Open WhatsApp
                  </Button>
                </form>
              </Form>
            </motion.div>

            <motion.div
              id="rental-booking"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.6 }}
              className="rounded-lg border border-background/15 bg-background/5 p-7 shadow-lg"
            >
              <div className="mb-7 flex items-center gap-3">
                <CalendarCheck className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-2xl font-black uppercase text-background">Rental Booking</h3>
                  <p className="font-sans text-xs text-background/50">Daily and weekly hire</p>
                </div>
              </div>
              <Form {...rentalForm}>
                <form onSubmit={rentalForm.handleSubmit(onRentalSubmit)} className="space-y-4">
                  <FormField control={rentalForm.control} name="customerName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Your Name</FormLabel>
                      <FormControl><Input {...field} className="form-input-dark" placeholder="Name" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={rentalForm.control} name="contact" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Phone / WhatsApp</FormLabel>
                      <FormControl><Input {...field} className="form-input-dark" placeholder="+256..." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={rentalForm.control} name="rentalType" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Rental Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-input-dark"><SelectValue placeholder="Select rental" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="commuter">Daily city commuter</SelectItem>
                          <SelectItem value="cargo">Carrier / work bicycle</SelectItem>
                          <SelectItem value="mountain">Mountain trail bike</SelectItem>
                          <SelectItem value="kids">Kids practice bike</SelectItem>
                          <SelectItem value="weekly">Weekly hire package</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField control={rentalForm.control} name="duration" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label-dark">Duration</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="form-input-dark"><SelectValue /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="daily">Daily hire</SelectItem>
                            <SelectItem value="weekend">Weekend hire</SelectItem>
                            <SelectItem value="weekly">Weekly hire</SelectItem>
                            <SelectItem value="not-sure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={rentalForm.control} name="startDate" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label-dark">Start Day</FormLabel>
                        <FormControl><Input {...field} className="form-input-dark" placeholder="Today, Saturday..." /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={rentalForm.control} name="purpose" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Purpose</FormLabel>
                      <FormControl><Textarea {...field} className="form-input-dark min-h-20" placeholder="Errands, delivery, practice, weekend ride..." /></FormControl>
                    </FormItem>
                  )} />
                  <Button className="h-13 w-full rounded-md bg-primary font-black uppercase text-foreground hover:bg-primary">
                    Save and Open WhatsApp
                  </Button>
                </form>
              </Form>
            </motion.div>

            <motion.div
              id="parts-booking"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16, duration: 0.6 }}
              className="rounded-lg border border-background/15 bg-background/5 p-7 shadow-lg"
            >
              <div className="mb-7 flex items-center gap-3">
                <PackageCheck className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-2xl font-black uppercase text-background">Part Request</h3>
                  <p className="font-sans text-xs text-background/50">Stock and fitment check</p>
                </div>
              </div>
              <Form {...partsForm}>
                <form onSubmit={partsForm.handleSubmit(onPartsSubmit)} className="space-y-4">
                  <FormField control={partsForm.control} name="customerName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Your Name</FormLabel>
                      <FormControl><Input {...field} className="form-input-dark" placeholder="Name" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={partsForm.control} name="contact" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Phone / WhatsApp</FormLabel>
                      <FormControl><Input {...field} className="form-input-dark" placeholder="+256..." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={partsForm.control} name="partName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Part Needed</FormLabel>
                      <FormControl><Input {...field} className="form-input-dark" placeholder="Brake pads, chain, tyre..." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={partsForm.control} name="bikeType" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">For Which Bike?</FormLabel>
                      <FormControl><Input {...field} className="form-input-dark" placeholder="Mountain bike, kids bike..." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={partsForm.control} name="urgency" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Urgency</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-input-dark"><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="today">Need today</SelectItem>
                          <SelectItem value="this-week">This week</SelectItem>
                          <SelectItem value="checking-price">Checking price</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={partsForm.control} name="notes" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Notes</FormLabel>
                      <FormControl><Textarea {...field} className="form-input-dark min-h-20" placeholder="Any brand, size, or photo details" /></FormControl>
                    </FormItem>
                  )} />
                  <Button className="h-13 w-full rounded-md bg-primary font-black uppercase text-foreground hover:bg-primary">
                    Save and Open WhatsApp
                  </Button>
                </form>
              </Form>
            </motion.div>

            <motion.div
              id="repair-booking"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24, duration: 0.6 }}
              className="rounded-lg border border-background/15 bg-background/5 p-7 shadow-lg"
            >
              <div className="mb-7 flex items-center gap-3">
                <Wrench className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-2xl font-black uppercase text-background">Repair Booking</h3>
                  <p className="font-sans text-xs text-background/50">Workshop diagnosis</p>
                </div>
              </div>
              <Form {...repairForm}>
                <form onSubmit={repairForm.handleSubmit(onRepairSubmit)} className="space-y-4">
                  <FormField control={repairForm.control} name="customerName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Your Name</FormLabel>
                      <FormControl><Input {...field} className="form-input-dark" placeholder="Name" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={repairForm.control} name="contact" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Phone / WhatsApp</FormLabel>
                      <FormControl><Input {...field} className="form-input-dark" placeholder="+256..." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={repairForm.control} name="service" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Service Needed</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-input-dark"><SelectValue placeholder="Select service" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Full service overhaul">Full service overhaul</SelectItem>
                          <SelectItem value="Puncture repair">Puncture repair</SelectItem>
                          <SelectItem value="Brake adjustment">Brake adjustment</SelectItem>
                          <SelectItem value="Gear tuning">Gear tuning</SelectItem>
                          <SelectItem value="Wheel truing">Wheel truing</SelectItem>
                          <SelectItem value="Custom build">Custom build</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField control={repairForm.control} name="bikeType" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label-dark">Bike Type</FormLabel>
                        <FormControl><Input {...field} className="form-input-dark" placeholder="Road, mountain..." /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={repairForm.control} name="preferredDay" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label-dark">Preferred Day</FormLabel>
                        <FormControl><Input {...field} className="form-input-dark" placeholder="Today, Saturday..." /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={repairForm.control} name="issue" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">What is wrong?</FormLabel>
                      <FormControl><Textarea {...field} className="form-input-dark min-h-24" placeholder="Describe the sound, damage, or problem" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button className="h-13 w-full rounded-md bg-primary font-black uppercase text-foreground hover:bg-primary">
                    Save and Open WhatsApp
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>

          <motion.div
            id="wholesale-booking"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="mt-6 rounded-lg border border-primary/50 bg-background/5 p-7 shadow-lg"
          >
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <Handshake className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-2xl font-black uppercase text-background">Wholesale Parts Request</h3>
                  <p className="font-sans text-xs text-background/50">For mechanics, shops, fleets, and repeat buyers</p>
                </div>
              </div>
              <span className="w-fit rounded-full border border-primary/40 px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-primary">
                Bulk and repeat supply
              </span>
            </div>
            <Form {...wholesaleForm}>
              <form onSubmit={wholesaleForm.handleSubmit(onWholesaleSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField control={wholesaleForm.control} name="customerName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Contact Person</FormLabel>
                      <FormControl><Input {...field} className="form-input-dark" placeholder="Name" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={wholesaleForm.control} name="businessName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Business / Workshop</FormLabel>
                      <FormControl><Input {...field} className="form-input-dark" placeholder="Workshop or shop name" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={wholesaleForm.control} name="contact" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Phone / WhatsApp</FormLabel>
                      <FormControl><Input {...field} className="form-input-dark" placeholder="+256..." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={wholesaleForm.control} name="businessType" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Business Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-input-dark"><SelectValue placeholder="Select type" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mechanic-workshop">Mechanic workshop</SelectItem>
                          <SelectItem value="bicycle-shop">Bicycle shop</SelectItem>
                          <SelectItem value="rental-fleet">Rental fleet</SelectItem>
                          <SelectItem value="school-community">School / community program</SelectItem>
                          <SelectItem value="delivery-fleet">Delivery or business fleet</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={wholesaleForm.control} name="partsList" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label-dark">Parts Needed</FormLabel>
                    <FormControl><Textarea {...field} className="form-input-dark min-h-24" placeholder="Example: chains, brake pads, 26 inch tubes, cables, tyres, bearings..." /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <FormField control={wholesaleForm.control} name="quantity" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Quantity</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-input-dark"><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small-bundle">Small bundle</SelectItem>
                          <SelectItem value="box-carton">Box / carton</SelectItem>
                          <SelectItem value="mixed-order">Mixed order</SelectItem>
                          <SelectItem value="repeat-stock">Repeat stock supply</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={wholesaleForm.control} name="frequency" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Frequency</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-input-dark"><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="one-off">One-off order</SelectItem>
                          <SelectItem value="weekly">Weekly restock</SelectItem>
                          <SelectItem value="monthly">Monthly restock</SelectItem>
                          <SelectItem value="as-needed">As needed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={wholesaleForm.control} name="delivery" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label-dark">Pickup / Delivery</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="form-input-dark"><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pickup">Pickup at showroom</SelectItem>
                          <SelectItem value="send-rider">Send boda / courier</SelectItem>
                          <SelectItem value="discuss">Discuss delivery</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={wholesaleForm.control} name="notes" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label-dark">Notes</FormLabel>
                    <FormControl><Textarea {...field} className="form-input-dark min-h-20" placeholder="Brands, sizes, target budget, or preferred pickup time" /></FormControl>
                  </FormItem>
                )} />
                <Button className="h-13 w-full rounded-md bg-primary font-black uppercase text-foreground hover:bg-primary">
                  Save Bulk Request and Open WhatsApp
                </Button>
              </form>
            </Form>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
            <BookingResult booking={lastBooking} />
            <RecentBookings bookings={recentBookings} />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-normal text-primary">
              Why Visit
            </p>
            <h2 className="mb-10 text-4xl font-black uppercase tracking-normal md:text-5xl">
              Everything in<br />one place
            </h2>
            <div className="space-y-0 border-t-4 border-foreground">
              {promises.map((promise, i) => (
                <motion.div
                  key={promise}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-4 border-b-2 border-foreground/10 py-5"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-base font-medium">{promise}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <div className="overflow-hidden rounded-lg border border-foreground/15 shadow-xl">
              <img src={showroomImg} alt="Ssotta showroom interior" className="h-[420px] w-full object-cover" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { stat: "10", label: "Years" },
                { stat: "10k+", label: "Riders" },
                { stat: "3", label: "Mechanics" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-foreground/10 bg-foreground py-5 text-center text-background">
                  <div className="text-3xl font-black text-primary">{item.stat}</div>
                  <div className="mt-1 font-sans text-[10px] tracking-normal text-background/60">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
