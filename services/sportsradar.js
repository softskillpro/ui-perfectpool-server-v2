const axios = require('axios')
const { getTournamentResultsArray } = require('../utils/sportsradarParser')
const { getResultsHex } = require('../utils/helper')

const { ServiceError } = require('../errors/ServiceError')

const accessLevel = 'trial' // 'production'
const API_KEY = 'pvdtukgptvfcu3y3aaupfndb'

const config = {
  method: 'get',
  url: ''
}

function getURL (apiString) {
  return `https://api.sportradar.us/ncaamb/${accessLevel}/v7/en/${apiString}.json?api_key=${API_KEY}`
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
async function getTournamentResult (tournamentId) {
  return getTournamentSchedule(tournamentId)
    .then(getTournamentResultsArray)
    .then(getResultsHex)
    .catch(throwApplicationError)
}

async function getTournamentSchedule (tournamentId) {
  config.url = getURL(`tournaments/${tournamentId}/schedule`)

  return axios(config)
    .then(({ data }) => {
      return data.rounds
    })
    .catch(throwApplicationError)
}

function throwApplicationError (error) {
  throw new ServiceError({
    message: error.message,
    service: 'SoccerWorldCups'
  })
}

module.exports.getTournamentResult = getTournamentResult
