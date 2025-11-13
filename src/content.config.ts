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
    ingredients: z.array(
      z.object({
        name: z.string(),
        measure: z.string(),
      })
    ),
    addons: z.object({
      servings: z.string().optional(),
      prepTime: z.string().optional(),
      cookTime: z.string().optional(),
    }),
    nutrition: z
      .object({
        calories: z.string().optional(),
        fat: z.string().optional(),
        carbs: z.string().optional(),
        protein: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  cuisines: cuisinesCollection,
  categories: categoriesCollection,
  recipes: recipesCollection,
};
