const axios = require('axios')
const cheerio = require('cheerio')

const { ServiceError } = require('../errors/ServiceError')
const { swapFinalAnd3rdPlaces, getResultString } = require('../utils/worldCupParser')
const { resultStringToHex } = require('../utils/helper')

const baseURL = 'http://www.thesoccerworldcups.com'

const config = {
  method: 'get',
  url: ''
}

async function getWCResult (season) {
  return scrapSoccerWorldCupsByYear(season)
    .then(swapFinalAnd3rdPlaces)
    .then(getResultString)
    .then(resultStringToHex)
    .catch(throwApplicationError)
}

/**
 * ### scrapSoccerWorldCupsByYear (year)
 *
 * Scrape the match results of the world cup contest from The Soccer World Cups website
 *
 * @name scrapSoccerWorldCupsByYear
 * @param {Integer} year to be scrapped
 * @return {Promise} promise returning the match results array or error
 */
async function scrapSoccerWorldCupsByYear (year) {
  const resultsUrl = await getResultsLink(year)

  config.url = `${baseURL}/${resultsUrl}`

  return axios(config)
    .then(getWorldCupResults)
    .catch(throwApplicationError)
}

/**
 * ### getResultsLink (year)
 *
 * Scrape the correct link to the results page by year
 *
 * @name getResultsLink
 * @param {Integer} year to be scrapped
 * @return {Promise} promise returning the link result or error
 */
async function getResultsLink (year) {
  config.url = `${baseURL}/world_cups.php`

  return axios(config)
    .then(({ data }) => {
      const $ = cheerio.load(data)

      // Find the right table row looking for the year
      const rowByYear =
                $('main table tr td')
                  .toArray()
                  .filter(td =>
                    $(td).text().match(`\\s*${year}[\\s\\w]*`)
                  )
      // Get the results anchor
      const anchorByText =
                $(rowByYear)
                  .parent()
                  .find('td div a')
                  .toArray()
                  .filter(a =>
                    $(a).text().match(/\s*Results\s*/)
                  )
      // Get the results link
      return $(anchorByText).attr('href')
    })
    .catch(throwApplicationError)
}

/**
 * ### getWorldCupResults ({ data })
 *
 * Scrape the result of each match from results page
 *
 * @name getWorldCupResults
 * @param {Object} data param from the response of a request
 * @return {Array} array having the results
 */
function getWorldCupResults ({ data }) {
  const $ = cheerio.load(data)
  const scores = []
  const regexScore = /(\d+)\s*-\s*(\d+)/
  const regexPk = /(\d+)\s*-\s*(\d+)[\s\\n]*on penalties/

  // Get all the rounds
  const rounds = $('main div.margen-t3.clearfix')

  // Iterate over each round to get the score
  rounds.each((index, round) => {
    // There may be the score, extra time and pk
    const roundInfo = $(round).find('div.left.a-center.margen-b3.clearfix')
    let roundScore

    if (roundInfo.length === 1) { // No extra time or pk
      roundScore = regexScore.exec($(roundInfo).find('a').text()).slice(1, 3)
    } else {
      // Check if there is pk
      roundScore = regexPk.exec($(roundInfo[roundInfo.length - 1]).text())
      if (roundScore) {
        roundScore = roundScore.slice(1, 3)
      } else {
        // If there is no pk, get the first info
        roundScore = regexScore.exec($(roundInfo[0]).find('a').text()).slice(1, 3)
      }
    }
    scores.push(roundScore)
  })
  return scores
}

// TODO use this?
function throwApplicationError (error) {
  throw new ServiceError({
    message: error.message,
    service: 'SoccerWorldCups'
  })
}

module.exports = {
  getWCResult
}
