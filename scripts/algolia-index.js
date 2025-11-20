// scripts/index-algolia.js
import { algoliasearch } from 'algoliasearch';
import { glob } from 'glob';
import matter from 'gray-matter';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
const ALGOLIA_APP_ID = process.env.PUBLIC_ALGOLIA_APP_ID;
const ALGOLIA_ADMIN_KEY = process.env.PUBLIC_ALGOLIA_ADMIN_KEY;

if (!ALGOLIA_APP_ID) {
  console.error('❌ Error: PUBLIC_ALGOLIA_APP_ID is not set in environment variables');
  console.log('Please add PUBLIC_ALGOLIA_APP_ID to your .env file');
  process.exit(1);
}

if (!ALGOLIA_ADMIN_KEY) {
  console.error('❌ Error: PUBLIC_ALGOLIA_ADMIN_KEY is not set in environment variables');
  console.log('Please add PUBLIC_ALGOLIA_ADMIN_KEY to your .env file');
  process.exit(1);
}

console.log('✓ Environment variables loaded');
console.log(`✓ Using Algolia App ID: ${ALGOLIA_APP_ID}`);

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);

console.log('Algolia Indexing Started...');

async function indexContent() {
  try {
    const files = await glob('src/content/recipes/*.md');
    
    if (files.length === 0) {
      console.warn('⚠️  No markdown files found in src/content/recipes/');
      return;
    }
    
    console.log(`Found ${files.length} recipe files to index`);
    
    const records = files.map((file, idx) => {
      const content = fs.readFileSync(file, 'utf-8');
      const { data, content: body } = matter(content);
      
      return {
        objectID: data.id || idx,
        title: data.title || 'Untitled Recipe',
        slug: data.slug || '',
        category: data.category || '',
        cuisine: data.cuisine || '',
        tags: data.tags || [],
        thumbnail: data.thumbnail || '',
        isDifficulty: (data.addons.prepTime || 0) + (data.addons.cookTime || 0) > 60 ? true : false,
        ...data
      };
    });

    // Use the new API syntax for Algolia v5+
    await client.saveObjects({
      indexName: 'astro_mealsdb_content',
      objects: records
    });
    
    console.log(`✅ Successfully indexed ${records.length} records`);
  } catch (error) {
    console.error('❌ Error during indexing:', error);
    process.exit(1);
  }
}

indexContent();