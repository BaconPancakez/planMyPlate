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
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const profileId = localStorage.get('id'); // later change to the user token

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        console.log('Fetching initial recipes for profileId:', profileId);
        const response = await fetch(`http://localhost:8080/user-recipes/${profileId}`);
        const data = await response.json();
        if (data.success) {
          console.log('Fetched recipes:', data.recipes);
          setAllRecipes(data.recipes);
          setFilteredRecipes(data.recipes);
        } else {
          console.error('Failed to fetch recipes:', data.error);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    if (profileId) {
        fetchRecipes();
    } else {
        setLoading(false);
        console.log("No profileId found, not fetching recipes.");
    }
  }, [profileId]);

  const fetchAndFilterRecipes = async (currentFilters, currentSearchQuery) => {
    if (!currentFilters.dietary.length && !currentFilters.meal.length && !currentFilters.total_time.length && !currentSearchQuery) {
      console.log('No filters or search query, showing all recipes.');
      setFilteredRecipes(allRecipes);
      return;
    }

    const params = new URLSearchParams();
    if (currentFilters.dietary.length) params.append('dietary', currentFilters.dietary.join(','));
    if (currentFilters.meal.length) params.append('meal', currentFilters.meal.join(','));
    if (currentFilters.total_time.length) params.append('total_time', currentFilters.total_time.join(','));
    if (currentSearchQuery) params.append('searchTerm', currentSearchQuery);
    if (profileId) params.append('author', profileId);

    const fetchUrl = `http://localhost:8080/user-recipes/filter?${params.toString()}`;
    console.log('Fetching filtered recipes from:', fetchUrl);

    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      if (data.success) {
        console.log('Filtered recipes received:', data.recipes);
        setFilteredRecipes(data.recipes);
      } else {
        console.error('Failed to fetch filtered recipes:', data.error);
        setFilteredRecipes([]);
      }
    } catch (error) {
      console.error('Error fetching filtered recipes:', error);
      setFilteredRecipes([]);
    }
  };

  const handleApplyFilters = (newFilters) => {
    console.log('Applying filters:', newFilters);
    setFilters(newFilters);
    fetchAndFilterRecipes(newFilters, searchQuery);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    fetchAndFilterRecipes(filters, searchQuery);
  };

  return (
    <>
      <div className="main-container"> {/* Main container for the content */}
        <main className="main-content"> {/* Main content area */}
          <div className="sub-header"> {/* Sub-header for search and filter */}
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              onSearch={handleSearch} 
            />  
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
