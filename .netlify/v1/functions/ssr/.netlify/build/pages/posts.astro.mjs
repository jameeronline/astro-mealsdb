import { $ as $$Layout } from '../chunks/Layout_DYrI7uqB.mjs';
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute, e as renderScript } from '../chunks/astro/server_eHSPLay3.mjs';
import { g as getCollection } from '../chunks/_astro_content_CLrRkF0D.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://astro-meals.netlify.app/");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const url = new URL(Astro2.request.url);
  const pageParam = url.searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  const sortParam = url.searchParams.get("sort");
  const allPosts = await getCollection("posts");
  const sortedPosts = allPosts.sort(
    (a, b) => sortParam === "newest" ? new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime() : new Date(a.data.pubDate).getTime() - new Date(b.data.pubDate).getTime()
  );
  const postsPerPage = 2;
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const validPage = Math.max(1, Math.min(currentPage, totalPages));
  const start = (validPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const posts = sortedPosts.slice(start, end);
  const hasNext = validPage < totalPages;
  const hasPrev = validPage > 1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog Posts", "description": "Read the latest articles and updates on our blog.", "data-astro-cid-fjqfnjxi": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between mb-4" data-astro-cid-fjqfnjxi> <h1 data-astro-cid-fjqfnjxi>Blog Posts - Page ${validPage} of ${totalPages}</h1> <form method="get" id="sorting-form" data-astro-cid-fjqfnjxi> <select name="sort" id="sorting"${addAttribute(url.searchParams.get("sort") || "newest", "value")} data-astro-cid-fjqfnjxi> <option value="newest"${addAttribute(url.searchParams.get("sort") !== "oldest", "selected")} data-astro-cid-fjqfnjxi>Newest First</option> <option value="oldest"${addAttribute(url.searchParams.get("sort") === "oldest", "selected")} data-astro-cid-fjqfnjxi>Oldest First</option> </select> <input type="hidden" name="page"${addAttribute(validPage, "value")} data-astro-cid-fjqfnjxi> </form> </div> <div class="posts" data-astro-cid-fjqfnjxi> ${posts.map((post) => renderTemplate`<article data-astro-cid-fjqfnjxi> <h2 data-astro-cid-fjqfnjxi> <a${addAttribute(`/blog/${post.slug}`, "href")} data-astro-cid-fjqfnjxi>${post.data.title}</a> </h2> <p data-astro-cid-fjqfnjxi>${new Date(post.data.pubDate).toLocaleDateString()}</p> <p data-astro-cid-fjqfnjxi>${post.data.description}</p> </article>`)} </div> <nav class="pagination" data-astro-cid-fjqfnjxi> ${hasPrev && renderTemplate`<a${addAttribute(`?${(() => {
    const params = new URLSearchParams(url.searchParams);
    params.set("page", (validPage - 1).toString());
    return params.toString();
  })()}`, "href")} data-astro-cid-fjqfnjxi>← Previous</a>`} <div class="page-numbers" data-astro-cid-fjqfnjxi> ${Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => renderTemplate`<a${addAttribute(`?${(() => {
    const params = new URLSearchParams(url.searchParams);
    params.set("page", num.toString());
    return params.toString();
  })()}`, "href")}${addAttribute(num === validPage ? "active" : "", "class")} data-astro-cid-fjqfnjxi> ${num} </a>`)} </div> ${hasNext && renderTemplate`<a${addAttribute(`?${(() => {
    const params = new URLSearchParams(url.searchParams);
    params.set("page", (validPage + 1).toString());
    return params.toString();
  })()}`, "href")} data-astro-cid-fjqfnjxi>Next →</a>`} </nav> ${renderScript($$result2, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/pages/posts/index.astro?astro&type=script&index=0&lang.ts")}  ` })}`;
}, "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/pages/posts/index.astro", void 0);

const $$file = "/Users/jamalmohamedameer/Documents/astro-sites/astro-mealsdb/src/pages/posts/index.astro";
const $$url = "/posts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
