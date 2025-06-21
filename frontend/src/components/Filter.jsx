import {useState} from 'react';


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
                .filter(([_, checked]) => checked)
                .map(([name]) => name)
                .join(', ') || 'None'
        );
        setOpen(false);
        // insert logic here to filter recipes
    };



    return (
        <div className="filter-container" style ={{ position: 'relative'  }}>
        
        <button 
        style={{ 
            padding: '10px 20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: '#D9D9D9' ,
            
         }}
         onClick= {handleButtonClick}
         
         >Apply Filters ▼</button>
         {open && (
            <div
                style = {{
                    position: 'absolute',
                    top: '110%',
                    left: 10,
                    backgroundColor: '#D9D9D9',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    // minWidth: '140px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                }}
            >
                {Object.keys(filters).map((option) => (
                        <label key={option} style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={filters[option]}
                                onChange={() => handleCheckboxChange(option)}
                                style={{ marginRight: '8px' }}
                            />
                            {option}
                        </label>
                    ))}
                    <button
                        style={{
                            marginTop: '8px',
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: 'none',
                            background: 'rgb(112, 112, 112)',
                            color: '#fff',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}
                        onClick={handleApply}
                    >
                        Apply
                    </button>


                {/* <div
                    style = {{ padding: '8px', cursor: 'pointer' }}
                    onClick = {() => handleOptionClick('Cuisine')}
                >Cuisine</div>

                <div
                    style = {{ padding: '8px', cursor: 'pointer' }}
                    onClick = {() => handleOptionClick('Meal Type')}
                >Meal Type</div>

                <div
                    style = {{ padding: '8px', cursor: 'pointer' }}
                    onClick = {() => handleOptionClick('Dietary Filter')}
                >Dietary Filter</div>

                <div
                    style = {{ padding: '8px', cursor: 'pointer' }}
                    onClick = {() => handleOptionClick('Calories')}
                >Calories</div>

                <div
                    style = {{ padding: '8px', cursor: 'pointer' }}
                    onClick = {() => handleOptionClick('Total Time')}
                >Total Time</div> */}

            </div>

         )}


        </div>
    );
}

