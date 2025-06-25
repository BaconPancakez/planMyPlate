const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
 
const app = express(); 
const PORT = process.env.PORT || 8080;
let count

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running with supabase!' });
});

// Test Supabase connection
app.get('/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('recipe_Table')
      .select('id', { count: 'exact' });

    if (error) throw error;

    res.json({
      message: 'Supabase connected successfully!',
      id_count: data[0].count
    });
  } catch (error) {
    console.error('Supabase connection error:', error);
    res.status(500).json({ error: 'Failed to connect to Supabase' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

async function getAllRecipes(supabase) {
  const { data, error } = await supabase
    .from('recipe_Table')
    .select(`
      id,
      title,
      image,
      cuisine,
      dietary,
      meal,
      prep_time,
      cook_time,
      total_time,
      ingredients,
      directions,
      profile_table (
        username
      )
    `)
  if (error) {
    throw error;
  }

  // Map the result to flatten username
  return data.map(r => ({
    id: r.id,
    title: r.title,
    image: r.image,
    username: r.profile_table?.username,
    cuisine: r.cuisine,
    dietary: r.dietary,
    meal: r.meal,
    prep_time: r.prep_time,
    cook_time: r.cook_time,
    total_time: r.total_time,
    ingredients: r.ingredients,
    directions: r.directions
  }));
}

// Get a single post by ID
// async function getPostById(id) {
async function getRecipesBySearch(supabase, searchTerm) {
  const { data, error } = await supabase
    .from('recipe_Table')
    .select(`
      id,
      title,
      image,
      cuisine,
      dietary,
      meal,
      prep_time,
      cook_time,
      total_time,
      ingredients,
      directions,
      profile_table (
        username
      )
    `)
    .ilike('title', `%${searchTerm}%`); // Case-insensitive search by title

  if (error) {
    throw error;
  }

  // Map the result to flatten username
  return data.map(r => ({
    id:r.id,
    title: r.title,
    image: r.image,
    username: r.profile_table?.username,
    cuisine: r.cuisine,
    dietary: r.dietary,
    meal: r.meal,
    prep_time: r.prep_time,
    cook_time: r.cook_time,
    total_time: r.total_time,
    ingredients: r.ingredients,
    directions: r.directions
  }));
}

async function getProflie(supabase,id) {
  const {data , error} = await supabase
    .from('profile_table')
    .select()
    .eq('id', id)
  if (error) {
    throw error;
  }
  return data
}

async function getInventoryById(supabase,id) {
  const {data , error} = await supabase
    .from('ingredients_table')
    .select()
    .eq('owner_id', id)
  if (error) {
    throw error;
  }
  return data
}

async function createPost(Recipe_Title, Cuisine_type, Image_url, Diet_type, Meal_type, Prep_Time, Cook_Time, Total_Time, Ingredients, Directions) {
  const { data, error } = await supabase
    .from('recipe_Table')
    .insert([{ Recipe_Title, Cuisine_type, Image_url, Diet_type, Meal_type, Prep_Time, Cook_Time, Total_Time, Ingredients, Directions }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function updatePost(id, Recipe_Title, Cuisine_type, Image_url, Diet_type, Meal_type, Prep_Time, Cook_Time, Total_Time, Ingredients, Directions) {
  const { data, error } = await supabase
    .from('recipe_Table')
    .update({ Recipe_Title, Cuisine_type, Image_url, Diet_type, Meal_type, Prep_Time, Cook_Time, Total_Time, Ingredients, Directions })
    .eq('Recipe_id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function deletePost(id) {
  const { error } = await supabase
    .from('recipe_Table')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

// Function to get user recipes by profileId
async function getUserRecipesByProfileId(supabase, profileId) {
  const { data, error } = await supabase
    .from('recipe_Table')
    .select(`
      id,
      title,
      image,
      cuisine,
      dietary,
      meal,
      prep_time,
      cook_time,
      total_time,
      ingredients,
      directions,
      profile_table (
        username
      )
    `)
    .eq('author', profileId);

  if (error) {
    throw error;
  }

  // Map the result to flatten username
  return data.map(r => ({
    id: r.id,
    title: r.title,
    image: r.image,
    username: r.profile_table?.username,
    cuisine: r.cuisine,
    dietary: r.dietary,
    meal: r.meal,
    prep_time: r.prep_time,
    cook_time: r.cook_time,
    total_time: r.total_time,
    ingredients: r.ingredients,
    directions: r.directions
  }));
}

// Function to insert new Recipe
async function insertSampleRecipe(recipe) {
  const { data, error } = await supabase
    .from('recipe_Table')
    .insert([recipe])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Helper function to get the id from a recipe object
function getRecipeId(recipe) {
  // Try common id fields, add more if needed
  return recipe.id || recipe.Recipe_id || null;
}




// Routes
// Updated insertProfile function to handle missing password and validate img
async function insertProfile(username, email, password = null, login_type, allergy = [], about_me = "", img = "https://example.com/default-profile.jpg") {
  try {
    const { data, error } = await supabase
      .from('profile_table')
      .insert([{ username, email, password, login_type, allergy, about_me, img }])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Error in insertProfile function:', err);
    throw err;
  }
}

// GET all posts
app.get('/recipe_Table', async (req, res) => {
  try {
    const posts = await getAllRecipes(supabase);
//     const posts = await getAllPosts(supabase);
    res.json({ success: true, posts });
  } catch (error) { 
    console.error('Error getting posts:', error);
    res.status(500).json({ success: false, error: 'Failed to get posts' });
  }
});

//get Inventory By Id(uses owner id)
app.get('/GETinventory/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const inventory = await getInventoryById(supabase, id);
    res.json({ success: true, inventory });
  } catch (error) {
    console.error('Error getting inventory:', error);
    res.status(500).json({ success: false, error: 'Failed to get inventory' });
  }
})

//GET proflie
app.get('/GETprofile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await getProflie(supabase,id) ;
    res.json({ success: true, profile });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ success: false, error: 'Failed to get profile' });
  }
});

// POST create new post
app.post('/recipe_Table/posts', async (req, res) => {
  try {
    const { Recipe_Title, Cuisine_type, Image_url, Diet_type, Meal_type, Prep_Time, Cook_Time, Total_Time, Ingredients, Directions } = req.body;

    // Log the incoming request body for debugging
    console.log('POST /recipe_Table body:', req.body);

    if (!Recipe_Title || !Cuisine_type || !Image_url || !Diet_type || !Meal_type || !Prep_Time || !Cook_Time || !Total_Time || !Ingredients || !Directions === undefined) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: Recipe_Title, Cuisine_type, Image_url, Diet_type, Meal_type, Prep_Time, Cook_Time, Total_Time, Ingredients, Directions'
      });
    }

    const newPost = await createPost(Recipe_Title, Cuisine_type, Image_url, Diet_type, Meal_type, Prep_Time, Cook_Time, Total_Time, Ingredients, Directions);
    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    // Log the actual error for debugging
    console.error('Error creating post:', error);
    if (error.message && error.message.includes('duplicate key value')) {
      return res.status(409).json({
        success: false,
        error: 'A Recipe with this id already exists. Please create another Recipe.'
      }); 
    }
    res.status(500).json({ success: false, error: 'Failed to create post', details: error.message || error });
  }
});

