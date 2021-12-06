/**
 * ### resultStringToHex (winnersString)
 *
 * Convert a string of winners into a hexadecimal string
 *
 * @name resultStringToHex
 * @param {String} winnersString string of winners
 * @return {String} winners string in hex
 */
module.exports.resultStringToHex = (winnersString) => {
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

module.exports.findFrequent = (arr) => {
  const countMap = {}
  let freqElement
  let maxCount = 1
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i]
    if (countMap[el] == null) { countMap[el] = 1 } else { countMap[el]++ }
    if (countMap[el] > maxCount) {
      freqElement = el
      maxCount = countMap[el]
    }
  }
  return { element: freqElement, count: maxCount }
}

module.exports.sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
