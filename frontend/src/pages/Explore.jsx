// Importing the RecipeList component to display a list of recipes
import RecipeList from '../components/RecipeList';
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";

// The Explore component represents the page where users can explore recipes
export default function Explore() {
  return (
      <div className="main-container"> {/* Main container for the content */}
        <main className="main-content"> {/* Main content area */}
          <div className = 'sub-header'
            style = {{
                paddingLeft: '40px',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                alignItems: 'center',
                margin: '10px',
            }}
          >
            <SearchBar/>  
            <Filter/>
          </div>
          <RecipeList /> {/* Displays the list of recipes */}
        </main>
      </div>
  );
}
