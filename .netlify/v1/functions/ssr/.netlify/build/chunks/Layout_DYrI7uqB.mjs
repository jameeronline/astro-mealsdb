import { createClient } from '@sanity/client';
import { c as createComponent, b as createAstro, m as maybeRenderHead, s as spreadAttributes, d as addAttribute, f as renderSlot, r as renderComponent, a as renderTemplate, e as renderScript, j as renderHead } from './astro/server_eHSPLay3.mjs';
/* empty css                                 */
import 'clsx';

const sanityClient = createClient(
            {"apiVersion":"v2023-08-24","projectId":"futd0pge","dataset":"production","useCdn":false}
          );

globalThis.sanityClient = sanityClient;

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};

const $$Astro$3 = createAstro("https://astro-meals.netlify.app/");
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Icon;
  const {
    color = "currentColor",
    size = 24,
    "stroke-width": strokeWidth = 2,
    absoluteStrokeWidth = false,
    iconNode = [],
    class: className,
    ...rest
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes({
    ...defaultAttributes,
    width: size,
    height: size,
    stroke: color,
    "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
    ...rest
  })}${addAttribute(["lucide", className], "class:list")}> ${iconNode.map(([Tag, attrs]) => renderTemplate`${renderComponent($$result, "Tag", Tag, { ...attrs })}`)} ${renderSlot($$result, $$slots["default"])} </svg>`;
}, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/node_modules/@lucide/astro/src/Icon.astro", void 0);

const createLucideIcon = (iconName, iconNode) => {
  const Component = createComponent(
    ($$result, $$props, $$slots) => {
      const { class: className, ...restProps } = $$props;
      return renderTemplate`${renderComponent(
        $$result,
        "Icon",
        $$Icon,
        {
          class: mergeClasses(
            Boolean(iconName) && `lucide-${toKebabCase(iconName)}`,
            Boolean(className) && className
          ),
          iconNode,
          ...restProps
        },
        { default: () => renderTemplate`${renderSlot($$result, $$slots["default"])}` }
      )}`;
    },
    void 0,
    "none"
  );
  return Component;
};

const Menu = createLucideIcon("menu", [["path", { "d": "M4 5h16" }], ["path", { "d": "M4 12h16" }], ["path", { "d": "M4 19h16" }]]);

const Moon = createLucideIcon("moon", [["path", { "d": "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" }]]);

const Search = createLucideIcon("search", [["path", { "d": "m21 21-4.34-4.34" }], ["circle", { "cx": "11", "cy": "11", "r": "8" }]]);

const Settings = createLucideIcon("settings", [["path", { "d": "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }], ["circle", { "cx": "12", "cy": "12", "r": "3" }]]);

const Sun = createLucideIcon("sun", [["circle", { "cx": "12", "cy": "12", "r": "4" }], ["path", { "d": "M12 2v2" }], ["path", { "d": "M12 20v2" }], ["path", { "d": "m4.93 4.93 1.41 1.41" }], ["path", { "d": "m17.66 17.66 1.41 1.41" }], ["path", { "d": "M2 12h2" }], ["path", { "d": "M20 12h2" }], ["path", { "d": "m6.34 17.66-1.41 1.41" }], ["path", { "d": "m19.07 4.93-1.41 1.41" }]]);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$DarkMode = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<button class="inline-flex items-center justify-center cursor-pointer gap-2 size-10"> <span class="text-sm font-medium text-gray-600 dark:text-gray-300 theme-icon" id="themeToggle"> ', " ", " ", ` </span> <!-- <input type="checkbox" value="" class="sr-only peer" id="themeToggle" /> --> <!-- <div
    class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
  >
  </div> --> <!-- <span class="text-sm font-medium text-gray-600 dark:text-gray-300"
    ><Moon class="moon w-5 h-5" /></span
  > --> </button> <script client:only>
  const updateThemeIcon = (currentTheme) => {
    const settings = document.querySelector(".settings");
    const sun = document.querySelector(".sun");
    const moon = document.querySelector(".moon");

    if (currentTheme === "system") {
      settings?.classList.remove("hidden");
      sun?.classList.add("hidden");
      moon?.classList.add("hidden");
    } else if (currentTheme === "light") {
      settings?.classList.add("hidden");
      sun?.classList.remove("hidden");
      moon?.classList.add("hidden");
    } else {
      settings?.classList.add("hidden");
      sun?.classList.add("hidden");
      moon?.classList.remove("hidden");
    }
  };

  const theme = (() => {
    const localStorageTheme = localStorage?.getItem("mode") ?? "";
    if (["dark", "light", "system"].includes(localStorageTheme)) {
      return localStorageTheme;
    }
    return "system";
  })();

  const applyTheme = (selectedTheme) => {
    if (selectedTheme === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        document.getElementById("themeToggle").checked = true;
      } else {
        document.documentElement.classList.remove("dark");
        document.getElementById("themeToggle").checked = false;
      }
    } else if (selectedTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.getElementById("themeToggle").checked = true;
    } else {
      document.documentElement.classList.remove("dark");
      document.getElementById("themeToggle").checked = false;
    }
    updateThemeIcon(selectedTheme);
  };

  applyTheme(theme);
  window.localStorage.setItem("mode", theme);

  const handleToggleClick = () => {
    const currentTheme = localStorage.getItem("mode");
    let newTheme;

    if (currentTheme === "system") {
      newTheme = "light";
    } else if (currentTheme === "light") {
      newTheme = "dark";
    } else {
      newTheme = "system";
    }

    localStorage.setItem("mode", newTheme);
    applyTheme(newTheme);
  };

  document
    .getElementById("themeToggle")
    ?.addEventListener("click", handleToggleClick);

  // Re-run after client-side navigation
  document.addEventListener("astro:page-load", () => {
    const storedTheme = localStorage.getItem("mode") || "system";
    applyTheme(storedTheme);

    document
      .getElementById("themeToggle")
      ?.addEventListener("click", handleToggleClick);
  });
