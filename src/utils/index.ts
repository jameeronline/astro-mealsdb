import { getCollection, getEntries, getEntry } from "astro:content";

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

export function getCategoryDetails(identifier: string) {
  const normalized = slugify(identifier);
  return categories.find(
    (category) =>
      slugify(category.data.title) === normalized ||
      slugify(category.data.slug) === normalized
  );
}

export function getCuisineDetails(identifier: string) {
  const normalized = slugify(identifier);
  return cuisines.find(
    (cuisine) =>
      slugify(cuisine.data.title) === normalized ||
      slugify(cuisine.data.slug) === normalized
  );
}

export function getIngredientDetails(identifier: string) {
  const normalized = slugify(identifier);
  return ingredients.find(
    (ingredient) =>
      slugify(ingredient.data.title) === normalized ||
      slugify(ingredient.data.slug) === normalized
  );
}

//export const featuredMeals = recipes.filter(recipe => recipe.data.featured);
