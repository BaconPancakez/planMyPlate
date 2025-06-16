const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
 
const app = express();
const PORT = process.env.PORT || 8080;

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
      .from('posts')
      .select('count', { count: 'exact' });

    if (error) throw error;

    res.json({
      message: 'Supabase connected successfully!',
      posts_count: data[0].count
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
async function getAllPosts() {
  const { data, error } = await supabase
    .from('introtocomp')
    .select('*')

  if (error) throw error;
  return data;
}

async function getPostById(id) {
  const { data, error } = await supabase
    .from('introtocomp')
    .select('*')
    .eq('Student_ID', id)
    .single();

  if (error) throw error;
  return data;
}

async function createPost(Tutorial_Group, Student_ID, School, Name, Gender, CGPA) {
  const { data, error } = await supabase
    .from('introtocomp')
    .insert([{ Tutorial_Group, Student_ID, School, Name, Gender, CGPA }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function updatePost(id, Tutorial_Group, Student_ID, School, Name, Gender, CGPA) {
  const { data, error } = await supabase
    .from('introtocomp')
    .update({ Tutorial_Group, Student_ID, School, Name, Gender, CGPA })
    .eq('Student_ID', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function deletePost(id) {
  const { error } = await supabase
    .from('introtocomp')
    .delete()
    .eq('Student_ID', id);

  if (error) throw error;
  return true;
}


// Routes

// GET all posts
app.get('/introtocomp', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json({ success: true, posts });
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ success: false, error: 'Failed to get posts' });
  }
});

// GET single post by ID
app.get('/introtocomp/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    res.json({ success: true, post });
  } catch (error) {
    console.error('Error getting post:', error);
    res.status(500).json({ success: false, error: 'Failed to get post' });
  }
});

// POST create new post
app.post('/introtocomp', async (req, res) => {
  try {
    const { Tutorial_Group, Student_ID, School, Name, Gender, CGPA } = req.body;

    // Log the incoming request body for debugging
    console.log('POST /introtocomp body:', req.body);

    if (!Tutorial_Group || !Student_ID || !School || !Name || !Gender || CGPA === undefined) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: Tutorial_Group, Student_ID, School, Name, Gender, CGPA'
      });
    }

    const newPost = await createPost(Tutorial_Group, Student_ID, School, Name, Gender, CGPA);
    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    // Log the actual error for debugging
    console.error('Error creating post:', error);
    if (error.message && error.message.includes('duplicate key value')) {
      return res.status(409).json({
        success: false,
        error: 'A student with this Student_ID already exists. Please use a unique Student_ID.'
      });
    }
    res.status(500).json({ success: false, error: 'Failed to create post', details: error.message || error });
  }
});

// PUT update post
app.put('/introtocomp/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Tutorial_Group, Student_ID, School, Name, Gender, CGPA } = req.body;

    if (!Tutorial_Group || !Student_ID || !School || !Name || !Gender || CGPA === undefined) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: Tutorial_Group, Student_ID, School, Name, Gender, CGPA'
      });
    }

    const updatedPost = await updatePost(id, Tutorial_Group, Student_ID, School, Name, Gender, CGPA);

    if (!updatedPost) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    res.json({ success: true, post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ success: false, error: 'Failed to update post' });
  }
});

// DELETE post
app.delete('/introtocomp/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if post exists first
    const existingPost = await getPostById(id);
    if (!existingPost) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    await deletePost(id);
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ success: false, error: 'Failed to delete post' });
  }
});