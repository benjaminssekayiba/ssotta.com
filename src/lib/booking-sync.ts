import type { BookingRecord } from "@/lib/bookings";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export function isCloudBookingSyncEnabled() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export async function syncBookingToCloud(record: BookingRecord) {
  if (!isCloudBookingSyncEnabled()) return { ok: true, skipped: true as const };

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

    const { error } = await supabase.from("bookings").insert({
      id: record.id,
      type: record.type,
      customer_name: record.customerName,
      contact: record.contact,
      summary: record.summary,
      details: record.details,
      created_at: record.createdAt,
    });

    if (error) {
      console.warn("[ssotta] Booking cloud sync failed:", error.message);
      return { ok: false, skipped: false as const, error: error.message };
    }

    return { ok: true, skipped: false as const };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown sync error";
    console.warn("[ssotta] Booking cloud sync failed:", message);
    return { ok: false, skipped: false as const, error: message };
  }
}
