// src/data/index.js

// Helper function to parse ingredient strings into objects
// This is a basic parser and might need refinement for complex strings
const parseIngredientString = (ingredientString, recipeId, index) => {
    // Attempt to extract quantity and unit. This is a simplification.
    const match = ingredientString.match(/^(\d+(\.\d+)?)\s*([a-zA-Z]+)?\s*(.*)$/);
    let quantity = 1;
    let unit = 'count';
    let name = ingredientString.trim();

    if (match) {
        quantity = parseFloat(match[1]);
        unit = match[3] || 'count'; // If no unit, default to 'count'
        name = match[4].trim();
    } else {
        // Fallback for strings that don't match the pattern (e.g., "idk bro")
        name = ingredientString.trim();
        quantity = 1;
        unit = 'count';
    }

    // Basic type inference and placeholder image
    let type = 'Misc';
    let image = 'https://placehold.co/50x50/CCCCCC/000000?text=?';

    if (name.toLowerCase().includes('butter') || name.toLowerCase().includes('milk') || name.toLowerCase().includes('cream')) {
        type = 'Dairy';
        image = 'https://placehold.co/50x50/FFEFD5/000000?text=Dairy';
    } else if (name.toLowerCase().includes('sugar') || name.toLowerCase().includes('syrup')) {
        type = 'Sweetener';
        image = 'https://placehold.co/50x50/FFFFFF/000000?text=Sweet';
    } else if (name.toLowerCase().includes('flour') || name.toLowerCase().includes('baking powder')) {
        type = 'Dry Goods';
        image = 'https://placehold.co/50x50/F0E68C/000000?text=Dry';
    } else if (name.toLowerCase().includes('meat') || name.toLowerCase().includes('chicken') || name.toLowerCase().includes('pork')) {
        type = 'Protein';
        image = 'https://placehold.co/50x50/DDA0DD/000000?text=Meat';
    } else if (name.toLowerCase().includes('potato') || name.toLowerCase().includes('onion') || name.toLowerCase().includes('carrot')) {
        type = 'Vegetable';
        image = 'https://placehold.co/50x50/98FB98/000000?text=Veg';
    } else if (name.toLowerCase().includes('egg')) {
        type = 'Protein';
        image = 'https://placehold.co/50x50/F5DEB3/000000?text=Egg';
    }


    return {
        id: `${recipeId}-ing${index + 1}`, // Unique ID for each ingredient
        name: name,
        type: type,
        image: image,
        quantity: quantity,
        unit: unit,
    };
};

