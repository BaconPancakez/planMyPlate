import React from 'react';
import {Routes, Route, Link, useLocation} from 'react-router-dom';
import InventoryContent from './InventoryContent.jsx';

import './Inventory.css';

function Inventory(){

    return (
        <div className="inventoryRoot">
            <Routes>
                <Route path='/' element={
                    <>
                    <div className="header">
                        <h1>Inventory Categories</h1>
                        <h4>Select Category to Proceed</h4>                        
                    </div>

                        {/* Background Container with Image + Buttons */}
                        <div className="background-wrapper">
                            <img src="./img/Inventory.png" className="centered-fridge" />

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
                    </>
                }
                />

                <Route path='content' element={<InventoryContent />} />
            </Routes>

        </div>
    );
}

export default Inventory;