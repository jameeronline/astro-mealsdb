import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";

import alpinejs from "@astrojs/alpinejs";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-meals.netlify.app/",
  adapter: netlify(),
  image: {
    domains: ["themealdb.com"],
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
  integrations: [
    alpinejs(),
    sitemap(),
    react(),
    sanity({
      projectId: "futd0pge",
      dataset: "production",
      useCdn: false,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
