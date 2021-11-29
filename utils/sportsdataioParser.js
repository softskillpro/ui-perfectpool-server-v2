const regions = ['East', 'West', 'South', 'Midwest']

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

function encode (game) {
  return (game.HomeTeamScore > game.AwayTeamScore) ? 1 : 0
}

function getTournamentResultsArray (games) {
  const resultsArray = []
  sortTournamentGames(games).forEach((game) => resultsArray.push(encode(game)))
  resultsArray.push(1)

  return resultsArray
}

module.exports = {
  getTournamentResultsArray
}
