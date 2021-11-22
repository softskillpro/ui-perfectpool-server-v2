const { Requester } = require('@chainlink/external-adapter')

const { getTournamentResult: getTournamentResultWithSportsRadar } = require('../services/sportsradar')
const { getTournamentResult: getTournamentResultWithSportsDataIo } = require('../services/sportsdataio')

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
    const hexResult1 = await getTournamentResultWithSportsRadar(season)
    const hexResult2 = await getTournamentResultWithSportsDataIo(season)
    // console.log('hexResult1', hexResult1)
    // console.log('hexResult2', hexResult2)
    const responseResult = {
      data: {
        result: hexResult1
      },
      status: 200
    }
    res.status(200).json(Requester.success(jobRunID, responseResult))
  } catch (error) {
    console.log('error', error)
    res.status(500).json(Requester.errored(jobRunID, error))
  }
}
