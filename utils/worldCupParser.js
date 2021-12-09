const { swap } = require('./helper')

/**
 * ### swapFinalAnd3rdPlaces (scores)
 *
 * Swap final and 3rd places of scores array
 *
 * @name swapFinalAnd3rdPlaces
 * @param {Array} scores array of scores
 * @return {Array} array with swapped positions
 */
module.exports.swapFinalAnd3rdPlaces = (scores) => {
  const length = scores.length
  return swap(scores, length - 1, length - 2)
}

/**
 * ### getResultString (scores)
 *
 * Convert array of scores to string of winners
 * For each match:
 *     - 10 -> first team won
 *     - 01 -> second team won
 *     - 11 -> draw
 *
 * @name getResultString
 * @param {Array} scores array of scores
 * @return {String} winners string
 */
module.exports.getResultString = (scores) => {
  // Each match result are converted to a two digit binary number
  return scores
    .map(score => [parseInt(score[0]), parseInt(score[1])]) // Convert scores to integers
    .reduce((resultString, score) =>
      score[0] > score[1]
        ? resultString + '10' // Team1 won
        : score[0] < score[1]
          ? resultString + '01' // Team2 won
          : resultString + '11', // Draw
    '')
}
