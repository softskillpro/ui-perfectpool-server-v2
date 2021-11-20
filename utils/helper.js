module.exports.getResultsHex = (resultsArray) => {
  // split resultsArray into two arrays before converting to hex
  const halfStr1 = resultsArray.slice(0, 31).join('')
  const halfStr2 = resultsArray.slice(32).join('')
  const hexArray1 = parseInt(halfStr1, 2).toString(16)
  const hexArray2 = parseInt(halfStr2, 2).toString(16)

  return hexArray1.concat(hexArray2)
}
