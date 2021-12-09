function sort (games) {
  function compare (a, b) {
    return a.time.starting_at.timestamp - b.time.starting_at.timestamp
  }

  return games.sort(compare)
}

function getResultString (games) {
  return sort(games).reduce((resultString, game) => {
    return game.scores.localteam_score > game.scores.visitorteam_score
      ? resultString + '10' // Team1 won
      : game.scores.localteam_score < game.scores.visitorteam_score
        ? resultString + '01' // Team2 won
        : resultString + '11' // Draw
  },
  '')
}

module.exports = {
  getResultString
}
