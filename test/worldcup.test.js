const assert = require('chai').assert
const supertest = require('supertest')

const app = require('../app')

const request = supertest(app)

describe('The World Cups', () => {
  it('should correctly scrap score results', (done) => {
    request
      .post('/worldCup')
      .then((res) => {
        const body = res.body

        assert.equal(res.status, 200)
        assert.equal(body.statusCode, 200)
        assert.equal(body.jobRunID, 1)
        assert.isNotEmpty(body.data)
        assert.match(body.data.result, /^0x[\d\w]{63}7$/)
        assert.match(body.result, /^0x[\d\w]{63}7$/)

        done()
      })
      .catch(err => done(err))
  })
})
