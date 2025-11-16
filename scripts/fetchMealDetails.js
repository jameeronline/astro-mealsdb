// scripts/fetchAndGenerateMD.js
import fs from "fs/promises";
import path from "path";

/**
 * Convert a string to a URL-friendly slug
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

// Configuration
const API_URL = "http://www.themealdb.com/api/json/v1/1/search.php?f=a";
const OUTPUT_DIR = "./src/content/recipes"; // Output directory for MD files

/**
 * Fetch bulk data from API
 */
async function fetchBulkData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

/**
 * Convert data object to frontmatter + markdown content
 */
function createMarkdownContent(item) {
  // Process ingredients with better structure
  const ingredients = Object.entries(item)
    .filter(
      ([key, value]) => key.startsWith("strIngredient") && value && value.trim()
    )
    .map(([key, value]) => {
      const index = key.replace("strIngredient", "");
      const measure = item[`strMeasure${index}`];
      return {
        name: value.trim(),
        measure: measure && measure.trim() ? measure.trim() : "",
      };
    })
    .filter((ingredient) => ingredient.name);

  // Process tags properly
  const tags = item.strTags
    ? item.strTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  // Generate keywords from category, cuisine, and main ingredients
  const keywords = [
    item.strCategory,
    item.strArea,
    ...ingredients.slice(0, 5).map(ing => ing.name), // First 5 ingredients
    ...tags.slice(0, 3) // First 3 tags
  ].filter(Boolean).map(keyword => keyword.toLowerCase());

  const frontmatter = {
    id: item.idMeal || "unknown",
    title: item.strMeal || "Untitled",
    slug: slugify(item.strMeal || `meal-${item.idMeal || "unknown"}`),
    date: item.date || new Date().toISOString().slice(0, 19).replace('T', ' '),
    thumbnail: item.strMealThumb || "",
    category: item.strCategory || "Unknown",
    cuisine: item.strArea || "Unknown",
    source: item.strSource || "",
    dateModified: item.dateModified || "",
    video: item.strYoutube || "",
    tags: tags,
    keywords: keywords,
    rating: 4.5, // Numeric rating out of 5 (default since API doesn't provide)
    ingredients: ingredients,
    // Add addons info if available
    addons: {
      servings: 4, // Numeric value number of servings
      prepTime: Math.floor(Math.random() * 41) + 10, // Random value between 10-50 minutes
      cookTime: Math.floor(Math.random() * 81) + 10, // Random value between 10-90 minutes
      difficulty: "medium", // Easy, medium, hard
      totalTime: Math.floor(Math.random() * 41) + 10 + Math.floor(Math.random() * 81) + 10, // prepTime + cookTime in minutes
    },
    nutrition: {
      calories: 350, // Estimated calories per serving
      fat: 12, // Grams of fat
      carbs: 45, // Grams of carbohydrates
      fiber: 6, // Grams of dietary fiber
      sugar: 8, // Grams of sugar
      protein: 25, // Grams of protein
    },
  };

  // Build frontmatter with proper YAML formatting
  const frontmatterStr = buildYamlFrontmatter(frontmatter);

  // Build markdown content with ordered list for instructions
  let content = "";
  if (item.strInstructions) {
    // Split instructions by common separators and create ordered list
    const instructions = item.strInstructions
      .split(/\.\s+|\n+|\r\n+/) // Split by period+space, newlines
      .map((step) => step.trim())
      .filter((step) => step.length > 0) // Remove empty steps
      .map((step, index) => {
        // Ensure step ends with period if it doesn't already
        const cleanStep = step.endsWith(".") ? step : step + ".";
        return `${index + 1}. ${cleanStep}`;
      });

    content = instructions.join("\n");
  }

  return `---
${frontmatterStr}
---

${content}
`;
}

/**
 * Build YAML frontmatter string with proper array formatting
 */
function buildYamlFrontmatter(frontmatter) {
  const formatValue = (key, value) => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return `${key}: []`;
      }

      // For simple arrays (strings/numbers)
      if (typeof value[0] !== "object") {
        const formattedItems = value.map(
          (item) => `"${String(item).replace(/"/g, '\\"')}"`
        );
        return `${key}: [${formattedItems.join(", ")}]`;
      }

      // For complex arrays (objects)
      const formattedItems = value
        .map((item) => {
          const objStr = Object.entries(item)
            .map(([k, v]) => `    ${k}: "${String(v).replace(/"/g, '\\"')}"`)
            .join("\n");
          return `  - ${objStr.replace(/^    /, "")}`;
        })
        .join("\n");

      return `${key}:\n${formattedItems}`;
    }

    if (typeof value === "object" && value !== null) {
      const objStr = Object.entries(value)
        .map(([k, v]) => {
          // Handle numeric values in objects
          if (typeof v === "number") {
            return `  ${k}: ${v}`;
          }
          return `  ${k}: "${String(v).replace(/"/g, '\\"')}"`;
        })
        .join("\n");
      return `${key}:\n${objStr}`;
    }

    // Handle numeric values without quotes
    if (typeof value === "number") {
      return `${key}: ${value}`;
    }

    return `${key}: "${String(value).replace(/"/g, '\\"')}"`;
  };

  return Object.entries(frontmatter)
    .map(([key, value]) => formatValue(key, value))
    .join("\n");
}

/**
 * Generate filename from title or ID
 */
function generateFilename(item, index) {
  // Use slug if available, otherwise create from title or use ID
  if (item.slug) {
    return `${item.slug}.md`;
  }

  if (item.strMeal) {
    return `${slugify(item.strMeal)}.md`;
  }

  return `post-${item.idMeal || index}.md`;
}

/**
 * Ensure directory exists
 */
async function ensureDirectory(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

/**
 * Write markdown file
 */
async function writeMarkdownFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log(`✓ Created: ${filePath}`);
  } catch (error) {
    console.error(`✗ Failed to write ${filePath}:`, error);
  }
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log("Fetching data from API...");
    const data = await fetchBulkData();

    // Handle both array and object responses
    const items = Array.isArray(data)
      ? data
      : data.results || data.items || [data];

    console.log(`Found ${items.length} items`);

    // Ensure output directory exists
    await ensureDirectory(OUTPUT_DIR);

    // Process each item
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const filename = generateFilename(item, i);
      const filePath = path.join(OUTPUT_DIR, filename);
      const content = createMarkdownContent(item);

      await writeMarkdownFile(filePath, content);
    }

    console.log(`\n✓ Successfully generated ${items.length} markdown files!`);
  } catch (error) {
    console.error("Error in main execution:", error);
    process.exit(1);
  }
}

// Run the script
main();
