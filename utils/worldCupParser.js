const { swap } = require('./swap')

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
 * ### scoresToWinnerString (scores)
 *
 * Convert array of scores to string of winners
 * For each match:
 *     - 10 -> first team won
 *     - 01 -> second team won
 *     - 11 -> draw
 *
 * @name scoresToWinnerString
 * @param {Array} scores array of scores
 * @return {String} winners string
 */
module.exports.scoresToWinnerString = (scores) => {
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

/**
 * ### winnersStringToHex (winnersString)
 *
 * Convert a string of winners into a hexadecimal string
 *
 * @name winnersStringToHex
 * @param {String} winnersString string of winners
 * @return {String} winners string in hex
 */
module.exports.winnersStringToHex = (winnersString) => {
  let winnersHex = ''
  for (let i = 0; i < winnersString.length; i += 4) {
    // Slice the winner string in 4 binary digits
    // Each 4 binary digit correspond to a hex digit, e.g 0101 -> 5 and 1111 -> F
    // 0 digits are added at the end if it does not have 4 digits length
    const stringSlice = winnersString.slice(i, i + 4).padEnd(4, '0')

    // Parse the binary string to decimal, then convert to hex
    winnersHex += parseInt(stringSlice, 2).toString(16)
  }

  winnersHex += '7' // Last digit means all phases were submitted
  winnersHex = `0x${winnersHex.padStart(64, '0')}` // To fit in a bytes32

  return winnersHex
}