app.post('/insert-Recipe', async (req, res) => {
  try {
    const recipe = req.body;
    const newRecipe = await insertSampleRecipe(recipe);
    res.status(201).json({ success: true, newRecipe });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT update post
app.put('/recipe_Table/put/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Recipe_Title, Cuisine_type, Image_url, Diet_type, Meal_type, Prep_Time, Cook_Time, Total_Time, Ingredients, Directions } = req.body;

    if (!id || !Recipe_Title || !Cuisine_type || !Image_url || !Diet_type || !Meal_type || !Prep_Time || !Cook_Time || !Total_Time || !Ingredients || !Directions === undefined) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: Recipe_Title, Cuisine_type, Image_url, Diet_type, Meal_type, Prep_Time, Cook_Time, Total_Time, Ingredients, Directions'
      });
    }

    const updatedPost = await updatePost(id, Recipe_Title, Cuisine_type, Image_url, Diet_type, Meal_type, Prep_Time, Cook_Time, Total_Time, Ingredients, Directions);

    if (!updatedPost) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    res.json({ success: true, post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ success: false, error: 'Failed to update post' });
  }
});

// For the add to cart button in the recipes
app.post('/foodCart/:recipe_id/:owner_id', async (req, res) => {
  try {
    const { recipe_id, owner_id } = req.params;

    if (!recipe_id || !owner_id) {
      return res.status(400).json({
        success: false,
        error: 'Both recipe_id and owner_id are required',
      });
    }

    const { data, error } = await supabase
      .from('foodCart_table')
      .insert([{ recipe_id, owner_id }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({ success: true, foodCartEntry: data });
  } catch (error) {
    console.error('Error inserting into foodCart_table:', error);
    res.status(500).json({ success: false, error: 'Failed to insert into foodCart_table', details: error.message });
  }
});

// FoodCart endpoint to get all recipes in food cart for a given owner_id
// GET all recipes in food cart for a given owner_id
app.get('/api/foodcart/:owner_id', async (req, res) => {
  try {
    let { owner_id } = req.params;
    const parsedOwnerId = parseInt(owner_id, 10);

    if (isNaN(parsedOwnerId)) {
      console.error(`Invalid owner_id received: "${owner_id}". It must be a number.`);
      return res.status(400).json({
        success: false,
        error: 'Invalid owner ID format. Owner ID must be a valid number.'
      });
    }

    owner_id = parsedOwnerId;

    const { data: cartRows, error: cartError } = await supabase
      .from('foodCart_table')
      .select('recipe_id')
      .eq('owner_id', owner_id);

    console.log('cartRows:', cartRows);
    if (cartError) {
      console.error('Supabase cart fetch error:', cartError);
      throw cartError;
    }

    if (!cartRows || cartRows.length === 0) {
      return res.json({ success: true, recipes: [] });
    }

    const recipeIds = cartRows
      .map(row => parseInt(row.recipe_id, 10))
      .filter(id => !isNaN(id));

    console.log('Filtered recipeIds:', recipeIds, 'types:', recipeIds.map(id => typeof id));

    if (recipeIds.length === 0) {
      return res.json({ success: true, recipes: [] });
    }

    const { data: recipes, error: recipeError } = await supabase
      .from('recipe_Table')
      .select('*')
      .in('id', recipeIds);

    if (recipeError) {
      console.error('Supabase recipe fetch error:', recipeError);
      throw recipeError;
    }

    res.json({ success: true, recipes });

  } catch (error) {
    console.error('Error fetching food cart recipes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch food cart recipes due to an internal server error.'
    });
  }
});
// Function to insert new Ingredient
async function insertIngredient(ingredient) {
  const { data, error } = await supabase
    .from('ingredients_table')
    .insert([ingredient])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// New DELETE endpoint for food cart items
app.delete('/api/foodcart/:owner_id/:recipe_id', async (req, res) => {
  try {
    const { owner_id, recipe_id } = req.params;

    const parsedOwnerId = parseInt(owner_id, 10);
    const parsedRecipeId = parseInt(recipe_id, 10);

    if (isNaN(parsedOwnerId) || isNaN(parsedRecipeId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid owner ID or recipe ID format. Both must be valid numbers.'
      });
    }

    // Delete the entry from foodCart_table
    const { error } = await supabase
      .from('foodCart_table')
      .delete()
      .eq('owner_id', parsedOwnerId)
      .eq('recipe_id', parsedRecipeId);

    if (error) {
      console.error('Supabase delete food cart item error:', error);
      throw error;
    }

    res.json({ success: true, message: 'Item removed from food cart successfully.' });

  } catch (error) {
    console.error('Error deleting food cart item:', error);
    res.status(500).json({ success: false, error: 'Failed to remove item from food cart', details: error.message });
  }
});
//end of food cart

// Endpoint to insert a new ingredient
app.post('/insert-ingredient', async (req, res) => {
  try {
    const ingredient = req.body;

    // Basic validation (can be expanded)
    if (!ingredient.quantity || !ingredient.name || !ingredient.owner_id) {
      return res.status(400).json({
        success: false,
        error: 'Required fields: quantity, name, owner_id',
      });
    }

    const newIngredient = await insertIngredient(ingredient);

    if (newIngredient) {
      res.status(201).json({ success: true, newIngredient });
    } else {
      // This case should ideally not be reached if insertIngredient is successful and single() works
      res.status(500).json({ success: false, error: 'Failed to retrieve inserted ingredient data.' });
    }

  } catch (error) {
    console.error('Error inserting ingredient in endpoint:', error);
    // Check if the error is a Supabase error object and extract details
    const errorMessage = error.message || 'An unknown error occurred during ingredient insertion.';
    const errorDetails = error.details || null;
    const errorCode = error.code || null;

    res.status(500).json({
      success: false,
      error: errorMessage,
      details: errorDetails,
      code: errorCode
    });
  }
});

// DELETE post by title
app.delete('/user-recipes/delete/:title', async (req, res) => {
  try {
    const { title } = req.params;
    console.log('DELETE /delete/:title called with title:', title);

    // Check if post exists first
    const { data: existingPost, error: getError } = await supabase
      .from('recipe_Table')
      .select('*')
      .eq('title', title)
      .single();
    if (getError) throw getError;
    if (!existingPost) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    // Proceed to delete the post
    const { error: deleteError } = await supabase
      .from('recipe_Table')
      .delete()
      .eq('title', title);
    if (deleteError) throw deleteError;

    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ success: false, error: 'Failed to delete post' });
  }
});

