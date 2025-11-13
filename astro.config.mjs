import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";

import alpinejs from "@astrojs/alpinejs";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    alpinejs(),
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
