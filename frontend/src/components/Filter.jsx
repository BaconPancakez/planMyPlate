import { useState } from 'react';
import './Filter.css';

export default function Filter() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    Cuisine: false,
    'Meal Type': false,
    'Dietery Filters': false,
    Calories: false,
    'Total Time': false,
  });

  const handleButtonClick = () => setOpen((prev) => !prev);

  const handleCheckboxChange = (option) => {
    setFilters((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleApply = () => {
    alert(
      'Filters applied: ' +
        Object.entries(filters)
          .filter(([, checked]) => checked)
          .map(([name]) => name)
          .join(', ') || 'None'
    );
    setOpen(false);
    // insert logic here to filter recipes
  };

  return (
    <div className="filter-container">
      <button className="filter-button" onClick={handleButtonClick}>
        Apply Filters ▼
      </button>
      {open && (
        <div className="dropdown">
          {Object.keys(filters).map((option) => (
            <label key={option} className="dropdown-label">
              <input
                type="checkbox"
                checked={filters[option]}
                onChange={() => handleCheckboxChange(option)}
                className="dropdown-input"
              />
              {option}
            </label>
          ))}
          <button className="dropdown-apply-button" onClick={handleApply}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

