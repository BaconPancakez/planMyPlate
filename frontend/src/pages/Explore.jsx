// Importing the RecipeList component to display a list of recipes
import RecipeList from '../components/RecipeList';
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import "./MyRecipe.css";

// The Explore component represents the page where users can explore recipes
export default function Explore() {
  return (
      <div className="main-container"> {/* Main container for the content */}
        <main className="main-content"> {/* Main content area */}
          <div className = 'sub-header'>
            <SearchBar/>  
            <Filter/>
          </div>
          <RecipeList /> {/* Displays the list of recipes */}
        </main>
      </div>
  );
}
