import React from 'react';
import {Routes, Route, Link, useLocation} from 'react-router-dom';
import InventoryContent from '../components/InventoryContent.jsx';

import '../pages/Inventory.css';

function Inventory(){

    return (
        <div>
            <Routes>
                <Route path='/' element={
                    <div className="inventoryRoot">
                        <div className="header">
                            <h1>MY FRIDGE INVENTORY</h1>
                            <h3>- SELECT CATEGORY TO PROCEED -</h3>                        
                        </div>

                        {/* Background Container with Image + Buttons */}
                        <div className="background-wrapper">
                            <img src="./src/assets/Inventory.png" className="centered-fridge" />

                            <div className='Inventory-background-container'>
                                <Link to="content" className="columns">
                                <button>Spices & Condiments</button>
                                <button>Fruits</button>

                                <div className='same-row'>
                                    <button>Vegetables</button>
                                    <button>Grains</button>
                                </div>

                                <button>Dairy</button>

                                <div className='same-row'>
                                    <button>Meat</button>
                                    <button>VIEW ALL</button>
                                </div>
                                </Link>     
                            </div>
                        </div>
                    </div>
                }
                />

                <Route path='content' element={<InventoryContent />} />
            </Routes>

        </div>
    );
}

export default Inventory;