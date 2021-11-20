const regions = ['East', 'West', 'South', 'Midwest']

function sortAndEncode (games) {
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

  const resultsArray = []
  const sortedGames = games.sort(compare)
  sortedGames.forEach((data) => {
    if (data.HomeTeamScore > data.AwayTeamScore) {
      resultsArray.push(1)
    } else {
      resultsArray.push(0)
    }
  })
  resultsArray.push(1)
  return resultsArray
}

module.exports.getTournamentResultsArray = (rounds) => {
  const tournamentRounds = rounds.reduce((acc, currVal) => {
    if ((currVal.Bracket != null && currVal.Round != null) || currVal.Round === 6) {
      acc.push(currVal)
    }
    return acc
  }, [])

  return sortAndEncode(tournamentRounds)
}
