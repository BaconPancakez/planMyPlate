// src/data/index.js

export const dummyRecipes = [
    {
      id: 1,
      name: 'Shoyu Ramen',
      rating: 4.5,
      image: 'https://placehold.co/60x60/ADD8E6/000000?text=Ramen',
      warning: 'Contains soy, wheat, egg',
      ingredients: [
        {
          id: 'ing1',
          name: 'Noodles',
          type: 'Packet',
          image: 'https://placehold.co/50x50/F0E68C/000000?text=Noodle',
          quantity: 200,
          unit: 'g',
        },
        {
          id: 'ing2',
          name: 'Pork Chashu',
          type: 'Slice',
          image: 'https://placehold.co/50x50/DDA0DD/000000?text=Pork',
          quantity: 100,
          unit: 'g',
        },
        {
          id: 'ing3',
          name: 'Soft-boiled Egg',
          type: 'Individual',
          image: 'https://placehold.co/50x50/FFFACD/000000?text=Egg',
          quantity: 1,
          unit: 'count',
        },
        {
          id: 'ing4',
          name: 'Scallions',
          type: 'Fresh',
          image: 'https://placehold.co/50x50/98FB98/000000?text=Scallion',
          quantity: 20,
          unit: 'g',
        },
        {
          id: 'ing5',
          name: 'Seaweed',
          type: 'Sheet',
          image: 'https://placehold.co/50x50/A2CD5A/000000?text=Seaweed',
          quantity: 1,
          unit: 'sheet',
        }
      ],
      steps: [
        '1. Prepare the ramen broth according to package instructions.',
        '2. Cook ramen noodles in a separate pot of boiling water until al dente.',
        '3. While noodles cook, slice pork chashu and soft-boiled eggs.',
        '4. Drain noodles and add to a serving bowl with the hot broth.',
        '5. Top with pork chashu, soft-boiled egg, chopped scallions, and seaweed sheets.'
      ]
    },
    {
      id: 2,
      name: 'Classic Cheesecake',
      rating: 5.0,
      image: 'https://placehold.co/60x60/DDA0DD/000000?text=Cake',
      warning: 'Contains dairy, gluten, egg',
      ingredients: [
        {
          id: 'ing6',
          name: 'Cream Cheese',
          type: 'Block',
          image: 'https://placehold.co/50x50/F8F8FF/000000?text=Cheese',
          quantity: 400,
          unit: 'g',
        },
        {
          id: 'ing7',
          name: 'Granulated Sugar',
          type: 'Granulated',
          image: 'https://placehold.co/50x50/FFFFFF/000000?text=Sugar',
          quantity: 150,
          unit: 'g',
        },
        {
          id: 'ing8',
          name: 'Eggs',
          type: 'Individual',
          image: 'https://placehold.co/50x50/F5DEB3/000000?text=Eggs',
          quantity: 3,
          unit: 'count',
        },
        {
          id: 'ing9',
          name: 'Sour Cream',
          type: 'Dairy',
          image: 'https://placehold.co/50x50/F0F8FF/000000?text=Sour+Cream',
          quantity: 100,
          unit: 'g',
        },
        {
          id: 'ing10',
          name: 'Vanilla Extract',
          type: 'Liquid',
          image: 'https://placehold.co/50x50/F5F5DC/000000?text=Vanilla',
          quantity: 5,
          unit: 'ml',
        },
        {
          id: 'ing11',
          name: 'Graham Cracker Crumbs',
          type: 'Dry',
          image: 'https://placehold.co/50x50/E0B8A8/000000?text=Cracker',
          quantity: 150,
          unit: 'g',
        },
        {
          id: 'ing12',
          name: 'Melted Butter',
          type: 'Dairy',
          image: 'https://placehold.co/50x50/FFEFD5/000000?text=Butter',
          quantity: 70,
          unit: 'g',
        }
      ],
      steps: [
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
      id: 3,
      name: 'Vegetable Stir-fry',
      rating: 4.0,
      image: 'https://placehold.co/60x60/9ACD32/000000?text=StirFry',
      warning: 'Contains soy',
      ingredients: [
        {
          id: 'ing13',
          name: 'Broccoli Florets',
          type: 'Vegetable',
          image: 'https://placehold.co/50x50/6B8E23/FFFFFF?text=Broccoli',
          quantity: 200,
          unit: 'g',
        },
        {
          id: 'ing14',
          name: 'Carrots',
          type: 'Vegetable',
          image: 'https://placehold.co/50x50/FFA500/FFFFFF?text=Carrot',
          quantity: 100,
          unit: 'g',
        },
        {
          id: 'ing15',
          name: 'Bell Peppers (Assorted)',
          type: 'Vegetable',
          image: 'https://placehold.co/50x50/FFD700/000000?text=Pepper',
          quantity: 150,
          unit: 'g',
        },
        {
          id: 'ing16',
          name: 'Soy Sauce',
          type: 'Condiment',
          image: 'https://placehold.co/50x50/8B4513/FFFFFF?text=Soy',
          quantity: 30,
          unit: 'ml',
        },
        {
          id: 'ing17',
          name: 'Ginger',
          type: 'Spice',
          image: 'https://placehold.co/50x50/D2B48C/000000?text=Ginger',
          quantity: 10,
          unit: 'g',
        }
      ],
      steps: [
        '1. Chop all vegetables into bite-sized pieces.',
        '2. Heat oil in a large wok or pan over high heat.',
        '3. Add tougher vegetables (carrots, broccoli) first and stir-fry for 3-4 minutes.',
        '4. Add bell peppers and ginger, stir-fry for another 2-3 minutes.',
        '5. Pour in soy sauce and toss to coat. Serve immediately with rice or noodles.'
      ]
    }
  ];
  
  // Placeholder for other data
  export const dummyUsers = [
    { id: 'user1', name: 'Alice Smith', email: 'alice@example.com' },
    { id: 'user2', name: 'Bob Johnson', email: 'bob@example.com' },
  ];
  
  export const dummyInventory = [
    { id: 'inv1', name: 'Flour', quantity: 1, unit: 'kg' },
    { id: 'inv2', name: 'Sugar', quantity: 0.5, unit: 'kg' },
  ];
  
  export const dummyMyRecipes = [
    { id: 'myrec1', name: 'My Favorite Pasta', description: 'A quick and easy weeknight meal.' },
    { id: 'myrec2', name: 'Grandma\'s Cookies', description: 'A timeless classic.' },
  ];
  
  export const dummyExploreContent = [
    { id: 'exp1', title: 'Top 10 Vegan Meals', type: 'article' },
    { id: 'exp2', title: 'Mediterranean Diet Benefits', type: 'video' },
  ];