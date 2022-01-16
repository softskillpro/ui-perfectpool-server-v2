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
 * ### getTournamentResult (season)
 *
 * Return the match results of the NCAA Basketball from sportsdata.io API
 *
 * @name getTournamentResult
 * @param {Integer} season year / season of tournament to get
 * @return {Promise} promise returning the hex string of match results array or error
 */
async function getTournamentResult (season) {
  return getTournamentScores(season)
    .then(getTournamentResultsArray)
    .then(getResultsHex)
    .catch(throwApplicationError)
}

/**
 * ### getTournamentScores (season)
 *
 * Return the match results of the NCAA Basketball from sportsdata.io API
 *
 * @name getTournamentScores
 * @param {Integer} season year / season of tournament to get
 * @return {Array} game list of the tournament or error
 */
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

module.exports = {
  getTournamentResult
}
