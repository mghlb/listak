import express from 'express'
import cors from 'cors'
import axios from 'axios'
import helmet from 'helmet'
import morgan from 'morgan'
import scrapList from './scrapList.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - [:date[clf]]'))

app.get('/:listId', async (req, res, next) => {
  const id = req.params.listId
  const url = `https://imdb-api.com/en/API/IMDbList/${process.env.API_KEY}/${id}`
  try {
    const response = await axios.get(url, {responseType: 'json'})
    res.json(response.data)
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
  res.status(400).json({message: 'Failed to fetch'})
})

/**
 *
 * number, string ->
 */

export default app
