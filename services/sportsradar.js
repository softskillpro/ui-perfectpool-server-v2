const axios = require('axios')
const { getTournamentResultsArray } = require('../utils/sportsradarParser')
const { getResultsHex, sleep } = require('../utils/helper')

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
 * @param {Integer} season to be scrapped
 * @return {Promise} promise returning the match results array or error
 */
async function getTournamentResult (season) {
  return getTournament(season)
    .then(getTournamentSchedule)
    .then(getTournamentResultsArray)
    .then(getResultsHex)
    .catch(throwApplicationError)
}

async function getTournaments (season) {
  await sleep(1000)
  config.url = getURL(`tournaments/${parseInt(season) - 1}/pst/schedule`)

  return axios(config)
    .then(({ data }) => {
      return data.tournaments
    })
    .catch(throwApplicationError)
}

async function getTournament (season) {
  return getTournaments(season)
    .then((tournaments) => {
      return tournaments.find(tournament => tournament.name === "NCAA Men's Division I Basketball Tournament")
    })
    .catch(throwApplicationError)
}

async function getTournamentSchedule ({ id: tournamentId }) {
  await sleep(1000)
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
    service: 'SportsRadar'
  })
}

module.exports = {
  getTournamentResult,
  getTournament,
  getTournamentSchedule
}
