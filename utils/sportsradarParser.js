const regions = ['East Regional', 'West Regional', 'South Regional', 'Midwest Regional']

function sort (games) {
  function compare (a, b) {
    a = a.title.toString()
    a = a.charAt(a.length - 1)

    b = b.title.toString()
    b = b.charAt(b.length - 1)
    return a - b
  }

  return games.sort(compare)
}

/**
 * ### encodeGameResult (game)
 *
 * Return 0 or 1 for the match result
 *
 * @name getTournamentScores
 * @param {Object} game game object
 * @return {Integer} 1 or 0
 */
function encodeGameResult (game) {
  return (game.home_points > game.away_points) ? 1 : 0
}

/**
 * ### sortTournamentGames (rounds)
 *
 * Return the sorted match results
 *
 * @name sortTournamentGames
 * @param {Array} rounds round list of the tournament
 * @return {Array} sorted game list of the tournament
 */
function sortTournamentGames (rounds) {
  const games = []
  rounds.forEach((round) => {
    if ((round.name !== 'First Four') && (round.bracketed.length !== 0)) {
      const bracketed = round.bracketed
      const reducedObj = bracketed.reduce((acc, currVal) => {
        acc[currVal.bracket.name] = currVal
        return acc
      }, {})

      for (const reg of regions) {
        if (reducedObj[reg]) games.push(...sort(reducedObj[reg].games))
      }
    } else if (round.name === 'Final Four') {
      games.push(...sort(round.games))
    } else if (round.name === 'National Championship') {
      games.push(round.games[0])
    }
  })

  return games
}

/**
 * ### getTournamentResultsArray (rounds)
 *
 * Return the array of 1 or 0 from all game (of the rounds) list (length is 64)
 *
 * @name getTournamentResultsArray
 * @param {Array} rounds round list of the tournament
 * @return {Array} array of 1 or 0 (length is 64)
 */
function getTournamentResultsArray (rounds) {
  const resultsArray = []

  sortTournamentGames(rounds).forEach((game) => resultsArray.push(encodeGameResult(game)))
  resultsArray.push(1) // To provide 64-length array to hexlify

  return resultsArray
}

module.exports = {
  getTournamentResultsArray,
  sortTournamentGames
}
