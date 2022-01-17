const axios = require('axios')
const { getTournamentResultsArray } = require('../utils/sportsradarParser')
const { getResultsHex, sleep } = require('../utils/helper')

const { ServiceError } = require('../errors/ServiceError')

const config = {
  method: 'get',
  url: ''
}

function getURL (apiString) {
  return `https://api.sportradar.us/ncaamb/${process.env.SPORTSRADAR_ACCESS_LEVEL}/v7/en/${apiString}.json?api_key=${process.env.SPORTSRADAR_API_KEY}`
}

/**
 * ### getTournamentResult (season)
 *
 * Return the match results of the NCAA Basketball from sportsradar.us API
 *
 * @name getTournamentResult
 * @param {Integer} season year / season of tournament to get
 * @return {Promise} promise returning the hex string of match results array or error
 */
async function getTournamentResult (season) {
  return getTournament(season)
    .then(getTournamentSchedule)
    .then(getTournamentResultsArray)
    .then(getResultsHex)
    .catch(throwApplicationError)
}

/**
 * ### getTournaments (season)
 *
 * Return the all tournaments of the season from API
 *
 * @name getTournaments
 * @param {Integer} season year / season of tournaments to get
 * @return {Array} tournament list of the season or error
 */
async function getTournaments (season) {
  await sleep(1000)
  config.url = getURL(`tournaments/${parseInt(season) - 1}/pst/schedule`)

  return axios(config)
    .then(({ data }) => {
      return data.tournaments
    })
    .catch(throwApplicationError)
}

/**
 * ### getTournament (season)
 *
 * Return the NCAA basketball tournament object of the season from API
 *
 * @name getTournament
 * @param {Integer} season year / season of tournament to get
 * @return {Object} NCAA basketball tournament object or error
 */
async function getTournament (season) {
  return getTournaments(season)
    .then((tournaments) => {
      return tournaments.find(tournament => tournament.name === "NCAA Men's Division I Basketball Tournament")
    })
    .catch(throwApplicationError)
}

/**
 * ### getTournamentSchedule (season)
 *
 * Return the schedule of the tournament
 *
 * @name getTournamentSchedule
 * @param {Object} tournamentId id of tournament
 * @return {Array} rounds list (schedule) of the tournament or error
 */
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
