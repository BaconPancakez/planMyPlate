import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.json([
    { id: 1, title: 'Mock Recipe 1' },
    { id: 2, title: 'Mock Recipe 2' }
  ])
})

export default router
