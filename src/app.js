import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import scrapList from './scrapList.js'
import helmet from 'helmet'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/:listId', async (req, res, next) => {
  const id = req.params.listId
  const url = `https://imdb-api.com/en/API/IMDbList/${process.env.API_KEY}/${id}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

app.get('/:userId/list/:listId', async (req, res, next) => {
  const {userId, listId} = req.params
  const params = `${userId}/list/${listId}`
  try {
    const data = await scrapList(params)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({message: 'Failed to fetch'})
})

export default app
