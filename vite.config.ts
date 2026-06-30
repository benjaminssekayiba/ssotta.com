import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { writeFileSync } from "fs";
import path from "path";

const SITEMAP_ROUTES = ["/", "/bikes", "/parts", "/rentals", "/repairs", "/showroom"];

function launchSeoPlugin(siteUrl: string): Plugin {
  return {
    name: "ssotta-launch-seo",
    apply: "build",
    closeBundle() {
      if (!siteUrl) {
        console.warn(
          "[ssotta] VITE_SITE_URL is not set. Skipping sitemap.xml and production robots.txt generation.",
        );
        return;
      }

      const normalized = siteUrl.replace(/\/$/, "");
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_ROUTES.map((route) => {
  const loc = route === "/" ? normalized : `${normalized}${route}`;
  const priority = route === "/" ? "1.0" : "0.8";
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join("\n")}
</urlset>
`;

      const robots = `User-agent: *
Allow: /

Sitemap: ${normalized}/sitemap.xml
`;

      const distDir = path.resolve(import.meta.dirname, "dist");
      writeFileSync(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
      writeFileSync(path.join(distDir, "robots.txt"), robots, "utf8");
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "");
  const siteUrl = env.VITE_SITE_URL || "https://ssotta.com";

  return {
    base: "/",
    plugins: [
      react(),
      tailwindcss(),
      ViteImageOptimizer({
        png: { quality: 78 },
        jpg: { quality: 82 },
        jpeg: { quality: 82 },
        webp: { quality: 82 },
        svg: false,
      }),
      launchSeoPlugin(siteUrl),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
      dedupe: ["react", "react-dom"],
    },
    server: {
      host: "0.0.0.0",
      port: 3001,
    },
    preview: {
      host: "0.0.0.0",
      port: 3001,
    },
  };
});