// add endpoint to get user recipes by dietary, meal, and total_time
app.get('/user-recipes/filter', async (req, res) => {
  try {
    let { author, dietary, meal, total_time, searchTerm } = req.query;

    // Debug log to see what filters are being received
    console.log('Received filters:', { author, dietary, meal, total_time, searchTerm });

    // Accept comma-separated values for multi-select
    let query = supabase.from('recipe_Table').select(`
      id,
      title,
      image,
      cuisine,
      dietary,
      meal,
      prep_time,
      cook_time,
      total_time,
      ingredients,
      directions,
      profile_table (
        username
      )
    `);

    if (author) {
      query = query.eq('author', author);
    }
    if (dietary) {
      const arr = dietary.split(',').map(v => v.trim()).filter(v => v);
      if (arr.length > 0) query = query.in('dietary', arr);
    }
    if (meal) {
      const arr = meal.split(',').map(v => v.trim()).filter(v => v);
      if (arr.length > 0) query = query.in('meal', arr);
    }
    if (total_time) {
      const arr = total_time.split(',').map(v => v.trim()).filter(v => v);
      if (arr.length > 0) query = query.in('total_time', arr);
    }
    if (searchTerm) {
      query = query.ilike('title', `%${searchTerm}%`);
    }

    const { data, error } = await query;
    if (error) {
      throw error;
    }

    // Map the result to flatten username, consistent with other endpoints
    const recipes = data.map(r => ({
      id: r.id,
      title: r.title,
      image: r.image,
      username: r.profile_table?.username,
      cuisine: r.cuisine,
      dietary: r.dietary,
      meal: r.meal,
      prep_time: r.prep_time,
      cook_time: r.cook_time,
      total_time: r.total_time,
      ingredients: r.ingredients,
      directions: r.directions
    }));

    res.json({ success: true, recipes: recipes });
  } catch (error) {
    console.error('Error fetching user recipes by filters:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch user recipes by filters' });
  }
});

