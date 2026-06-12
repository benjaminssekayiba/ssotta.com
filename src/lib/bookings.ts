import { syncBookingToCloud } from "@/lib/booking-sync";

export type BookingType = "bike" | "part" | "repair" | "rental" | "wholesale";

export type BookingRecord = {
  id: string;
  type: BookingType;
  customerName: string;
  contact: string;
  summary: string;
  details: Record<string, string>;
  createdAt: string;
};

const STORAGE_KEY = "ssotta-bookings";
const WHATSAPP_NUMBER = "256757432917";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getBookings(): BookingRecord[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BookingRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveBooking(record: BookingRecord) {
  if (!canUseStorage()) return;

  const current = getBookings();
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([record, ...current].slice(0, 25)),
  );
}

export function createBooking(
  type: BookingType,
  customerName: string,
  contact: string,
  summary: string,
  details: Record<string, string>,
) {
  const id = `SS-${type.toUpperCase()}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  const record: BookingRecord = {
    id,
    type,
    customerName,
    contact,
    summary,
    details,
    createdAt: new Date().toISOString(),
  };

  saveBooking(record);
  void syncBookingToCloud(record);
  return record;
}

export function buildWhatsAppUrl(record: BookingRecord) {
  const detailLines = Object.entries(record.details)
    .filter(([, value]) => value.trim().length > 0)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  const message = [
    `Hello Ssotta, I would like help with this ${record.type} request.`,
    `Booking ID: ${record.id}`,
    `Name: ${record.customerName}`,
    `Contact: ${record.contact}`,
    `Summary: ${record.summary}`,
    detailLines,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openBookingWhatsApp(record: BookingRecord) {
  const url = buildWhatsAppUrl(record);
  const opened = window.open(url, "_blank", "noopener,noreferrer");

  if (!opened) {
    window.location.href = url;
  }
}
