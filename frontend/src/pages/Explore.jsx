import { useState } from 'react';
import NavBar from '../components/NavBar';
import RecipeList from '../components/RecipeList';
import './Explore.css';

export default function Explore() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // sidebar toggle

  return (
    <div className={`layout ${isOpen ? 'expanded' : ''} ${isPopupOpen ? 'popup-active' : ''}`}>
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="main-container">
        <header className="main-header"></header>
        <main className="main-content">
          <RecipeList setIsPopupOpen={setIsPopupOpen} />
        </main>
      </div>
    </div>
  );
}