// Add endpoint to get user recipes by profileId
app.get('/user-recipes/:profileId', async (req, res) => {
  try {
    const { profileId } = req.params;
    const recipes = await getUserRecipesByProfileId(supabase, profileId);
    res.json({ success: true, recipes });
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch user recipes' });
  }
});

// Endpoint to validate session token and fetch profile data
app.post('/validate-session', async (req, res) => {
  try {
    const { sessionToken } = req.body;

    if (!sessionToken) {
      return res.status(400).json({ success: false, error: 'Session token is required' });
    }

    const { data, error } = await supabase
      .from('profile_table')
      .select('*')
      .eq('id', sessionToken.id)
      .single();

    if (error) {
      throw error;
    }

    if (data) {
      res.json({ success: true, profile: data });
    } else {
      res.status(404).json({ success: false, error: 'Profile not found' });
    }
  } catch (error) {
    console.error('Error validating session token:', error);
    res.status(500).json({ success: false, error: 'Failed to validate session token' });
  }
});

// Endpoint to handle Google Sign-In
app.post('/google-signin', async (req, res) => {
  try {
    const { name, email, picture } = req.body;

    const { data, error } = await supabase
      .from('profile_table')
      .upsert({ username: name, email, login_type: 'google', img: picture })
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({ success: true, profile: data });
  } catch (error) {
    console.error('Error handling Google Sign-In:', error);
    res.status(500).json({ success: false, error: 'Failed to handle Google Sign-In' });
  }
});

