// Importing the RecipeList component to display a list of recipes
import RecipeList from '../components/RecipeList';

// The Explore component represents the page where users can explore recipes
export default function Explore() {
  return (
      <div className="main-container"> {/* Main container for the content */}
        <main className="main-content"> {/* Main content area */}
          <RecipeList /> {/* Displays the list of recipes */}
        </main>
      </div>
  );
}
