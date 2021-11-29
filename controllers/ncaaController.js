const { Requester } = require('@chainlink/external-adapter')

const { findFrequent } = require('../utils/helper')
const { getTournamentResult: getTournamentResultWithSportsRadar } = require('../services/sportsradar')
const { getTournamentResult: getTournamentResultWithSportsDataIo } = require('../services/sportsdataio')
const { getTournamentResult: getTournamentResultWithSportsPageFeeds } = require('../services/sportspagefeeds')

/**
 * ### ncaaRequest (req, res)
 *
 * Request world cup scrapping data and convert results to hexadecimal
 *
 * @name ncaaRequest
 * @param {Object} req route request
 * @param {Object} res route response
 * @return {Object} json in Chainlink Requester format with jobRunID, status and match results in hex
 */
module.exports.ncaaRequest = async (req, res) => {
  let { jobRunID, season } = req.query
  jobRunID = jobRunID || 1
  season = season || '2021'

  try {
    const hexResults = []
    const hexResult1 = await getTournamentResultWithSportsRadar(season)
    const hexResult2 = await getTournamentResultWithSportsDataIo(season)
    const hexResult3 = await getTournamentResultWithSportsPageFeeds(season)
    hexResults.push(hexResult1)
    hexResults.push(hexResult2)
    hexResults.push(hexResult3)
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
