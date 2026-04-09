const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(config.URI).then(() => {
    logger.info('connected to MongoDB')
})
    .catch((error) => {
        logger.error('Error connecting to MongoDB: ', error.message)
    })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use('/api/blogs', notesRouter)

module.exports = app