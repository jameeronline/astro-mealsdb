import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BEKcpXDM.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/blog.astro.mjs');
const _page4 = () => import('./pages/categories/_category_/_---page_.astro.mjs');
const _page5 = () => import('./pages/categories/_---page_.astro.mjs');
const _page6 = () => import('./pages/cuisines/_cuisine_.astro.mjs');
const _page7 = () => import('./pages/cuisines.astro.mjs');
const _page8 = () => import('./pages/features.astro.mjs');
const _page9 = () => import('./pages/ingredients.astro.mjs');
const _page10 = () => import('./pages/instantsearch.astro.mjs');
const _page11 = () => import('./pages/posts.astro.mjs');
const _page12 = () => import('./pages/pricing.astro.mjs');
const _page13 = () => import('./pages/recipe/_slug_.astro.mjs');
const _page14 = () => import('./pages/recipe.astro.mjs');
const _page15 = () => import('./pages/robots.txt.astro.mjs');
const _page16 = () => import('./pages/search/algolia.astro.mjs');
const _page17 = () => import('./pages/search.astro.mjs');
const _page18 = () => import('./pages/static/about/about-company.astro.mjs');
const _page19 = () => import('./pages/static/legal/privacy-policy.astro.mjs');
const _page20 = () => import('./pages/static/legal/terms-and-conditions.astro.mjs');
const _page21 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/blog/index.astro", _page3],
    ["src/pages/categories/[category]/[...page].astro", _page4],
    ["src/pages/categories/[...page].astro", _page5],
    ["src/pages/cuisines/[cuisine].astro", _page6],
    ["src/pages/cuisines/index.astro", _page7],
    ["src/pages/features.astro", _page8],
    ["src/pages/ingredients/index.astro", _page9],
    ["src/pages/instantsearch.astro", _page10],
    ["src/pages/posts/index.astro", _page11],
    ["src/pages/pricing.astro", _page12],
    ["src/pages/recipe/[slug].astro", _page13],
    ["src/pages/recipe/index.astro", _page14],
    ["src/pages/robots.txt.ts", _page15],
    ["src/pages/search/algolia.astro", _page16],
    ["src/pages/search/index.astro", _page17],
    ["src/pages/static/about/about-company.md", _page18],
    ["src/pages/static/legal/privacy-policy.md", _page19],
    ["src/pages/static/legal/terms-and-conditions.md", _page20],
    ["src/pages/index.astro", _page21]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "17283958-d033-4723-b193-d33a01d7972b"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
