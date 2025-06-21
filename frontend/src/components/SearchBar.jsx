import React, {useState} from 'react';
export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Trigger search functionality
            console.log('Searching for:', searchQuery);
            // You can replace this with your search logic
        }
    }


    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search for recipes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}    
                onKeyDown={handleKeyDown} // Handle Enter key press
                style={{
                    width: '500px',
                    maxWidth: '500px',
                    padding: '10px',
                    borderRadius: '20px',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    backgroundColor: '#D9D9D9',
                }}
            />
            
        </div>
    );
    }