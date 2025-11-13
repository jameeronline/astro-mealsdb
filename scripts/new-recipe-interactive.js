#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import prompts from "prompts";
import pc from "picocolors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to create slug
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Get available categories, cuisines from content collections
function getAvailableOptions(type) {
  const dir = path.join(__dirname, `../src/content/${type}`);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.(md|mdx)$/, ""));
}

async function main() {
  console.log(pc.cyan("\n🍳 Recipe Generator\n"));

  const categories = getAvailableOptions("categories");
  const cuisines = getAvailableOptions("cuisines");
  if (cuisines.length === 0) {
    cuisines.push("american", "italian", "mexican", "asian", "mediterranean");
  }
  const ingredients = getAvailableOptions("ingredients");

  const questions = [
    {
      type: "text",
      name: "title",
      message: "Recipe title:",
      validate: (value) => value.length > 0 || "Title is required",
    },
    {
      type: "text",
      name: "description",
      message: "Short description:",
      validate: (value) => value.length > 0 || "Description is required",
    },
    {
      type: "multiselect",
      name: "categories",
      message: "Select categories:",
      choices: categories.map((cat) => ({ title: cat, value: cat })),
      hint: "- Space to select. Return to submit",
    },
    {
      type: "multiselect",
      name: "cuisines",
      message: "Select cuisines:",
      choices: cuisines.map((cui) => ({ title: cui, value: cui })),
      hint: "- Space to select. Return to submit",
    },
    {
      type: "select",
      name: "difficulty",
      message: "Difficulty level:",
      choices: [
        { title: "Easy", value: "easy" },
        { title: "Medium", value: "medium" },
        { title: "Hard", value: "hard" },
      ],
    },
    {
      type: "number",
      name: "prepTime",
      message: "Prep time (minutes):",
      initial: 15,
    },
    {
      type: "number",
      name: "cookTime",
      message: "Cook time (minutes):",
      initial: 30,
    },
    {
      type: "number",
      name: "servings",
      message: "Number of servings:",
      initial: 4,
    },
    {
      type: "multiselect",
      name: "ingredients",
      message: "Select main ingredients:",
      choices: ingredients
        .slice(0, 20)
        .map((ing) => ({ title: ing, value: ing })),
      hint: "- Select main ingredients only",
    },
    {
      type: "confirm",
      name: "featured",
      message: "Mark as featured?",
      initial: false,
    },
  ];

  const answers = await prompts(questions);

  // Handle if user cancels
  if (!answers.title) {
    console.log(pc.red("\n❌ Cancelled"));
    process.exit(0);
  }

  const slug = slugify(answers.title);
  const today = new Date().toISOString().split("T")[0];
  const totalTime = (answers.prepTime || 0) + (answers.cookTime || 0);

  // Format arrays for YAML
  const formatArray = (arr, indent = 2) => {
    if (!arr || arr.length === 0) return "[]";
    return (
      "\n" + arr.map((item) => " ".repeat(indent) + "- " + item).join("\n")
    );
  };

  const template = `---
title: "${answers.title}"
description: "${answers.description}"
publishDate: ${today}
lastUpdated: ${today}

categories:${formatArray(answers.categories)}
cuisines:${formatArray(answers.cuisines)}
ingredients:${formatArray(answers.ingredients)}

dietary: []

difficulty: ${answers.difficulty}
prepTime: ${answers.prepTime}
cookTime: ${answers.cookTime}
totalTime: ${totalTime}
servings: ${answers.servings}

image:
  src: "./images/${slug}.jpg"
  alt: "${answers.title}"
featured: ${answers.featured}

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
  const recipesDir = path.join(__dirname, "../src/content/recipes");
  const filePath = path.join(recipesDir, `${slug}.md`);

  // Check if directory exists
  if (!fs.existsSync(recipesDir)) {
    fs.mkdirSync(recipesDir, { recursive: true });
  }

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.error(pc.red(`\n❌ Recipe "${slug}.md" already exists!`));
    process.exit(1);
  }

  // Create the file
  fs.writeFileSync(filePath, template);

  console.log(pc.green(`\n✅ Recipe created successfully!`));
  console.log(pc.gray(`📝 File: src/content/recipes/${slug}.md`));
  console.log(pc.gray(`🔗 URL: /recipes/${slug}\n`));
}

main().catch(console.error);
