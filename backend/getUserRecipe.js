const express = require('express');
const router = express.Router();



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

module.exports = { getUserRecipesByProfileId };