// Importing necessary components and styles
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Explore from './pages/Explore';
import Home from './pages/Home';
import NavBar from './components/NavBar';

// The App component serves as the root component of the application
function App() {
  return (
    <div className="layout"> {/* Layout container for the app */}
      <NavBar /> {/* Navigation bar displayed globally */}
      <main className="main-content"> {/* Main content area */}
        <header className="main-header"> {/* Header section */}
        </header>
        <Routes> {/* Defines the routes for the application */}
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/Explore" element={<Explore />} /> {/* Explore page route */}
        </Routes>
      </main>
    </div>
  );
}

export default App;

