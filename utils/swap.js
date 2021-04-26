/**
 * ### swap (array, pos1, pos2)
 *
 * Swap any two positions of an array of any type
 *
 * @name swap
 * @param {Array} array of any type
 * @param {Integer} pos1 first position to be swapped
 * @param {Integer} pos2 second position to be swapped
 * @return {Array} array with swapped positions
 */
module.exports.swap = (array, pos1, pos2) => {
  [array[pos1], array[pos2]] = [array[pos2], array[pos1]]
  return array
}
