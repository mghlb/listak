import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
const app = express()

app.use(cors())
app.use(express.json())

app.get('/:listId', async (req, res) => {
  const id = req.params.listId
  console.log(id)
  console.log(process.env.API_KEY)
  const url = `https://imdb-api.com/en/API/IMDbList/${process.env.API_KEY}/${id}`
  console.log(url)
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
  res.send(data)
})

app.get('/', (req, res) => {
  res.send('hello')
})

export default app