<\/script>`])), maybeRenderHead(), renderComponent($$result, "Settings", Settings, { "class": "settings w-5 h-5" }), renderComponent($$result, "Sun", Sun, { "class": "sun w-5 h-5 hidden" }), renderComponent($$result, "Moon", Moon, { "class": "moon w-5 h-5 hidden" }));
}, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/components/modules/DarkMode.astro", void 0);

const $$ThemeSelect = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="theme-switcher" data-astro-cid-ylorepwx> <div class="theme-switcher-container" data-astro-cid-ylorepwx> <!-- Current theme display button --> <button id="theme-toggle" class="theme-toggle-btn" aria-label="Change theme" aria-expanded="false" data-astro-cid-ylorepwx> <span id="current-theme-icon" class="current-theme-icon theme-green" data-astro-cid-ylorepwx></span> <span id="current-theme-text" data-astro-cid-ylorepwx>Green</span> <svg id="chevron-icon" class="chevron-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ylorepwx> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-ylorepwx></path> </svg> </button> <!-- Theme dropdown panel --> <div id="theme-panel" class="theme-panel" data-astro-cid-ylorepwx> <div class="theme-options" data-astro-cid-ylorepwx> <button class="theme-option" data-theme="green" data-astro-cid-ylorepwx> <span class="theme-color-preview theme-green" data-astro-cid-ylorepwx></span> <span class="theme-name" data-astro-cid-ylorepwx>Green</span> <span class="theme-check" data-astro-cid-ylorepwx>✓</span> </button> <button class="theme-option" data-theme="blue" data-astro-cid-ylorepwx> <span class="theme-color-preview theme-blue" data-astro-cid-ylorepwx></span> <span class="theme-name" data-astro-cid-ylorepwx>Blue</span> <span class="theme-check" data-astro-cid-ylorepwx>✓</span> </button> <button class="theme-option" data-theme="orange" data-astro-cid-ylorepwx> <span class="theme-color-preview theme-orange" data-astro-cid-ylorepwx></span> <span class="theme-name" data-astro-cid-ylorepwx>Orange</span> <span class="theme-check" data-astro-cid-ylorepwx>✓</span> </button> <button class="theme-option" data-theme="red" data-astro-cid-ylorepwx> <span class="theme-color-preview theme-red" data-astro-cid-ylorepwx></span> <span class="theme-name" data-astro-cid-ylorepwx>Red</span> <span class="theme-check" data-astro-cid-ylorepwx>✓</span> </button> <button class="theme-option" data-theme="purple" data-astro-cid-ylorepwx> <span class="theme-color-preview theme-purple" data-astro-cid-ylorepwx></span> <span class="theme-name" data-astro-cid-ylorepwx>Purple</span> <span class="theme-check" data-astro-cid-ylorepwx>✓</span> </button> <button class="theme-option" data-theme="teal" data-astro-cid-ylorepwx> <span class="theme-color-preview theme-teal" data-astro-cid-ylorepwx></span> <span class="theme-name" data-astro-cid-ylorepwx>Teal</span> <span class="theme-check" data-astro-cid-ylorepwx>✓</span> </button> </div> </div> </div> </div> ${renderScript($$result, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/components/modules/ThemeSelect.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/components/modules/ThemeSelect.astro", void 0);

const homeNavLink = {
  text: "MealsDB",
  href: "/"};
const navLinks = [
  { text: "Categories", href: "/categories" },
  { text: "Cuisines", href: "/cuisines" },
  { text: "Ingredients", href: "/ingredients" },
  { text: "Features", href: "/features" },
  { text: "Blog", href: "/blog" },
  { text: "Pricing", href: "/pricing" },
  { text: "About", href: "/about" }
];

const $$Astro$2 = createAstro("https://astro-meals.netlify.app/");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const { pathname } = Astro2.url;
  function isActiveLink(href, currentPath) {
    if (href === "/" && currentPath === "/") {
      return true;
    }
    if (href !== "/" && currentPath.startsWith(href)) {
      return true;
    }
    return false;
  }
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark mb-8 md:mb-16 print:hidden"> <div class="xl:container mx-auto px-4 md:px-6"> <div class="flex h-16 items-center justify-between"> <div class="flex items-center gap-4"> <span> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="fill-primary"><path d="M400-160h160v-44l50-20q65-26 110.5-72.5T786-400H174q20 57 65 103.5T350-224l50 20v44Zm-80 80v-70q-107-42-173.5-130T80-480h80v-320l720-80v60l-460 52v68h460v60H420v160h460q0 112-66.5 200T640-150v70H320Zm0-620h40v-62l-40 5v57Zm-100 0h40v-50l-40 4v46Zm100 220h40v-160h-40v160Zm-100 0h40v-160h-40v160Zm260 80Z"></path></svg> </span> <a${addAttribute(`text-xl font-bold transition-colors ${isActiveLink(homeNavLink.href, pathname) ? "text-primary" : "text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary"}`, "class")}${addAttribute(homeNavLink.href, "href")}> ${homeNavLink.text} </a> </div> <nav class="hidden md:flex flex-1 justify-center items-center gap-9"> ${navLinks.map((link) => {
    const isActive = isActiveLink(link.href, pathname);
    return renderTemplate`<a${addAttribute(`font-medium transition-colors relative ${isActive ? "text-primary" : "text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary"} ${isActive ? "after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full" : ""}`, "class")}${addAttribute(link.href, "href")}> ${link.text} </a>`;
  })} </nav> <div class="flex items-center gap-2"> ${renderComponent($$result, "Menu", Menu, { "class": "w-6 h-6 lg:hidden cursor-pointer hover:text-primary transition-colors" })} ${renderComponent($$result, "DarkMode", $$DarkMode, {})} <!-- <button
          class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-text-light text-sm font-bold tracking-[0.015em]"
        >
          <span class="truncate">Login</span>
        </button> --> <a${addAttribute(`flex cursor-pointer items-center justify-center overflow-hidden size-10 text-sm font-bold transition-all ${isActiveLink("/search", pathname) ? "text-text-light border border-primary" : "hover:text-primary"}`, "class")} href="/search"> ${renderComponent($$result, "Search", Search, { "class": "w-5 h-5" })} </a> ${renderComponent($$result, "ThemeSelect", $$ThemeSelect, {})} </div> </div> </div> </header>`;
}, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/components/Header.astro", void 0);

