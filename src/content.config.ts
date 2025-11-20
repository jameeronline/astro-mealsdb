import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const categoriesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/categories" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      date: z.string(),
      thumbnail: image(),
    }),
});

const cuisinesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/cuisines" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      date: z.string(),
      thumbnail: image(),
    }),
});

const recipesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    date: z.string(),
    thumbnail: z.string().url().or(z.literal("")),
    category: z.string(),
    cuisine: z.string(),
    source: z.string().url().or(z.literal("")).optional(),
    dateModified: z.string().optional(),
    video: z.string().url().or(z.literal("")).optional(),
    tags: z.array(z.string()),
    keywords: z.array(z.string()),
    rating: z.number().optional(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        measure: z.string(),
      })
    ),
    addons: z.object({
      servings: z.number().optional(),
      prepTime: z.number().optional(),
      cookTime: z.number().optional(),
      difficulty: z.string().optional(),
      totalTime: z.number().optional(),
    }),
    nutrition: z
      .object({
        calories: z.number().optional(),
        fat: z.number().optional(),
        carbs: z.number().optional(),
        fiber: z.number().optional(),
        sugar: z.number().optional(),
        protein: z.number().optional(),
      })
      .optional(),
  }),
});


// Blog Collections
const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      description: z.string(),
      cover: z.object({
        image: image().optional(),
        alt: z.string(),
      }),
      pubDate: z.date(),
      tags: z.array(z.string()),
      categories: z.array(z.string()),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
    }),
});

export const collections = {
  cuisines: cuisinesCollection,
  categories: categoriesCollection,
  recipes: recipesCollection,
  posts: posts,
};
