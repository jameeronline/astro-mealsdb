import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const cuisinesCollection = defineCollection({
  loader: file("src/content/meals-cuisine.json"),
  schema: z.object({
    id: z.number(),
    value: z.string(),
    label: z.string(),
  }),
});

const categoriesCollection = defineCollection({
  loader: file("src/content/meals-categories.json"),
  schema: z.object({
    id: z.number(),
    value: z.string(),
    label: z.string(),
  }),
});

const recipesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    thumbnail: z.string().url(),
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

export const collections = {
  cuisines: cuisinesCollection,
  categories: categoriesCollection,
  recipes: recipesCollection,
};