const footerSections = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "/" },
      { text: "Categories", url: "/categories" },
      { text: "Blog", url: "/blog" },
      { text: "About Us", url: "/about" }
    ]
  },
  {
    title: "Legal",
    links: [
      { text: "Privacy Policy", url: "/privacy-policy" },
      { text: "Terms and Conditions", url: "/terms-and-conditions" },
      { text: "Contact Us", url: "/contact" }
    ]
  },
  {
    title: "Recipes",
    links: [
      { text: "Popular Recipes", url: "/recipes/popular" },
      { text: "Latest Recipes", url: "/recipes/latest" },
      { text: "By Cuisine", url: "/recipes/cuisine" },
      { text: "By Ingredient", url: "/recipes/ingredients" }
    ]
  }
];

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const linkPrefix = "/static";
  return renderTemplate`<!-- Footer -->${maybeRenderHead()}<footer class="bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark mt-8 md:mt-16 print:hidden"> <div class="xl:container mx-auto px-4 md:px-6 py-12"> <div class="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12"> <!-- ABOUT --> <div class="col-span-4 lg:col-span-6"> <div class="flex items-center gap-2 mb-4"> <span class="material-symbols-outlined text-primary text-2xl">ramen_dining</span> <h2 class="text-text-light dark:text-text-dark text-lg font-bold">
MealsDB
</h2> </div> <p class="text-sm max-w-sm">
Your ultimate destination for discovering, cooking, and sharing
          delicious meals from around the world.
</p> </div> <!-- LINKS --> <div class="col-span-4 lg:col-span-6"> <div class="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12"> ${footerSections.map((section) => renderTemplate`<div class="col-span-4"> <h3 class="font-bold mb-4">${section.title}</h3> <ul class="space-y-2 text-sm"> ${section.links.map((link) => renderTemplate`<li> <a class="hover:text-primary hover:underline hover:underline-offset-2 transition-colors"${addAttribute(`${linkPrefix}${link.url}`, "href")}> ${link.text} </a> </li>`)} </ul> </div>`)} </div> </div> </div> <!-- SUB FOOTER --> <div class="mt-12 pt-8 border-t border-border-light dark:border-border-dark text-center text-sm"> <div class="flex items-center justify-between gap-2"> <p>© 2024 <span class="font-bold">MealsDB</span>. All rights reserved.</p> <div class="flex items-center gap-4 ml-4"> <a href="#" class="text-text-light dark:text-text-dark hover:text-primary transition-colors" aria-label="X (Twitter)"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path> </svg> </a> <a href="#" class="text-text-light dark:text-text-dark hover:text-primary transition-colors" aria-label="Facebook"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path> </svg> </a> <a href="#" class="text-text-light dark:text-text-dark hover:text-primary transition-colors" aria-label="Discord"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.195.372.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path> </svg> </a> <a href="#" class="text-text-light dark:text-text-dark hover:text-primary transition-colors" aria-label="YouTube"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path> </svg> </a> </div> </div> </div> </div></footer>`;
}, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/components/Footer.astro", void 0);

