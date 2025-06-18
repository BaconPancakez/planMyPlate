import "./RecipePop.css";

export default function RecipePop(){
    return(
        <div className="recipe-popup">
            <div className="recipe-header">
                {/* Title */}
                <h1>pancakes</h1>
                {/* Stats */}
                <div className="stats">
                    <p>Prep Time: 10 mins</p>
                    <span className="bar">|</span>
                    <p>Cook Time: 10 mins </p>
                    <span className="bar">|</span>
                    <p>Total Time: 20 min</p>
                </div>
            </div>
            <div className="recipe-main">
                <div className="left-bar">
                    <img src='./src/assets/pancakes.jpg'></img>
                    <h2>Ingredients</h2>
                    <ul>
                        {/* Make it dymanic */}
                        <li>195g Butter</li>
                        <li>2 tablespoons sugar</li>
                        <li>1 tablespoon baking powder</li>
                        <li>1/2 teaspoon of fine sea</li>
                        <li>295ml milk</li>
                        <li>1 egg</li>
                        <li>70g unsalted butter</li>
                        <li>2 teaspoon vanilla extract</li>
                    </ul>
                </div>
                <div className="right-bar">
                    <h2>Directions</h2>
                    <ol>
                        {/* Make it dymanic */}
                        <li>
                            Melt the butter and set it aside. In a medium bowl, whisk together the flour, sugar, baking powder, and salt.
                        </li>
                        <li>
                            In a separate bowl, whisk together milk, egg, melted butter, and vanilla extract. (Don’t worry if the butter solidifies slightly).
                        </li>
                        <li>
                            Create a well in the center of your dry ingredients. Pour in the milk mixture and stir gently with a fork until the flour is just incorporated. A few small lumps are okay. As the batter sits, it should start to bubble.
                        </li>
                        <li>
                            Place a large skillet or griddle over medium heat. Sprinkle in a few drops of water to test if it’s ready. You want them to dance around a bit and evaporate.
                        </li>
                        <li>
                            Brush the skillet with melted butter (this creates crispy edges, but you can skip it if using a quality nonstick pan).
                        </li>
                        <li>
                            Scoop the batter onto the skillet using a 1/4 cup measure or large cookie scoop, and spread each pancake into a 4-inch circle.
                        </li>
                        <li>
                            After 1 to 2 minutes, the edges will look dry, and bubbles will form and pop on the surface. Flip the pancakes and cook for another 1 to 2 minutes until lightly browned and cooked in the middle.
                        </li>
                        <li>
                            Serve immediately with warm syrup, butter, and berries.
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}