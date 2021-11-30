const assert = require('chai').assert
const supertest = require('supertest')

const app = require('../app')

const request = supertest(app)

describe('The NCAA Basketball', () => {
  it('should correctly fetch score results', (done) => {
    request
      .post('/ncaa')
      .then((res) => {
        const body = res.body

        assert.equal(res.status, 200)
        assert.equal(body.statusCode, 200)
        assert.equal(body.jobRunID, 1)
        assert.isNotEmpty(body.data)
        assert.match(body.data.result, /[A-Fa-f0-9]{16}$/)
        assert.match(body.result, /[A-Fa-f0-9]{16}$/)

        done()
      })
      .catch(err => done(err))
  })
})
