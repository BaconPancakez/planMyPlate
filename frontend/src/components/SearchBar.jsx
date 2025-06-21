import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Trigger search functionality
      console.log('Searching for:', searchQuery);
      // You can replace this with your search logic
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for recipes"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown} // Handle Enter key press
        className="search-bar-input"
      />
    </div>
  );
}