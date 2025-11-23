import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";

import alpinejs from "@astrojs/alpinejs";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import partytown from '@astrojs/partytown';
import mdx from '@astrojs/mdx';


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
    mdx(),
    alpinejs(),
    sitemap(),
    react(),
    partytown(),
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
