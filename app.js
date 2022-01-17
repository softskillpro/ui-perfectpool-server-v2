const { ncaaRequest } = require('./controllers/ncaaController')

require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.post('/ncaa', ncaaRequest)

app.listen(port, () => console.log(`Listening on port ${port}!`))

module.exports = app
