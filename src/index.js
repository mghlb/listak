import * as dotenv from 'dotenv'
import app from './app.js'
import {PORT} from './config.js'

dotenv.config()

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
