import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import router from './routes'
import path from 'path'

dotenv.config()

const port = 4000

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/temp', express.static(path.join(__dirname, '/../', 'temp')))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
