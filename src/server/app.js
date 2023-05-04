import express from 'express'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())

app.get('/:listId', (req, res) => {
  const id = req.params.listId
  const url = `https://imdb-api.com/en/API/IMDbList/${process.env.API_KEY}/${id}`
  res.json(url)
})

app.get('/', (req, res) => {
  res.send('hello')
})

export default app
