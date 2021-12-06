function sort (games) {
  function compare (a, b) {
    return Date.parse(a) - Date.parse(b)
  }

  return games.sort(compare)
}

function getResultString (games) {
  return sort(games).reduce((resultString, game) => {
    return game.sport_event_status.home_score > game.sport_event_status.away_score
      ? resultString + '10' // Team1 won
      : game.sport_event_status.home_score < game.sport_event_status.away_score
        ? resultString + '01' // Team2 won
        : resultString + '11' // Draw
  },
  '')
}

module.exports = {
  getResultString
}
