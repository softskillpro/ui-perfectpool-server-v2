const axios = require('axios')
const { getTournament, getTournamentSchedule } = require('./sportsradar')
const { getTournamentResultsArray } = require('../utils/sportspagefeedsParser')
const { getResultsHex } = require('../utils/helper')

const { ServiceError } = require('../errors/ServiceError')

function getURL (apiString) {
  return `https://sportspage-feeds.p.rapidapi.com/${apiString}`
}

function getConfig (apiString) {
  return {
    method: 'get',
    url: getURL(apiString),
    headers: {
      'x-rapidapi-host': 'sportspage-feeds.p.rapidapi.com',
      'x-rapidapi-key': process.env.SPORTSPAGEFEEDS_API_KEY
    }
  }
}

/**
 * ### getTournamentResult (season)
 *
 * Return the match results of the NCAA Basketball from sportspagefeeds API
 *
 * @name getTournamentResult
 * @param {Integer} season year / season of tournament to get
 * @return {Promise} promise returning the hex string of match results array or error
 */
function getTournamentResult (season) {
  return getGames(season)
    .then(getTournamentResultsArray)
    .then(getResultsHex)
    .catch(throwApplicationError)
}

/**
 * ### getGames (season)
 *
 * Return the match results of the NCAA Basketball from sportsdata.io API
 *
 * @name getGames
 * @param {Integer} season year / season of tournament to get
 * @return {Object} Object with rounds and games or error
 */
async function getGames (season) {
  const { start_date: startDate, end_date: endDate, id } = await getTournament(season)
  const rounds = await getTournamentSchedule({ id })

  return axios(getConfig(`games?league=NCAAB&date=${startDate},${endDate}`))
    .then(({ data }) => {
      return { rounds, results: data.results }
    })
    .catch(throwApplicationError)
}

function throwApplicationError (error) {
  throw new ServiceError({
    message: error.message,
    service: 'SportsPageFeeds'
  })
}

module.exports = {
  getTournamentResult
}
