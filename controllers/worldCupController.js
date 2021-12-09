const { Requester } = require('@chainlink/external-adapter')

const { findFrequent } = require('../utils/helper')
// const { getWCResult: getWCResultWithTheSoccerWorldCups } = require('../services/theSoccerWorldCups')
const { getWCResult: getWCResultWithSportsRadar } = require('../services/sportsradar')
const { getWCResult: getWCResultWithAPIFootball } = require('../services/apifootball')
const { getWCResult: getWCResultWithSportMonks } = require('../services/sportmonks')

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
module.exports.worldCupRequest = async (req, res) => {
  let { jobRunID, year } = req.query
  jobRunID = jobRunID || 1
  year = year || 2018

  try {
    const hexResults = []
    // const hexResult1 = await getWCResultWithTheSoccerWorldCups(year)
    const hexResult2 = await getWCResultWithSportsRadar(year)
    const hexResult3 = await getWCResultWithAPIFootball(year)
    const hexResult4 = await getWCResultWithSportMonks(year)
    // hexResults.push(hexResult1)
    hexResults.push(hexResult2)
    hexResults.push(hexResult3)
    hexResults.push(hexResult4)
    // console.log('hexResults', hexResults)
    const result = findFrequent(hexResults)
    if (result.count > 1) {
      const responseResult = {
        data: {
          result: result.element
        },
        status: 200
      }
      res.status(200).json(Requester.success(jobRunID, responseResult))
    } else {
      console.log('hexResults', hexResults)
      res.status(500).json(Requester.errored(jobRunID, 'Invalid Results'))
    }
  } catch (error) {
    console.log('error', error)
    res.status(500).json(Requester.errored(jobRunID, error))
  }
}
