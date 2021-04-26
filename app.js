const { worldCupRequest } = require('./controllers/worldCupController')

const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.post('/worldCup', worldCupRequest)

app.listen(port, () => console.log(`Listening on port ${port}!`))

module.exports = app
