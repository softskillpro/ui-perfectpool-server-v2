const createRequest = require('./index').createRequest
const { worldCupRequest } = require('./controllers/worldCupController');

const express = require('express')
const app = express();
const port = process.env.PORT || 5000

app.use(express.json())

app.post('/', (req, res) => {
  console.log('POST Data: ', req.body)
  createRequest(req.body, (status, result) => {
    console.log('Result: ', result)
    res.status(status).json(result)
  })
})

app.post('/worldCup', worldCupRequest);

app.listen(port, () => console.log(`Listening on port ${port}!`))
