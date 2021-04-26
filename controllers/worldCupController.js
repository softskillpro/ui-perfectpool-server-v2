const { Requester } = require('@chainlink/external-adapter')

const { swapFinalAnd3rdPlaces, scoresToWinnerString, winnersStringToHex } = require('../utils/worldCupParser')
const { scrapSoccerWorldCupsByYear } = require('../services/theSoccerWorldCups')

/**
 * ### worldCupRequest (req, res)
 *
 * Request world cup scrapping data and convert results to hexadecimal
 *
 * @name worldCupRequest
 * @param {Object} req route request
 * @param {Object} res route response
 * @return {Object} json in Chainlink Requester format with jobRunID, status and match results in hex
 */
module.exports.worldCupRequest = (req, res) => {
  let { jobRunID, year } = req.query
  jobRunID = jobRunID || 1
  year = year || 2018

  scrapSoccerWorldCupsByYear(year)
    .then(swapFinalAnd3rdPlaces)
    .then(scoresToWinnerString)
    .then(winnersStringToHex)
    .then(hexResult => {
      const responseResult = {
        data: {
          result: hexResult
        },
        status: 200
      }
      res.status(200).json(Requester.success(jobRunID, responseResult))
    })
    .catch(error => {
      res.status(500).json(Requester.errored(jobRunID, error))
    })
}
