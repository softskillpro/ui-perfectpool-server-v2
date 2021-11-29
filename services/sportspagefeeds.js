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
 * ### getTournamentResult (year)
 *
 * Scrape the match results of the world cup contest from The Soccer World Cups website
 *
 * @name getTournamentResult
 * @param {Integer} season to be scrapped
 * @return {Promise} promise returning the match results array or error
 */
function getTournamentResult (season) {
  return getGames(season)
    .then(getTournamentResultsArray)
    .then(getResultsHex)
    .catch(throwApplicationError)
}

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
