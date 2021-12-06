function sort (games) {
  function compare (a, b) {
    return a.fixture.timestamp - b.fixture.timestamp
  }

  return games.sort(compare)
}

function getResultString (games) {
  return sort(games).reduce((resultString, game) => {
    return game.goals.home > game.goals.away
      ? resultString + '10' // Team1 won
      : game.goals.home < game.goals.away
        ? resultString + '01' // Team2 won
        : resultString + '11' // Draw
  },
  '')
}

module.exports = {
  getResultString
}