// Endpoint to handle manual login
app.post('/manual-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase
      .from('profile_table')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error) {
      throw error;
    }

    if (data) {
      res.json({ success: true, profile: data });
    } else {
      res.status(404).json({ success: false, error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error handling manual login:', error);
    res.status(500).json({ success: false, error: 'Failed to handle manual login' });
  }
});

// POST /profile endpoint
app.post('/profile', async (req, res) => {
  try {
    const { username, email, password, login_type, allergy, about_me, img } = req.body;

    if (!username || !email || !login_type) {
      return res.status(400).json({
        success: false,
        error: 'Required fields: username, email, login_type',
      });
    }

    // Check if email already exists
    const existingProfile = await supabase
      .from('profile_table')
      .select('*')
      .eq('email', email)
      .single();

    if (existingProfile.data) {
      console.log('Email already exists, returning existing profile:', existingProfile.data);
      return res.json({ success: true, id: existingProfile.data.id });
    }

    // Insert new profile
    const profile = await insertProfile(
      username,
      email,
      password,
      login_type,
      allergy,
      about_me,
      img
    );

    if (!profile) {
      return res.status(500).json({
        success: false,
        error: 'Failed to insert profile',
      });
    }

    res.json({ success: true, id: profile.id });
  } catch (error) {
    console.error('Error inserting profile:', error);

    // Improved error response
    if (error.message.includes('duplicate key value')) {
      return res.status(409).json({
        success: false,
        error: 'A profile with this email already exists.',
      });
    }

    res.status(500).json({ success: false, error: 'Internal server error', details: error.message });
  }
});

// Endpoint to search recipes by title
app.get('/search-recipes/:searchTerm', async (req, res) => {
  try {
    const { searchTerm } = req.params;

    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        error: 'Search term is required',
      });
    }

    const recipes = await getRecipesBySearch(supabase, searchTerm);
    res.json({ success: true, recipes });
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).json({ success: false, error: 'Failed to search recipes' });
  }
});

// Function to update a profile
async function updateProfile(supabase, profileData) {
  const { id, username, email, password, login_type, allergy, about_me, img } = profileData;

  if (!id) {
    throw new Error('Profile ID is required for update.');
  }

  const { data, error } = await supabase
    .from('profile_table')
    .update({
      username,
      email,
      password,
      login_type,
      allergy,
      about_me,
      img
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Supabase update profile error:', error);
    throw error;
  }
  return data;
}

// PUT endpoint to update a profile by ID
app.put('/update-profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const profileData = req.body;

    // Ensure the ID from params matches the ID in the body if present, or use params ID
    if (profileData.id && profileData.id !== parseInt(id, 10)) {
         return res.status(400).json({ success: false, error: 'Profile ID in body does not match ID in URL.' });
    }
    profileData.id = parseInt(id, 10); // Use the ID from URL params

    // Basic validation for required fields for update (can be adjusted based on requirements)
    if (!profileData.id || !profileData.username || !profileData.email || !profileData.login_type) {
         return res.status(400).json({ success: false, error: 'Required fields for update: id, username, email, login_type' });
    }

    console.log('Attempting to update profile for ID:', profileData.id);
    const updatedProfile = await updateProfile(supabase, profileData);
    console.log('Profile update result:', updatedProfile);

    if (updatedProfile) {
      res.json({ success: true, profile: updatedProfile });
    } else {
      // This case might occur if the ID doesn't exist
      res.status(404).json({ success: false, error: 'Profile not found or failed to update.' });
    }

  } catch (error) {
    console.error('Error updating profile in endpoint:', error);
    const errorMessage = error.message || 'An unknown error occurred during profile update.';
    const errorDetails = error.details || null;
    const errorCode = error.code || null;

    res.status(500).json({
      success: false,
      error: errorMessage,
      details: errorDetails,
      code: errorCode
    });
  }
});

