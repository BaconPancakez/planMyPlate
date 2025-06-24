// Importing the RecipeList component to display a list of recipes
import Postbox from "../components/Postbox";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import "./MyRecipe.css";

// The Explore component represents the page where users can explore recipes
export default function MyRecipe() {
  return (
    <>
      <div className="main-container"> {/* Main container for the content */}
        <main className="main-content"> {/* Main content area */}
          <div className="sub-header"> {/* Sub-header for search and filter */}
            <SearchBar />  
            <Filter/>
          </div>
          <Postbox /> {/* Displays the list of recipes */}
        </main>
      </div>
    </>
  );
}