const $$Astro$1 = createAstro("https://astro-meals.netlify.app/");
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SEO;
  const {
    title = "MealsDB - Discover Amazing Recipes",
    description = "Explore thousands of delicious recipes from around the world with MealsDB. Find your next favorite meal today!",
    image = "/og-image.jpg",
    url = Astro2.url.href,
    type = "website",
    siteName = "MealsDB"
  } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  return renderTemplate`<!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Open Graph / Facebook --><meta property="og:type"${addAttribute(type, "content")}><meta property="og:url"${addAttribute(url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(image, "content")}><meta property="og:site_name"${addAttribute(siteName, "content")}><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"${addAttribute(url, "content")}><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(image, "content")}><!-- Additional SEO Tags --><meta name="robots" content="index, follow"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta charset="UTF-8">`;
}, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/components/SEO.astro", void 0);

const $$ScrollAnimate = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Scroll animations -->${renderScript($$result, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/scripts/ScrollAnimate.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/scripts/ScrollAnimate.astro", void 0);

const $$Astro = createAstro("https://astro-meals.netlify.app/");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "MealsDB | Find your next meal",
    description = "Discover and share delicious recipes from around the world."
  } = Astro2.props;
  return renderTemplate`<html lang="en" class="h-full scroll-smooth scroll-animation"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="sitemap" href="/sitemap-index.xml"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">${renderComponent($$result, "SEO", $$SEO, { "title": title, "description": description })}${renderHead()}</head> <body class="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark grid grid-cols-1 grid-rows-[auto_1fr_auto] min-h-full"> ${renderComponent($$result, "Header", $$Header, {})} <main class="xl:container mx-auto px-4 md:px-6 w-full"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} <!-- <LocalScript /> --> ${renderComponent($$result, "ScrollAnimate", $$ScrollAnimate, {})} ${renderScript($$result, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/layouts/Layout.astro", void 0);

export { $$Layout as $, Search as S, createLucideIcon as c, sanityClient as s };
