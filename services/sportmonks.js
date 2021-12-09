const axios = require('axios')
const { getResultString } = require('../utils/sportmonksParser')
const { resultStringToHex } = require('../utils/helper')

const { ServiceError } = require('../errors/ServiceError')

const API_KEY = 'z8slf6ekQvrxRZqrqZIBhHz9IsrEQxcr6z4EvtNgBvvXEqSz8uCOpR5TosNf'

const config = {
  method: 'get',
  url: ''
}

function getURL (apiString) {
  return `https://soccer.sportmonks.com/api/v2.0/${apiString}&api_token=${API_KEY}`
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
    .then(getSeasonFixture)
    .then(getResultString)
    .then(resultStringToHex)
    .catch(throwApplicationError)
}

async function getLeague () {
  // 721 is world cup league id
  config.url = getURL('leagues/732?include=seasons')

  return axios(config)
    .then(({ data }) => {
      return data.data
    })
    .catch(throwApplicationError)
}

async function getSeason (year) {
  return getLeague()
    .then((league) => {
      return league.seasons.data.find(season => season.name === year.toString())
    })
    .catch(throwApplicationError)
}

async function getSeasonFixture ({ id: seasonId }) {
  config.url = getURL(`seasons/${seasonId}?include=fixtures`)

  return axios(config)
    .then(({ data }) => {
      return data.data.fixtures.data
    })
    .catch(throwApplicationError)
}

function throwApplicationError (error) {
  throw new ServiceError({
    message: error.message,
    service: 'SportMonks'
  })
}

module.exports = {
  getWCResult
}
