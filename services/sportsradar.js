const axios = require('axios')
const { getResultString } = require('../utils/sportsradarParser')
const { resultStringToHex, sleep } = require('../utils/helper')

const { ServiceError } = require('../errors/ServiceError')

const accessLevel = 'trial' // 'production'
const API_KEY = 'ppd3serfpdps24fhaeen596q'

const config = {
  method: 'get',
  url: ''
}

function getURL (apiString) {
  return `https://api.sportradar.us/soccer-extended/${accessLevel}/v4/en/${apiString}.json?api_key=${API_KEY}`
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
  return getSeason(season)
    .then(getSeasonSchedule)
    .then(getResultString)
    .then(resultStringToHex)
    .catch(throwApplicationError)
}

async function getSeasons () {
  config.url = getURL('seasons')

  return axios(config)
    .then(({ data }) => {
      return data.seasons
    })
    .catch(throwApplicationError)
}

async function getSeason (year) {
  return getSeasons()
    .then((seasons) => {
      return seasons.find(season => (season.name === 'World Cup') && (Number(season.year) === year))
    })
    .catch(throwApplicationError)
}

async function getSeasonSchedule ({ id: seasonId }) {
  await sleep(1000)

  config.url = getURL(`seasons/${seasonId}/schedules`)

  return axios(config)
    .then(({ data }) => {
      return data.schedules
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
  getWCResult
}
