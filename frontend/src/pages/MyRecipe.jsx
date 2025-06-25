// Importing the RecipeList component to display a list of recipes
import Postbox from "../components/Postbox";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import "./MyRecipe.css";
import { useState, useEffect } from "react";



// The Explore component represents the page where users can explore recipes
export default function MyRecipe() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filters, setFilters] = useState({ dietary: [], meal: [], total_time: [] });
  const [loading, setLoading] = useState(true);
  const profileId = 1; // later change to the user token

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
    if (newFilters.dietary.length)
      filtered = filtered.filter(r => newFilters.dietary.includes(r.dietary));
    if (newFilters.meal.length)
      filtered = filtered.filter(r => newFilters.meal.includes(r.meal));
    if (newFilters.total_time.length)
      filtered = filtered.filter(r => newFilters.total_time.includes(r.total_time));
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
