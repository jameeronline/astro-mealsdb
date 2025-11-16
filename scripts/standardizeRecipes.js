import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to recipes directory
const recipesDir = path.join(__dirname, '..', 'src', 'content', 'recipes');

// Function to generate standardized description
function generateStandardDescription(frontmatter) {
    const { title, category, cuisine, ingredients } = frontmatter;
    
    // Get first 3 key ingredients
    const keyIngredients = ingredients
        .slice(0, 3)
        .map(ing => ing.name)
        .join(', ');
    
    // Template variations based on category
    const templates = {
        'Dessert': `Delicious ${title} recipe inspired by ${cuisine} cuisine. Made with ${keyIngredients} for the perfect dessert.`,
        'Chicken': `Learn to make authentic ${title} - a traditional ${cuisine} chicken featuring ${keyIngredients}.`,
        'Beef': `${title}: A flavorful ${category.toLowerCase()} recipe from ${cuisine} cuisine with ${keyIngredients}. Step-by-step recipe included.`,
        'Seafood': `Fresh ${title} recipe from ${cuisine} cuisine. Made with ${keyIngredients} for an authentic seafood experience.`,
        'Vegetarian': `Healthy ${title} recipe inspired by ${cuisine} cooking. Features ${keyIngredients} for a nutritious vegetarian meal.`,
        'Vegan': `Plant-based ${title} recipe from ${cuisine} cuisine. Made with ${keyIngredients} for a delicious vegan dish.`,
        'Pasta': `Authentic ${title} recipe from ${cuisine} cuisine. Made with ${keyIngredients} for the perfect pasta dish.`,
        'Side': `Classic ${title} side dish from ${cuisine} cuisine. Made with ${keyIngredients} to complement any meal.`,
        'Starter': `Appetizing ${title} starter from ${cuisine} cuisine. Features ${keyIngredients} for the perfect beginning to your meal.`,
        'Breakfast': `Delicious ${title} breakfast recipe from ${cuisine} cuisine. Made with ${keyIngredients} to start your day right.`
    };
    
    // Use category-specific template or default
    return templates[category] || `Homemade ${title} recipe inspired by ${cuisine} cuisine. Made with fresh ${keyIngredients} for an authentic culinary experience.`;
}

// Function to clean and standardize instructions
function standardizeInstructions(content) {
    // Extract instructions section
    const instructionsMatch = content.match(/## Instructions\s*\n\n([\s\S]*?)(?=\n##|\n$|$)/);
    if (!instructionsMatch) {
        return content;
    }
    
    let instructions = instructionsMatch[1].trim();
    
    // Split into steps and clean them
    let steps = instructions
        .split(/\n(?=\d+\.)/) // Split on numbered items
        .map(step => step.trim())
        .filter(step => step.length > 0)
        .map((step, index) => {
            // Remove existing numbering
            step = step.replace(/^\d+\.\s*/, '');
            
            // Clean up common formatting issues
            step = step
                .replace(/\s+/g, ' ') // Multiple spaces to single space
                .replace(/\.\s*$/, '') // Remove trailing periods
                .trim();
            
            // Ensure step starts with capital letter
            if (step.length > 0) {
                step = step.charAt(0).toUpperCase() + step.slice(1);
            }
            
            return step;
        })
        .filter(step => step.length > 0);
    
    // Remove duplicate or very similar steps
    const cleanSteps = [];
    for (let i = 0; i < steps.length; i++) {
        const currentStep = steps[i].toLowerCase();
        const isDuplicate = cleanSteps.some(existing => {
            const similarity = calculateSimilarity(existing.toLowerCase(), currentStep);
            return similarity > 0.8;
        });
        
        if (!isDuplicate && steps[i].length > 10) { // Minimum length filter
            cleanSteps.push(steps[i]);
        }
    }
    
    // Reconstruct numbered list
    const numberedInstructions = cleanSteps
        .map((step, index) => `${index + 1}. ${step}.`)
        .join('\n');
    
    // Replace in original content
    return content.replace(
        /## Instructions\s*\n\n[\s\S]*?(?=\n##|\n$|$)/,
        `## Instructions\n\n${numberedInstructions}`
    );
}

// Simple string similarity function
function calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
}

// Levenshtein distance calculation
function levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

// Main function to process all recipe files
async function standardizeAllRecipes() {
    try {
        // Read all markdown files in recipes directory
        const files = fs.readdirSync(recipesDir).filter(file => file.endsWith('.md'));
        
        console.log(`Found ${files.length} recipe files to process...`);
        
        let processedCount = 0;
        let errorCount = 0;
        
        for (const file of files) {
            try {
                const filePath = path.join(recipesDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                
                // Parse frontmatter
                const { data: frontmatter, content } = matter(fileContent);
                
                // Generate standardized description
                const newDescription = generateStandardDescription(frontmatter);
                
                // Update frontmatter
                frontmatter.description = newDescription;
                
                // Standardize instructions in content
                const standardizedContent = standardizeInstructions(content);
                
                // Rebuild file content
                const newFileContent = matter.stringify(standardizedContent, frontmatter);
                
                // Write back to file
                fs.writeFileSync(filePath, newFileContent, 'utf-8');
                
                processedCount++;
                console.log(`✓ Processed: ${file}`);
                
            } catch (error) {
                errorCount++;
                console.error(`✗ Error processing ${file}:`, error.message);
            }
        }
        
        console.log(`\n=== Standardization Complete ===`);
        console.log(`Successfully processed: ${processedCount} files`);
        console.log(`Errors: ${errorCount} files`);
        
    } catch (error) {
        console.error('Error reading recipes directory:', error);
    }
}

// Run the standardization
standardizeAllRecipes();