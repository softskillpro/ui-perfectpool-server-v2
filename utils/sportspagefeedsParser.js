const { sortTournamentGames } = require('./sportsradarParser')

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
  return (game.scoreboard.score.home > game.scoreboard.score.away) ? 1 : 0
}

/**
 * ### getTournamentResultsArray ({ rounds, results })
 *
 * Return the array of 1 or 0 from game list (length is 64)
 *
 * @name getTournamentResultsArray
 * @return {Array} array of 1 or 0 (length is 64)
 */
function getTournamentResultsArray ({ rounds, results }) {
  const resultsArray = []

  sortTournamentGames(rounds).forEach((game) => {
    const index = results.findIndex(result => (`${result.teams.away.team} ${result.teams.away.mascot}` === game.away.name) && (`${result.teams.home.team} ${result.teams.home.mascot}` === game.home.name))
    resultsArray.push(encodeGameResult(results[index]))
    results.splice(index, 1) // To reduce loop for next game
  })
  resultsArray.push(1) // To provide 64-length array to hexlify

  return resultsArray
}

module.exports = {
  getTournamentResultsArray
}
