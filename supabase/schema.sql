-- Run once in Supabase SQL Editor for central booking storage.
create table if not exists public.bookings (
  id text primary key,
  type text not null check (type in ('bike', 'part', 'repair', 'rental', 'wholesale')),
  customer_name text not null,
  contact text not null,
  summary text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists bookings_type_idx on public.bookings (type);

alter table public.bookings enable row level security;

drop policy if exists "website can insert bookings" on public.bookings;
create policy "website can insert bookings"
  on public.bookings
  for insert
  to anon
  with check (true);

-- View and manage bookings from the Supabase dashboard (service role / authenticated staff only).
