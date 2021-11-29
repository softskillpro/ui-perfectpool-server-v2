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

function encode (game) {
  return (game.home_points > game.away_points) ? 1 : 0
}

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

function getTournamentResultsArray (rounds) {
  const resultsArray = []

  sortTournamentGames(rounds).forEach((game) => resultsArray.push(encode(game)))
  resultsArray.push(1)

  return resultsArray
}

module.exports = {
  getTournamentResultsArray,
  sortTournamentGames
}
