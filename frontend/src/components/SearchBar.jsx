import React from 'react';
import './SearchBar.css';

export default function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for recipes by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search-bar-input"
      />
    </div>
  );
}