// scripts/fetchAndGenerateMD.js
import fs from "fs/promises";
import path from "path";

/**
 * Convert a string to a URL-friendly slug
 */
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Configuration
const API_URL = "http://www.themealdb.com/api/json/v1/1/list.php?a=list";
const OUTPUT_DIR = "./src/content/cuisines"; // Output directory for MD files

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
  // Extract frontmatter fields (customize based on your data structure)
  const frontmatter = {
    title: item.strArea || "Untitled",
    slug: slugify(item.strArea || "untitled"),
    date: item.date || new Date().toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, ''),
    thumbnail: item.strThumb || `../../assets/cuisines/${slugify(item.strArea || "untitled")}.png`,
  };

  // Build frontmatter
  const frontmatterStr = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: [${value.map((v) => `"${v}"`).join(", ")}]`;
      }
      return `${key}: "${value}"`;
    })
    .join("\n");

  // Build markdown content
  const content = item.strDescription || item.body || "";

  return `---
${frontmatterStr}
---

${content}
`;
}

/**
 * Generate filename from title or ID
 */
function generateFilename(item, index) {
  // Use slug if available, otherwise create from title or use ID
  if (item.slug) {
    return `${item.slug}.md`;
  }

  if (item.strArea) {
    return `${slugify(item.strArea)}.md`;
  }

  return `post-${item.id || index}.md`;
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
