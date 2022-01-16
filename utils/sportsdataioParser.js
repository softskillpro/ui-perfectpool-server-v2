const regions = ['East', 'West', 'South', 'Midwest']

/**
 * ### sortTournamentGames (games)
 *
 * Return the sorted match results
 *
 * @name sortTournamentGames
 * @param {Array} games game list of the tournament
 * @return {Array} sorted game list of the tournament
 */
function sortTournamentGames (games) {
  function compare (a, b) {
    let regionA = a.Bracket
    let regionB = b.Bracket
    for (let i = 0; i < regions.length; i++) {
      if (regionA === regions[i]) {
        regionA = i
      }
      if (regionB === regions[i]) {
        regionB = i
      }
    }

    if ((a.Round - b.Round) === 0) {
      return regionA - regionB
    }
  }

  const tournamentGames = games.reduce((acc, currVal) => {
    if ((currVal.Bracket != null && currVal.Round != null) || currVal.Round > 0) {
      acc.push(currVal)
    }
    return acc
  }, [])

  return tournamentGames.sort(compare)
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
  return (game.HomeTeamScore > game.AwayTeamScore) ? 1 : 0
}

/**
 * ### getTournamentResultsArray (games)
 *
 * Return the array of 1 or 0 from game list (length is 64)
 *
 * @name getTournamentResultsArray
 * @param {Array} games game list of the tournament
 * @return {Array} array of 1 or 0 (length is 64)
 */
function getTournamentResultsArray (games) {
  const resultsArray = []
  sortTournamentGames(games).forEach((game) => resultsArray.push(encodeGameResult(game)))
  resultsArray.push(1) // add 1 item to make array length 64 to hexlify

  return resultsArray
}

module.exports = {
  getTournamentResultsArray
}
