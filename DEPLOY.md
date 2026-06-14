# Deploy Ssotta Website

## GitHub + Cloudflare Pages (recommended)

### Step 1 — Push code to GitHub

From the project folder:

```bash
git init
git add .
git commit -m "Initial Ssotta website"
```

On GitHub: **New repository** → name it e.g. `ssotta-website` → **do not** add README (repo should stay empty).

Then connect and push (replace `YOUR_USERNAME`):

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ssotta-website.git
git push -u origin main
```

### Step 2 — Connect Cloudflare Pages

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Choose **GitHub** and authorize Cloudflare
4. Select your `ssotta-website` repository

### Step 3 — Build settings

| Setting | Value |
|---------|--------|
| Framework preset | None (or Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |

Click **Save and Deploy**.

Cloudflare will give you a free preview URL like:

`https://ssotta-website.pages.dev`

Share that link with your friend — no custom domain needed yet.

### Step 4 — Environment variables (after first deploy)

In Cloudflare: **Workers & Pages** → your project → **Settings** → **Environment variables** → **Production**

| Variable | Value (preview) | Required for preview? |
|----------|-----------------|------------------------|
| `NODE_VERSION` | `20` | Recommended |
| `VITE_SITE_URL` | `https://ssotta-website.pages.dev` | Optional for friend review |
| `VITE_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Optional |
| `VITE_SUPABASE_URL` | your Supabase URL | Optional |
| `VITE_SUPABASE_ANON_KEY` | your anon key | Optional |

Use your **actual** `*.pages.dev` URL for `VITE_SITE_URL` after the first deploy, then **Retry deployment** so sitemap and social preview tags use the correct link.

When you buy a domain later, update `VITE_SITE_URL` and connect the domain under **Custom domains** in Cloudflare Pages.

### SPA routing

`public/_redirects` is already included and copies into `dist/` on build:

```
/*    /index.html   200
```

This makes `/bikes`, `/parts`, `/showroom`, etc. work when opened directly.

---

## Preview deploy without GitHub (quick test)

```bash
npm install
npm run build
npx wrangler pages deploy dist --project-name=ssotta-website
```

Log in to Cloudflare when prompted. You get a `*.pages.dev` URL immediately.

---

## Optional: central bookings (Supabase)

1. Create a free project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Cloudflare environment variables
4. Redeploy

WhatsApp handoff still works without Supabase.

---

## After you buy a custom domain

1. In Cloudflare Pages → **Custom domains** → add your domain
2. Update `VITE_SITE_URL` to `https://www.yourdomain.com`
3. Retry the latest deployment
4. Submit `https://www.yourdomain.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console)

---

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3001`
