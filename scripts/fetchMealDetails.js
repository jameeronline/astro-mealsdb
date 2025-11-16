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
// const API_URL = "http://www.themealdb.com/api/json/v1/1/search.php?f=a";
// const OUTPUT_DIR = "./src/content/recipes"; // Output directory for MD files

// Configuration
const BASE_API_URL = "http://www.themealdb.com/api/json/v1/1";
const OUTPUT_DIR = "./src/content/recipes"; // Output directory for MD files

// Batch configuration - different ways to fetch recipes
const BATCH_CONFIG = {
  // Search by first letter (a-z) - Always enabled unless --categories-only or similar
  byFirstLetter: {
    enabled: !args.includes('--categories-only') && !args.includes('--areas-only') && !args.includes('--random-only'),
    letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    endpoint: 'search.php?f='
  },
  
  // Search by category
  // byCategory: {
  //   enabled: enableCategories,
  //   categories: ['Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian', 'Breakfast', 'Goat'],
  //   endpoint: 'filter.php?c='
  // },
  
  // Search by area/cuisine
  // byArea: {
  //   enabled: enableAreas,
  //   areas: ['American', 'British', 'Canadian', 'Chinese', 'Croatian', 'Dutch', 'Egyptian', 'French', 'Greek', 'Indian', 'Irish', 'Italian', 'Jamaican', 'Japanese', 'Kenyan', 'Malaysian', 'Mexican', 'Moroccan', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Thai', 'Tunisian', 'Turkish', 'Vietnamese', 'Ukrainian'],
  //   endpoint: 'filter.php?a='
  // },
  
  // Random meals (for variety)
  // random: {
  //   enabled: enableRandom,
  //   count: 20, // Number of random meals to fetch
  //   endpoint: 'random.php'
  // }
};

/**
 * Fetch data from a specific API endpoint
 */
async function fetchFromEndpoint(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`  Fetching: ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      
      // Add delay between requests to be respectful to the API
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      return data.meals;
    } catch (error) {
      console.error(`  Attempt ${i + 1} failed for ${url}:`, error.message);
      if (i === retries - 1) throw error;
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

/**
 * Fetch meal details by ID (for filtered results that only return basic info)
 */
async function fetchMealDetails(mealId) {
  try {
    const url = `${BASE_API_URL}/lookup.php?i=${mealId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error(`Error fetching meal ${mealId}:`, error.message);
    return null;
  }
}

/**
 * Fetch all meals using batch configuration
 */
async function fetchBatchData() {
  const allMeals = [];
  const processedIds = new Set(); // To avoid duplicates
  
  console.log("Starting batch data fetch...\n");
  
  // 1. Fetch by first letter
  if (BATCH_CONFIG.byFirstLetter.enabled) {
    console.log("🔤 Fetching meals by first letter...");
    for (const letter of BATCH_CONFIG.byFirstLetter.letters) {
      try {
        const url = `${BASE_API_URL}/${BATCH_CONFIG.byFirstLetter.endpoint}${letter}`;
        const meals = await fetchFromEndpoint(url);
        
        if (meals && meals.length > 0) {
          const newMeals = meals.filter(meal => !processedIds.has(meal.idMeal));
          allMeals.push(...newMeals);
          newMeals.forEach(meal => processedIds.add(meal.idMeal));
          console.log(`  ✓ Letter '${letter}': ${newMeals.length} new meals (${meals.length} total)`);
        } else {
          console.log(`  - Letter '${letter}': No meals found`);
        }
      } catch (error) {
        console.error(`  ✗ Letter '${letter}': ${error.message}`);
      }
    }
  }
  
  // 2. Fetch by category
  if (BATCH_CONFIG.byCategory.enabled) {
    console.log("\n🍽️  Fetching meals by category...");
    for (const category of BATCH_CONFIG.byCategory.categories) {
      try {
        const url = `${BASE_API_URL}/${BATCH_CONFIG.byCategory.endpoint}${encodeURIComponent(category)}`;
        const basicMeals = await fetchFromEndpoint(url);
        
        if (basicMeals && basicMeals.length > 0) {
          console.log(`  📥 Category '${category}': Fetching details for ${basicMeals.length} meals...`);
          
          for (const basicMeal of basicMeals) {
            if (!processedIds.has(basicMeal.idMeal)) {
              const fullMeal = await fetchMealDetails(basicMeal.idMeal);
              if (fullMeal) {
                allMeals.push(fullMeal);
                processedIds.add(fullMeal.idMeal);
              }
            }
          }
          
          const newCount = basicMeals.filter(meal => processedIds.has(meal.idMeal)).length;
          console.log(`  ✓ Category '${category}': ${newCount} meals processed`);
        } else {
          console.log(`  - Category '${category}': No meals found`);
        }
      } catch (error) {
        console.error(`  ✗ Category '${category}': ${error.message}`);
      }
    }
  }
  
  // 3. Fetch by area
  if (BATCH_CONFIG.byArea.enabled) {
    console.log("\n🌍 Fetching meals by area/cuisine...");
    for (const area of BATCH_CONFIG.byArea.areas) {
      try {
        const url = `${BASE_API_URL}/${BATCH_CONFIG.byArea.endpoint}${encodeURIComponent(area)}`;
        const basicMeals = await fetchFromEndpoint(url);
        
        if (basicMeals && basicMeals.length > 0) {
          console.log(`  📥 Area '${area}': Fetching details for ${basicMeals.length} meals...`);
          
          for (const basicMeal of basicMeals) {
            if (!processedIds.has(basicMeal.idMeal)) {
              const fullMeal = await fetchMealDetails(basicMeal.idMeal);
              if (fullMeal) {
                allMeals.push(fullMeal);
                processedIds.add(fullMeal.idMeal);
              }
            }
          }
          
          const newCount = basicMeals.filter(meal => processedIds.has(meal.idMeal)).length;
          console.log(`  ✓ Area '${area}': ${newCount} meals processed`);
        } else {
          console.log(`  - Area '${area}': No meals found`);
        }
      } catch (error) {
        console.error(`  ✗ Area '${area}': ${error.message}`);
      }
    }
  }
  
  // 4. Fetch random meals
  if (BATCH_CONFIG.random.enabled) {
    console.log("\n🎲 Fetching random meals...");
    for (let i = 0; i < BATCH_CONFIG.random.count; i++) {
      try {
        const url = `${BASE_API_URL}/${BATCH_CONFIG.random.endpoint}`;
        const meals = await fetchFromEndpoint(url);
        
        if (meals && meals.length > 0 && !processedIds.has(meals[0].idMeal)) {
          allMeals.push(meals[0]);
          processedIds.add(meals[0].idMeal);
          console.log(`  ✓ Random meal ${i + 1}: ${meals[0].strMeal}`);
        } else {
          console.log(`  - Random meal ${i + 1}: Duplicate or no meal found`);
        }
      } catch (error) {
        console.error(`  ✗ Random meal ${i + 1}: ${error.message}`);
      }
    }
  }
  
  console.log(`\n📊 Total unique meals collected: ${allMeals.length}`);
  return allMeals;
}

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
    description: generateDescription(item),
    slug: slugify(item.strMeal || `meal-${item.idMeal || "unknown"}`),
    date: item.date || new Date().toISOString(),
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
