import { $ as $$Layout } from '../chunks/Layout_DYrI7uqB.mjs';
import { b as createAstro, c as createComponent, r as renderComponent, e as renderScript, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_eHSPLay3.mjs';
import { Image as $$Image } from '../chunks/_astro_assets_Biza-rwO.mjs';
import { g as getCollection } from '../chunks/_astro_content_CLrRkF0D.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://astro-meals.netlify.app/");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const url = new URL(Astro2.request.url);
  const sortParam = url.searchParams.get("sort") || "default";
  const allCuisines = await getCollection("cuisines");
  let cuisines = [...allCuisines];
  if (sortParam === "a-z") {
    cuisines.sort((a, b) => a.data.title.localeCompare(b.data.title));
  } else if (sortParam === "z-a") {
    cuisines.sort((a, b) => b.data.title.localeCompare(a.data.title));
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Categories", "description": "Explore a variety of meal categories to find your next favorite recipe." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <header class="flex flex-col gap-3 text-center mb-12" data-scroll-animate> <h1 class="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] text-text-light dark:text-text-dark" data-scroll-animate>
Browse All Meal Cuisines
</h1> <p class="text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto" data-scroll-animate>
Find your next favorite dish by exploring our curated cuisines.
</p> </header> <!-- Sort Controls --> <div class="flex flex-wrap items-center justify-between gap-3 py-3 mb-6"> <!-- <form class="max-w-md mx-auto mb-8" method="GET"> --> <div class="text-text-light dark:text-text-dark text-sm font-medium">
Sort by:
<select id="sortSelect" name="sort" class="ml-2 bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark border border-border-light dark:border-card-dark rounded-md px-2 py-1"${addAttribute(sortParam, "value")}> <option value="default"${addAttribute(sortParam === "default", "selected")}>Default</option> <option value="a-z"${addAttribute(sortParam === "a-z", "selected")}>Title (A-Z)</option> <option value="z-a"${addAttribute(sortParam === "z-a", "selected")}>Title (Z-A)</option> </select> <!-- <button
          type="submit"
          class=""
          >Search</button
        > --> </div> <!-- </form> --> <div class="text-text-muted-light dark:text-text-muted-dark text-sm"> ${cuisines.length} cuisines found
</div> </div> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" data-scroll-animate> ${cuisines.map((cuisine) => renderTemplate`<a class="group relative block overflow-hidden rounded-xl "${addAttribute(`/cuisines/${cuisine.data.slug}`, "href")} data-scroll-animate> <div class="flex flex-col justify-end aspect-[3/4] transition-transform duration-300 ease-in-out group-hover:scale-105"> <div class="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div> ${cuisine.data.thumbnail ? renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "h-full w-full object-cover", "alt": cuisine.data.title, "src": cuisine.data.thumbnail, "width": 400, "height": 533 })}` : renderTemplate`<div class="h-full w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"> <span class="text-gray-500 dark:text-gray-400 text-sm">No Image</span> </div>`} <h2 class="text-white text-lg font-bold leading-tight absolute bottom-4 left-4"> ${cuisine.data.title} </h2> </div> </a>`)} </div> </div> ` })} ${renderScript($$result, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/pages/cuisines/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/pages/cuisines/index.astro", void 0);

const $$file = "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/pages/cuisines/index.astro";
const $$url = "/cuisines";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
