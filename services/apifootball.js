const axios = require('axios')
const { getResultString } = require('../utils/apifootballParser')
const { resultStringToHex } = require('../utils/helper')

const { ServiceError } = require('../errors/ServiceError')

const API_KEY = '40ac80710emsh1cbf4b4a579cd2cp1c2749jsn6afba898ac04'

const config = {
  method: 'get',
  url: '',
  headers: {
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    'x-rapidapi-key': API_KEY
  }
}

function getURL (apiString) {
  return `https://api-football-v1.p.rapidapi.com/v3/${apiString}`
}

/**
 * ### getWCResult (year)
 *
 * Scrape the match results of the world cup contest from The Soccer World Cups website
 *
 * @name getWCResult
 * @param {Integer} season to be scrapped
 * @return {Promise} promise returning the match results array or error
 */
async function getWCResult (season) {
  return getFixtures(season)
    .then(getResultString)
    .then(resultStringToHex)
    .catch(throwApplicationError)
}

async function getFixtures (season) {
  config.url = getURL(`fixtures?league=1&season=${season}`)

  return axios(config)
    .then(({ data }) => {
      return data.response
    })
    .catch(throwApplicationError)
}

function throwApplicationError (error) {
  throw new ServiceError({
    message: error.message,
    service: 'APIFootball'
  })
}

module.exports = {
  getWCResult
}
