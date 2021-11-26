module.exports.getResultsHex = (resultsArray) => {
  // split resultsArray into two arrays before converting to hex
  const halfStr1 = resultsArray.slice(0, 31).join('')
  const halfStr2 = resultsArray.slice(32).join('')
  const hexArray1 = parseInt(halfStr1, 2).toString(16)
  const hexArray2 = parseInt(halfStr2, 2).toString(16)

  return hexArray1.concat(hexArray2)
}

module.exports.sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
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
