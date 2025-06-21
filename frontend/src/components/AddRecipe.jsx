import './AddRecipe.css';

export default function AddRecipe() {
  return (
    <div className='recipe-popup'>
      <p className='createnewpost'>Create New Post</p>
      <div className="recipe-header">
        <button className='addTitle-button'>Add Title</button>
      </div>

      <div className="popup-container">
        <div className="addrecipe-main">
          <div className='left-bar'>
            <div className='add-image'>
              <button className='add-image-button'>
                <img src='.assets/Add_image.png' alt="Add Recipe" />
              </button>
            </div>

            <div className='ingredients'>
              <h2>Ingredients</h2>
              <ul>
                <li>Ingredient 1</li>
                <li>Ingredient 2</li>
                <li>Ingredient 3</li>
              </ul>
            </div>
          </div>

          <div className='directions right-bar'>
            <h2>Directions</h2>
            <p>Step 1: Do this...</p>
            <p>Step 2: Then do that...</p>
          </div>
        </div>

        <div className='post-button'>
          <button className='post-button-style'>Post</button>
        </div>
      </div>
    </div>
  );
}