export default [
    // Group's Recipes (converted to detailed ingredient objects)
    {
        id: 1,
        title: "Pancakes",
        image: "https://cdn.loveandlemons.com/wp-content/uploads/2025/01/pancake-recipe-500x500.jpg",
        author: "your best man",
        stats: {
            cuisine: "Western",
            protein: "Low",
            calories: "None",
            prepTime: "10 mins",
            cookTime: "10 mins",
            totalTime: "20 mins"
        },
        ingredients: [
            "195g Butter",
            "2 tablespoons sugar",
            "1 tablespoon baking powder",
            "1/2 teaspoon of fine sea salt",
            "295ml milk",
            "1 egg",
            "70g unsalted butter", // Duplicate, but keeping as per original string
            "2 teaspoon vanilla extract"
        ].map((ing, idx) => parseIngredientString(ing, 'pancakes', idx)),
        directions: [
            "Melt the butter and set it aside. In a medium bowl, whisk together the flour, sugar, baking powder, and salt.",
            "In a separate bowl, whisk together milk, egg, melted butter, and vanilla extract.",
            "Create a well in the center of your dry ingredients. Pour in the milk mixture and stir gently with a fork.",
            "Let the batter rest until it begins to bubble.",
            "Preheat a skillet over medium heat. Sprinkle a few drops of water to test readiness.",
            "Brush with melted butter if desired. Scoop batter onto skillet and spread into circles.",
            "Cook 1–2 mins until edges are dry and bubbles form. Flip and cook another 1–2 mins.",
            "Serve with warm syrup, butter, and berries."
        ]
    },
    {
        id: 2,
        title: "Burger",
        image: "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
        author: "your best man",
        stats: {
            cuisine: "Western",
            protein: "Low",
            calories: "None",
            prepTime: "10 mins",
            cookTime: "10 mins",
            totalTime: "20 mins"
        },
        ingredients: [
            "1 patty of ground beef",
            "1 burger bun",
            "1 slice of cheddar cheese",
            "1 tomato slice",
            "1 lettuce leaf",
            "1 tablespoon ketchup",
            "1 tablespoon mustard"
        ].map((ing, idx) => parseIngredientString(ing, 'burger', idx)), // Populating for better demo
        directions: [
            "1. Cook patty to desired doneness.",
            "2. Toast bun halves.",
            "3. Assemble burger with cheese, tomato, lettuce, ketchup, and mustard.",
            "4. Serve immediately."
        ]
    },
    {
        id: 3,
        title: "Kaeng Massaman",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK_O9cpxDRo1bDY_OP382RZqbLlUWjIRWNDQ&s",
        author: "your peep",
        stats: {
            cuisine: "Thai", // Changed to Thai
            protein: "Medium", // Changed
            calories: "High", // Changed
            prepTime: "10 mins",
            cookTime: "30–40 mins",
            totalTime: "~50 mins"
        },
        ingredients: [
            "400g meat, cut into bite-sized chunks",
            "300g potatoes, cut into bite-sized chunks",
            "1 red onion, diced",
            "A handful of roasted unsalted peanuts", // Hard to parse quantity, unit
            "3–5 green cardamom pods",
            "1 stick of ceylon cinnamon",
            "2 star anise",
            "400ml coconut milk",
            "60g massaman curry paste", // Simplified from 60-75g (3-4 tbsp)
            "1 tbsp palm sugar",
            "1 tbsp fish sauce", // Removed "to taste" for parsing
            "1 tbsp tamarind paste"
        ].map((ing, idx) => parseIngredientString(ing, 'massaman', idx)),
        directions: [
            "Bring the coconut milk to a boil.",
            "Add and dissolve the curry paste.",
            "Add the remaining ingredients.",
            "Simmer until meat and potatoes are fully cooked.",
            "Serve hot with jasmine rice."
        ]
    },
    {
        id: 4,
        title: "100 Biscuit Base",
        image: "https://images.unsplash.com/photo-1522237825450-a0c44eecddb4?q=80&w=2848?auto=format&fit=crop&w=800&q=80",
        author: "your peep",
        stats: {
            cuisine: "Western",
            protein: "Low",
            calories: "None",
            prepTime: "15 mins",
            cookTime: "10–15 mins",
            totalTime: "30 mins"
        },
        ingredients: [
            "500g butter or margarine",
            "1 tin condensed milk",
            "1 cup sugar",
            "5 cups self-raising flour", // Removed "(substitute 1/2 cup with custard powder for less floury texture)"
            "Optional flavourings of your choice" // Hard to parse, will simplify
        ].map((ing, idx) => parseIngredientString(ing, 'biscuit', idx)),
        directions: [
            "Cream butter and sugar until light and fluffy.",
            "Add condensed milk and sifted flour. Mix into a dough.",
            "Add desired flavourings.",
            "Roll into teaspoon-sized balls and press with fork dipped in flour.",
            "Place on baking tray with parchment paper.",
            "Bake at 180°C for 10–15 minutes or until golden brown.",
            "Freeze dough if not baking immediately."
        ]
    },

    // My Recipes (transformed to group's format, ingredients already detailed)
    {
        id: 5, // Changed ID to avoid conflict
        title: 'Shoyu Ramen', // Changed from name to title
        image: 'https://placehold.co/60x60/ADD8E6/000000?text=Ramen',
        author: 'AI Chef', // Added author
        stats: { // Added stats
            cuisine: "Japanese",
            protein: "High",
            calories: "Medium",
            prepTime: "20 mins",
            cookTime: "25 mins",
            totalTime: "45 mins"
        },
        ingredients: [
            {
                id: 'ing1', name: 'Noodles', type: 'Packet', image: 'https://placehold.co/50x50/F0E68C/000000?text=Noodle', quantity: 200, unit: 'g',
            },
            {
                id: 'ing2', name: 'Pork Chashu', type: 'Slice', image: 'https://placehold.co/50x50/DDA0DD/000000?text=Pork', quantity: 100, unit: 'g',
            },
            {
                id: 'ing3', name: 'Soft-boiled Egg', type: 'Individual', image: 'https://placehold.co/50x50/FFFACD/000000?text=Egg', quantity: 1, unit: 'count',
            },
            {
                id: 'ing4', name: 'Scallions', type: 'Fresh', image: 'https://placehold.co/50x50/98FB98/000000?text=Scallion', quantity: 20, unit: 'g',
            },
            {
                id: 'ing5', name: 'Seaweed', type: 'Sheet', image: 'https://placehold.co/50x50/A2CD5A/000000?text=Seaweed', quantity: 1, unit: 'sheet',
            }
        ],
        directions: [ // Changed from steps to directions
            '1. Prepare the ramen broth according to package instructions.',
            '2. Cook ramen noodles in a separate pot of boiling water until al dente.',
            '3. While noodles cook, slice pork chashu and soft-boiled eggs.',
            '4. Drain noodles and add to a serving bowl with the hot broth.',
            '5. Top with pork chashu, soft-boiled egg, chopped scallions, and seaweed sheets.'
        ]
    },
    {
        id: 6, // Changed ID
        title: 'Classic Cheesecake', // Changed from name to title
        image: 'https://placehold.co/60x60/DDA0DD/000000?text=Cake',
        author: 'AI Chef', // Added author
        stats: { // Added stats
            cuisine: "Dessert",
            protein: "Low",
            calories: "High",
            prepTime: "30 mins",
            cookTime: "70 mins",
            totalTime: "5 hours (includes chilling)"
        },
        ingredients: [
            { id: 'ing6', name: 'Cream Cheese', type: 'Block', image: 'https://placehold.co/50x50/F8F8FF/000000?text=Cheese', quantity: 400, unit: 'g', },
            { id: 'ing7', name: 'Granulated Sugar', type: 'Granulated', image: 'https://placehold.co/50x50/FFFFFF/000000?text=Sugar', quantity: 150, unit: 'g', },
            { id: 'ing8', name: 'Eggs', type: 'Individual', image: 'https://placehold.co/50x50/F5DEB3/000000?text=Eggs', quantity: 3, unit: 'count', },
            { id: 'ing9', name: 'Sour Cream', type: 'Dairy', image: 'https://placehold.co/50x50/F0F8FF/000000?text=Sour+Cream', quantity: 100, unit: 'g', },
            { id: 'ing10', name: 'Vanilla Extract', type: 'Liquid', image: 'https://placehold.co/50x50/F5F5DC/000000?text=Vanilla', quantity: 5, unit: 'ml', },
            { id: 'ing11', name: 'Graham Cracker Crumbs', type: 'Dry', image: 'https://placehold.co/50x50/E0B8A8/000000?text=Cracker', quantity: 150, unit: 'g', },
            { id: 'ing12', name: 'Melted Butter', type: 'Dairy', image: 'https://placehold.co/50x50/FFEFD5/000000?text=Butter', quantity: 70, unit: 'g', }
        ],
        directions: [ // Changed from steps to directions
            '1. Preheat oven to 160°C (325°F). Prepare a 9-inch springform pan with parchment paper and wrap bottom with foil.',
            '2. For the crust: Combine graham cracker crumbs and melted butter. Press firmly into the bottom of the pan.',
            '3. For the filling: Beat cream cheese and sugar until smooth. Mix in eggs one at a time, then stir in sour cream and vanilla extract.',
            '4. Pour filling over the crust.',
            '5. Place springform pan in a larger roasting pan and fill roasting pan with hot water halfway up the sides of the springform pan (water bath).',
            '6. Bake for 60-70 minutes, or until edges are set but center is still slightly wobbly. Turn off oven and let cheesecake cool inside for 1 hour with door ajar.',
            '7. Remove from oven, cool completely on a wire rack, then chill in the refrigerator for at least 4 hours, preferably overnight.'
        ]
    },
    {
        id: 7, // Changed ID
        title: 'Vegetable Stir-fry', // Changed from name to title
        image: 'https://placehold.co/60x60/9ACD32/000000?text=StirFry',
        author: 'AI Chef', // Added author
        stats: { // Added stats
            cuisine: "Asian",
            protein: "Low",
            calories: "Low",
            prepTime: "15 mins",
            cookTime: "10 mins",
            totalTime: "25 mins"
        },
        ingredients: [
            { id: 'ing13', name: 'Broccoli Florets', type: 'Vegetable', image: 'https://placehold.co/50x50/6B8E23/FFFFFF?text=Broccoli', quantity: 200, unit: 'g', },
            { id: 'ing14', name: 'Carrots', type: 'Vegetable', image: 'https://placehold.co/50x50/FFA500/FFFFFF?text=Carrot', quantity: 100, unit: 'g', },
            { id: 'ing15', name: 'Bell Peppers (Assorted)', type: 'Vegetable', image: 'https://placehold.co/50x50/FFD700/000000?text=Pepper', quantity: 150, unit: 'g', },
            { id: 'ing16', name: 'Soy Sauce', type: 'Condiment', image: 'https://placehold.co/50x50/8B4513/FFFFFF?text=Soy', quantity: 30, unit: 'ml', },
            { id: 'ing17', name: 'Ginger', type: 'Spice', image: 'https://placehold.co/50x50/D2B48C/000000?text=Ginger', quantity: 10, unit: 'g', }
        ],
        directions: [ // Changed from steps to directions
            '1. Chop all vegetables into bite-sized pieces.',
            '2. Heat oil in a large wok or pan over high heat.',
            '3. Add tougher vegetables (carrots, broccoli) first and stir-fry for 3-4 minutes.',
            '4. Add bell peppers and ginger, stir-fry for another 2-3 minutes.',
            '5. Pour in soy sauce and toss to coat. Serve immediately with rice or noodles.'
        ]
    }
];

// Placeholder for other data (named exports, as before)
export const dummyUsers = [
    { id: 'user1', name: 'Alice Smith', email: 'alice@example.com' },
    { id: 'user2', name: 'Bob Johnson', email: 'bob@example.com' },
];

export const dummyInventory = [
    { id: 'inv1', name: 'Flour', quantity: 1, unit: 'kg' },
    { id: 'inv2', name: 'Sugar', quantity: 0.5, unit: 'kg' },
    { id: 'inv3', name: 'Eggs', quantity: 12, unit: 'count' },
];

export const dummyMyRecipes = [
    { id: 'myrec1', title: 'My Favorite Pasta', description: 'A quick and easy weeknight meal.', author: 'You' },
    { id: 'myrec2', title: 'Grandma\'s Cookies', description: 'A timeless classic.', author: 'Grandma' },
];

export const dummyExploreContent = [
    { id: 'exp1', title: 'Top 10 Vegan Meals', type: 'article', author: 'Food Bloggers' },
    { id: 'exp2', title: 'Mediterranean Diet Benefits', type: 'video', author: 'Health Channel' },
];