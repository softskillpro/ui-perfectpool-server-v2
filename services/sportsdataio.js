const axios = require('axios')
const { getTournamentResultsArray } = require('../utils/sportsdataioParser')
const { getResultsHex } = require('../utils/helper')

const { ServiceError } = require('../errors/ServiceError')

const API_KEY = 'aa595fa4f83a4657abc53bdbd60f35ec'

const config = {
  method: 'get',
  url: ''
}

function getURL (apiString) {
  return `https://api.sportsdata.io/v3/cbb/scores/json/${apiString}?key=${API_KEY}`
}

/**
 * ### getTournamentResult (year)
 *
 * Scrape the match results of the world cup contest from The Soccer World Cups website
 *
 * @name getTournamentResult
 * @param {Integer} year to be scrapped
 * @return {Promise} promise returning the match results array or error
 */
async function getTournamentResult (season) {
  return getTournamentScores(season)
    .then(getTournamentResultsArray)
    .then(getResultsHex)
    .catch(throwApplicationError)
}

async function getTournamentScores (season) {
  config.url = getURL(`Tournament/${season}`)

  return axios(config)
    .then(({ data }) => {
      return data.Games
    })
    .catch(throwApplicationError)
}

function throwApplicationError (error) {
  throw new ServiceError({
    message: error.message,
    service: 'SportsDataIO'
  })
}

module.exports.getTournamentResult = getTournamentResult
