const { sortTournamentGames } = require('./sportsradarParser')

function encode (game) {
  return (game.scoreboard.score.home > game.scoreboard.score.away) ? 1 : 0
}

function getTournamentResultsArray ({ rounds, results }) {
  const resultsArray = []

  sortTournamentGames(rounds).forEach((game) => {
    const index = results.findIndex(result => (`${result.teams.away.team} ${result.teams.away.mascot}` === game.away.name) && (`${result.teams.home.team} ${result.teams.home.mascot}` === game.home.name))
    resultsArray.push(encode(results[index]))
    results.splice(index, 1) // To reduce loop for next game
  })
  resultsArray.push(1)

  return resultsArray
}

module.exports = {
  getTournamentResultsArray
}
