// Importing the RecipeList component to display a list of recipes
import Postbox from "../components/Postbox";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import "./MyRecipe.css";
import { useState, useEffect } from "react";
import { localStorage } from "../utils/localStorage";



// The Explore component represents the page where users can explore recipes
export default function MyRecipe() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filters, setFilters] = useState({ dietary: [], meal: [], total_time: [] });
  const [loading, setLoading] = useState(true);
  const profileId = localStorage.get('id'); // later change to the user token

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user-recipes/${profileId}`);
        const data = await response.json();
        if (data.success) {
          setAllRecipes(data.recipes);
          setFilteredRecipes(data.recipes);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [profileId]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    let filtered = allRecipes;

    // Helper to normalize values for comparison
    const normalize = v => (Array.isArray(v) ? v.map(x => String(x).toLowerCase().trim()) : String(v).toLowerCase().trim());

    // Dietary filter (handles array or string in recipe)
    if (newFilters.dietary.length) {
      const selected = newFilters.dietary.map(v => v.toLowerCase().trim());
      filtered = filtered.filter(r => {
        const val = normalize(r.dietary);
        if (Array.isArray(val)) return val.some(v => selected.includes(v));
        return selected.includes(val);
      });
    }
    // Meal filter
    if (newFilters.meal.length) {
      const selected = newFilters.meal.map(v => v.toLowerCase().trim());
      filtered = filtered.filter(r => {
        const val = normalize(r.meal);
        if (Array.isArray(val)) return val.some(v => selected.includes(v));
        return selected.includes(val);
      });
    }
    // Total time filter
    if (newFilters.total_time.length) {
      const selected = newFilters.total_time.map(v => v.toLowerCase().trim());
      filtered = filtered.filter(r => {
        const val = normalize(r.total_time);
        if (Array.isArray(val)) return val.some(v => selected.includes(v));
        return selected.includes(val);
      });
    }
    setFilteredRecipes(filtered);
  };

  return (
    <>
      <div className="main-container"> {/* Main container for the content */}
        <main className="main-content"> {/* Main content area */}
          <div className="sub-header"> {/* Sub-header for search and filter */}
            <SearchBar />  
            <Filter onApplyFilters={handleApplyFilters}/>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Postbox profileId={profileId} recipes={filteredRecipes} />
          )}
        </main> {/*later change to the user token*/}
      </div>
    </>
  );
}
