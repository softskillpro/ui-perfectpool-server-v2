const { Requester } = require('@chainlink/external-adapter')

const { swapFinalAnd3rdPlaces, scoresToWinnerString, winnersStringToHex } = require('../utils/worldCupParser');
const { scrapSoccerWorldCupsByYear } = require('../services/theSoccerWorldCups');

module.exports.worldCupRequest = (req, res) => {
    // TODO Validate inputs
    const { jobRunID, year } = req.body;

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
            };
            res.status(200).json(Requester.success(jobRunID, responseResult));
        })
        .catch(error => {
            res.status(500).json(Requester.errored(jobRunID, error));
        })
}