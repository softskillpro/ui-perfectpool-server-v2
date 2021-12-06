const assert = require('chai').assert

const constants = require('./helpers/constants')

const { swap } = require('../utils/swap')
const { swapFinalAnd3rdPlaces, getResultString, resultStringToHex } = require('../utils/worldCupParser')

describe('swap', () => {
  it('should swap array positions', () => {
    const arrBefore = [[1, 0], [2, 5], [8, 9], [0, 0], [1, 1], [5, 7]]
    const arrAfter = [[1, 0], [1, 1], [8, 9], [0, 0], [2, 5], [5, 7]]

    const swappedArr = swap(arrBefore, 1, 4)

    assert.deepEqual(swappedArr, arrAfter)
  })
})

describe('worldCupParser', () => {
  describe('swapFinalAnd3rdPlaces', () => {
    it('should swap final and 3rd places', () => {
      const arrBefore = [[1, 0], [2, 5], [8, 9], [0, 0], [1, 1], [5, 7]]
      const arrAfter = [[1, 0], [2, 5], [8, 9], [0, 0], [5, 7], [1, 1]]

      const swappedArr = swapFinalAnd3rdPlaces(arrBefore)

      assert.deepEqual(swappedArr, arrAfter)
    })
  })

  describe('getResultString', () => {
    it('01 - should convert scores array of strings to winners string', () => {
      const convertedWinnersString = getResultString(constants.scoresArrayString)
      assert.equal(convertedWinnersString, constants.winnersStringMultipleOf4)
    })
    it('02 - should convert scores array of integers to winners string', () => {
      const convertedWinnersString = getResultString(constants.scoresArrayInt)
      assert.equal(convertedWinnersString, constants.winnersStringMultipleOf4)
    })
  })

  describe('resultStringToHex', () => {
    it('01 - should convert winners string not multiple of 4 to hex', () => {
      const convertedWinnersHex = resultStringToHex(constants.winnersStringNotMultipleOf4)
      assert.equal(convertedWinnersHex, constants.winnersHexNotMultipleOf4)
    })
    it('02 - should convert winners string multiple of 4 to hex', () => {
      const convertedWinnersHex = resultStringToHex(constants.winnersStringMultipleOf4)
      assert.equal(convertedWinnersHex, constants.winnersHexMultipleOf4)
    })
  })
})
