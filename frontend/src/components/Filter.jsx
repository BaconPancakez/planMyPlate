import { useState } from 'react';
import './Filter.css';

export default function Filter({ onApplyFilters }) {
  const [open, setOpen] = useState(false);
  // Separate state for each filter group
  const [dietary, setDietary] = useState({ Vegetarian: false, Vegan: false, Halal: false });
  const [mealType, setMealType] = useState({ Breakfast: false, Lunch: false, Dinner: false });
  const [totalTime, setTotalTime] = useState({ '< 30 min': false, '30-60 min': false, '> 1 Hr': false });

  const handleButtonClick = () => setOpen((prev) => !prev);

  const handleCheckboxChange = (group, option) => {
    if (group === 'Dietary') {
      setDietary((prev) => ({ ...prev, [option]: !prev[option] }));
    } else if (group === 'Meal Type') {
      setMealType((prev) => ({ ...prev, [option]: !prev[option] }));
    } else if (group === 'Total Time') {
      setTotalTime((prev) => ({ ...prev, [option]: !prev[option] }));
    }
  };

  const handleApply = () => {
    const selectedDietary = Object.entries(dietary).filter(([, checked]) => checked).map(([name]) => name);
    const selectedMealType = Object.entries(mealType).filter(([, checked]) => checked).map(([name]) => name);
    const selectedTotalTime = Object.entries(totalTime).filter(([, checked]) => checked).map(([name]) => name);
    // Remove alert, just call onApplyFilters
    if (onApplyFilters) {
      onApplyFilters({
        dietary: selectedDietary,
        meal: selectedMealType,
        total_time: selectedTotalTime,
      });
    }
    setOpen(false);
  };

  return (
    <div className="filter-container">
      <button className="filter-button" onClick={handleButtonClick}>
        Add Filters ▼
      </button>
      {open && (
        <div className='parent-dropdown'>
          <div className="dropdown">
            <div className="dropdown-header" style={{ marginTop: 0 }}>Dietary</div>
            {Object.keys(dietary).map((option) => (
              <label key={option} className="dropdown-label">
                <input
                  type="checkbox"
                  checked={dietary[option]}
                  onChange={() => handleCheckboxChange('Dietary', option)}
                  className="dropdown-input"
                />
                {option}
              </label>
            ))}
            <div className="dropdown-header" style={{ marginTop: '1.5em' }}>Meal Type</div>
            {Object.keys(mealType).map((option) => (
              <label key={option} className="dropdown-label">
                <input
                  type="checkbox"
                  checked={mealType[option]}
                  onChange={() => handleCheckboxChange('Meal Type', option)}
                  className="dropdown-input"
                />
                {option}
              </label>
            ))}
            <div className="dropdown-header" style={{ marginTop: '1.5em' }}>Total Time</div>
            {Object.keys(totalTime).map((option) => (
              <label key={option} className="dropdown-label">
                <input
                  type="checkbox"
                  checked={totalTime[option]}
                  onChange={() => handleCheckboxChange('Total Time', option)}
                  className="dropdown-input"
                />
                {option}
              </label>
            ))}
            <button className="dropdown-apply-button" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

