import express from 'express'
import cors from 'cors'
import recipeRoutes from './routes/recipes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("✅ PlanMyPlate backend is working!")
})

app.use("/api/recipes", recipeRoutes)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))
