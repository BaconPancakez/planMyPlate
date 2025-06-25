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










// Database helper functions using Supabase
  // Functions to interact with the 'recipe_Table' table
  // These functions will be used in the routes later
// Get all posts
// async function getAllPosts(supabase) {
//   const { data, error } = await supabase
//     .from('recipe_Table')
//     .select(`
//       title,
//       image,
//       cuisine,
//       dietary,
//       meal,
//       prep_time,
//       cook_time,
//       total_time,
//       ingredients,
//       directions,
//       profile_table (
//         username
//       )
//     `)

//   if (error) {
//     throw error;
//   }

//   // Map the result to flatten username
//   return data.map(r => ({
//     title: r.title,
//     image: r.image,
//     username: r.profile_table?.username,
//     cuisine: r.cuisine,
//     dietary: r.dietary,
//     meal: r.meal,
//     prep_time: r.prep_time,
//     cook_time: r.cook_time,
//     total_time: r.total_time,
//     ingredients: r.ingredients,
//     directions: r.directions
//   }));
// }

async function getAllRecipes(supabase) {
  const { data, error } = await supabase
    .from('recipe_Table')
    .select(`
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

//GET proflie
app.get('/GETprofile/:id', async (req, res) => {
  try {
//     const {id } = req.params;
//     const post = await getPostById(id);

//     if (!post) {
//       return res.status(404).json({ success: false, error: 'Post not found' });
//     }

//     res.json({ success: true, post });
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



