const regions = ['East Regional', 'West Regional', 'South Regional', 'Midwest Regional']

function sortAndEncode (games) {
  function compare (a, b) {
    a = a.title.toString()
    a = a.charAt(a.length - 1)

    b = b.title.toString()
    b = b.charAt(b.length - 1)
    return a - b
  }

  const subResults = []
  const sortedGames = games.sort(compare)
  sortedGames.forEach((data) => {
    if (data.home_points > data.away_points) {
      subResults.push(1)
    } else {
      subResults.push(0)
    }
  })
  return subResults
}

module.exports.getTournamentResultsArray = (rounds) => {
  const resultsArray = []
  const tournamentRounds = rounds.reduce((acc, currVal) => {
    if (currVal.name !== 'First Four') {
      acc.push(currVal)
    }
    return acc
  }, [])

  tournamentRounds.forEach(async (round) => {
    if (round.bracketed.length !== 0) {
      const bracketed = round.bracketed
      const reducedObj = bracketed.reduce((acc, currVal) => {
        acc[currVal.bracket.name] = currVal
        return acc
      }, {})

      for (const reg of regions) {
        if (reducedObj[reg]) resultsArray.push(...sortAndEncode(reducedObj[reg].games))
      }
    }
    if (round.name === 'Final Four') {
      resultsArray.push(...sortAndEncode(round.games))
    }
    if (round.name === 'National Championship') {
      resultsArray.push(round.games[0].home_points > round.games[0].away_points ? 1 : 0)
    }
  })
  resultsArray.push(1)

  return resultsArray
}
