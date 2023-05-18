import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
const app = express()

app.use(cors())
app.use(express.json())

app.get('/:listId', async (req, res) => {
  const id = req.params.listId
  const url = `https://imdb-api.com/en/API/IMDbList/${process.env.API_KEY}/${id}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch {
    res.status(500).send('Server problems... Try again later.')
  }
})

export default app
