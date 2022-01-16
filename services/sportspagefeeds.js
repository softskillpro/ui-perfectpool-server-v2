const axios = require('axios')
const { getTournament, getTournamentSchedule } = require('./sportsradar')
const { getTournamentResultsArray } = require('../utils/sportspagefeedsParser')
const { getResultsHex } = require('../utils/helper')

const { ServiceError } = require('../errors/ServiceError')

const API_KEY = '40ac80710emsh1cbf4b4a579cd2cp1c2749jsn6afba898ac04'

const config = {
  method: 'get',
  url: '',
  headers: {
    'x-rapidapi-host': 'sportspage-feeds.p.rapidapi.com',
    'x-rapidapi-key': API_KEY
  }
}

function getURL (apiString) {
  return `https://sportspage-feeds.p.rapidapi.com/${apiString}`
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

  config.url = getURL(`games?league=NCAAB&date=${startDate},${endDate}`)

  return axios(config)
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
