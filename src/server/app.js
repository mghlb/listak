import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('HI')
})

app.get('/:listId', async (req, res) => {
  const id = req.params.listId
  console.log(process.env.API_KEY)
  const url = `https://imdb-api.com/en/API/IMDbList/${process.env.API_KEY}/${id}`
  const response = await fetch(url)
  const data = await response.json()
  res.json(data)
})

export default app
