#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get recipe title from command line
const title = process.argv.slice(2).join(' ');

if (!title) {
  console.error('❌ Please provide a recipe title');
  console.log('Usage: npm run new:recipe "Recipe Title"');
  process.exit(1);
}

// Create slug from title
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

// Get today's date
const today = new Date().toISOString().split('T')[0];

// Recipe template
const template = `---
title: "${title}"
description: ""
publishDate: ${today}
lastUpdated: ${today}

categories: 
  - dinner
cuisines:
  - american
ingredients:
  - chicken

dietary: []

difficulty: easy
prepTime: 15
cookTime: 30
totalTime: 45
servings: 4

image:
  src: "./images/${slug}.jpg"
  alt: "${title}"
featured: false

nutrition:
  calories: 0
  protein: 0
  carbs: 0
  fat: 0

tags: []
author: "Your Name"
---

## Ingredients

- 

## Instructions

1. 

## Notes

`;

// Create the file
const recipesDir = path.join(__dirname, '../src/content/recipes');
const filePath = path.join(recipesDir, `${slug}.mdx`);

// Check if file already exists
if (fs.existsSync(filePath)) {
  console.error(`❌ Recipe "${slug}.mdx" already exists!`);
  process.exit(1);
}

// Create the file
fs.writeFileSync(filePath, template);

console.log(`✅ Created new recipe: ${slug}.mdx`);
console.log(`📝 Edit at: src/content/recipes/${slug}.mdx`);