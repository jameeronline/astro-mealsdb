import { getCollection } from "astro:content";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

export const categories = await getCollection("categories");
export const cuisines = await getCollection("cuisines");
export const ingredients = await getCollection("ingredients");
export const recipes = await getCollection("recipes");

export function getRandomMeals(count: number) {
  const shuffled = [...recipes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

//export const featuredMeals = recipes.filter(recipe => recipe.data.featured);
