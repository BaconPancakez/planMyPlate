import './RecipePop.css' 


export default function AddRecipe() {
  return (
    <div className='recipe-popup'>
    <p className='createnewpost'
      
    >  Create New Post</p>
            <div className="recipe-header">
                <button className = 'addTitle-button' 
                >Add Title</button>
            </div>   
            
    <div className="popup-container ">
             

            
            {/* <button className="close-button" onClick={() => {}}>X</button> */}

            <div className="addrecipe-main">
              <div className = 'left-bar'>
              <div className = 'add-image'>
                
                <button style = {{
                  background: null,
                  width: '300px',
                  height: '200px',
                }}>
                  <img src= '.assets/Add_image.png' alt="Add Recipe" />
                  
                </button>

              </div>

              <div className = 'ingredients'>
                <h2>Ingredients</h2>
                <ul>
                    <li>Ingredient 1</li>
                    <li>Ingredient 2</li>
                    <li>Ingredient 3</li>
                </ul>

              </div>

              </div>
              
              <div className = 'directions right-bar'>
                <h2>Directions</h2>
                <p>Step 1: Do this...</p>
                <p>Step 2: Then do that...</p>


              </div>

            </div>

            <div className = 'post-button'>
                <button style = {{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100px',
                        backgroundColor: '#FEE7E7',
                        color: '#000',
                }}>Post

                </button>

              </div>

    </div>
    </div>
  );
}


