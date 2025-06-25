// pages/FoodCart.jsx
import React, { useState, useEffect } from 'react';
import { localStorage }  from "../utils/localStorage";
import RecipeCard from '../components/RecipeCard';
import RecipePopup from '../components/RecipePopup';
import { useNavigate } from 'react-router-dom';
import './FoodCart.css';

export default function FoodCart() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodCartRecipes = async () => {
      // Get owner_id from localStorage
      const owner_id = localStorage.get('id');
      console.log('[FoodCart] owner_id from localStorage:', owner_id);
      if (!owner_id) {
        console.warn('[FoodCart] No owner_id found in localStorage. Aborting fetch.');
        setRecipes([]); // Ensure recipes are empty if no owner_id
        return;
      }

      // Ensure the URL points to your backend server
      const url = `${import.meta.env.VITE_API_LINK}/api/foodcart/${owner_id}`;
      console.log('[FoodCart] Fetching:', url);

      try {
        const res = await fetch(url);
        console.log('[FoodCart] Raw response:', res);
        if (!res.ok) {
          const errorText = await res.text();
          console.error(`[FoodCart] Fetch failed with status: ${res.status} - ${res.statusText}. Response text: ${errorText}`);
          throw new Error(`Server error: ${errorText || res.statusText}`);
        }
        const text = await res.text();
        console.log('[FoodCart] Raw response text:', text);
        const data = JSON.parse(text);
        console.log('[FoodCart] Parsed JSON:', data);
        setRecipes(data.recipes || []);
      } catch (err) {
        console.error('[FoodCart] Network or fetch error:', err);
      }
    };

    fetchFoodCartRecipes();
  }, []); // Empty dependency array means this runs once on mount


  const toggleCheck = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // --- THIS IS THE UPDATED handleDelete FUNCTION ---
  const handleDelete = async (recipeIdToDelete) => {
    const owner_id = localStorage.get('id'); // Get owner_id again for the delete request

    if (!owner_id) {
      console.error('[FoodCart] Cannot delete: No owner_id found in localStorage.');
      alert('Error: User not logged in or owner ID missing.'); // Using alert for user feedback
      return;
    }

    // Construct the DELETE URL using both owner_id and recipeIdToDelete
    const deleteUrl = `${import.meta.env.VITE_API_LINK}/api/foodcart/${owner_id}/${recipeIdToDelete}`;
    console.log(`[FoodCart] Attempting to DELETE: ${deleteUrl}`);

    try {
      const res = await fetch(deleteUrl, {
        method: 'DELETE', // Specify the HTTP method as DELETE
      });

      if (!res.ok) {
        const errorText = await res.text(); // Read the error response text
        console.error(`[FoodCart] Delete failed with status: ${res.status} - ${res.statusText}. Response text: ${errorText}`);
        throw new Error(`Failed to delete item from food cart: ${errorText || res.statusText}`);
      }

      // If the response is OK, parse the JSON success message
      const data = await res.json();
      console.log('[FoodCart] Delete successful:', data.message);

      // Optimistically update the UI after successful backend deletion
      setRecipes((prev) => prev.filter((r) => r.id !== recipeIdToDelete));
      // Also remove the item from checkedItems if it was selected
      setCheckedItems((prev) => prev.filter((id) => id !== recipeIdToDelete));

    } catch (err) {
      console.error('[FoodCart] Error deleting recipe:', err);
      alert(`Failed to delete recipe: ${err.message}`); // Inform user about the error
    }
  };


  const handleShowIngredients = () => {
    const selected = recipes.filter((r) => checkedItems.includes(r.id));
    // Store selected recipe IDs in localStorage for robustness
    localStorage.set('selectedRecipeIds', checkedItems);
    navigate('/ingredients', { state: { selected } });
  };

  // The handleAddToInventory function was previously removed, so it's not here.

  return (
    <div className="page">
      <h1>Food Cart</h1>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isChecked={checkedItems.includes(recipe.id)}
            onToggleCheck={() => toggleCheck(recipe.id)}
            onView={() => setSelectedRecipe(recipe)}
            onDelete={() => handleDelete(recipe.id)} // This line calls the functional handleDelete
          />
        ))
      ) : (
        <p>Your food cart is empty.</p>
      )}

      <div className="foodcart-actions">
        <button onClick={handleShowIngredients} className="primary-btn">
          Show Ingredients
        </button>
        {/* The "Add to Inventory" button is no longer here */}
      </div>

      {selectedRecipe && (
        <RecipePopup
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}


// // pages/FoodCart.jsx
// import React, { useState, useEffect } from 'react';
// import { localStorage }  from "../utils/localStorage";
// import RecipeCard from '../components/RecipeCard';
// import RecipePopup from '../components/RecipePopup';
// import { useNavigate } from 'react-router-dom';
// import './FoodCart.css';

// export default function FoodCart() {
//   const [recipes, setRecipes] = useState([]);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [checkedItems, setCheckedItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFoodCartRecipes = async () => {
//       const owner_id = localStorage.getItem('id'); // FIXED
//       console.log('[FoodCart] owner_id from localStorage:', owner_id);

//       if (!owner_id) {
//         console.warn('[FoodCart] No owner_id found in localStorage. Aborting fetch.');
//         return;
//       }

//       const url = `${import.meta.env.VITE_API_LINK}/api/foodcart/${owner_id}`;
//       console.log('[FoodCart] Fetching:', url);

//       try {
//         const res = await fetch(url);
//         console.log('[FoodCart] Raw response:', res);

//         if (!res.ok) {
//           const errorText = await res.text();
//           console.error(`[FoodCart] Fetch failed with status: ${res.status} - ${res.statusText}. Response text: ${errorText}`);
//           throw new Error(`Server error: ${errorText || res.statusText}`);
//         }

//         const text = await res.text();
//         console.log('[FoodCart] Raw response text:', text);
//         const data = JSON.parse(text);
//         console.log('[FoodCart] Parsed JSON:', data);

//         setRecipes(data.recipes || []);
//       } catch (err) {
//         console.error('[FoodCart] Network or fetch error:', err);
//       }
//     };

//     fetchFoodCartRecipes();
//   }, []); // FIXED useEffect dependency array
// }
  


//   const toggleCheck = (id) => {
//     setCheckedItems((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );
//   };

//   const handleDelete = async (recipeIdToDelete) => {
//     const owner_id = localStorage.get('id');

//     if (!owner_id) {
//       console.error('[FoodCart] Cannot delete: No owner_id found in localStorage.');
//       alert('Error: User not logged in or owner ID missing.');
//       return;
//     }

//     const deleteUrl = `http://localhost:8080/api/foodcart/${owner_id}/${recipeIdToDelete}`;
//     console.log(`[FoodCart] Attempting to DELETE: ${deleteUrl}`);

//     try {
//       const res = await fetch(deleteUrl, {
//         method: 'DELETE',
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error(`[FoodCart] Delete failed with status: ${res.status} - ${res.statusText}. Response text: ${errorText}`);
//         throw new Error(`Failed to delete item from food cart: ${errorText || res.statusText}`);
//       }

//       const data = await res.json();
//       console.log('[FoodCart] Delete successful:', data.message);

//       setRecipes((prev) => prev.filter((r) => r.id !== recipeIdToDelete));
//       setCheckedItems((prev) => prev.filter((id) => id !== recipeIdToDelete));

//     } catch (err) {
//       console.error('[FoodCart] Error deleting recipe:', err);
//       alert(`Failed to delete recipe: ${err.message}`);
//     }
//   };


//   const handleShowIngredients = () => {
//     const selectedRecipeIds = checkedItems; // checkedItems already holds the IDs

//     if (selectedRecipeIds.length === 0) {
//       alert('Please select at least one recipe to view ingredients.');
//       return;
//     }

//     // --- NEW LOGIC HERE: Pass IDs as query parameters ---
//     // Join the selected IDs into a comma-separated string
//     const idsString = selectedRecipeIds.join(',');
//     // Navigate to /ingredients with the IDs in a query parameter
//     navigate(`/ingredients?ids=${idsString}`);
//     // --- END NEW LOGIC ---
//   };


//   // Removed handleAddToInventory as per previous request

//   return (
//     <div className="page">
//       <h1>Food Cart</h1>
//       {recipes.length > 0 ? (
//         recipes.map((recipe) => (
//           <RecipeCard
//             key={recipe.id}
//             recipe={recipe}
//             isChecked={checkedItems.includes(recipe.id)}
//             onToggleCheck={() => toggleCheck(recipe.id)}
//             onView={() => setSelectedRecipe(recipe)}
//             onDelete={() => handleDelete(recipe.id)}
//           />
//         ))
//       ) : (
//         <p>Your food cart is empty.</p>
//       )}

//       <div className="foodcart-actions">
//         <button onClick={handleShowIngredients} className="primary-btn">
//           Show Ingredients
//         </button>
//       </div>

//       {selectedRecipe && (
//         <RecipePopup
//           recipe={selectedRecipe}
//           onClose={() => setSelectedRecipe(null)}
//         />
//       )}
//     </div>
//   );

