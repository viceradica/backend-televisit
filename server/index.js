import mongoose from 'mongoose'
import express from 'express'
import config from '../server/config/index'
const cors = require('cors')

const app = express()

const dbUri = config.db.connectionString
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to db successfully'))
  .catch(error => {
    console.log('failed to connect to db, reason: ', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

require('./models/user')
require('./config/passport')
require('./services/scheduler')
app.use(require('./routes'))

app.listen(config.server.port, function() {
  console.log(`Server running at http://${config.server.host}:${config.server.port}`)
})
