const { swap } = require('./swap');

module.exports.swapFinalAnd3rdPlaces = (scores) => {
    const length = scores.length;
    return swap(scores, length - 1, length - 2);
}

module.exports.scoresToWinnerString = (scores) => {
    // Each match result are converted to a two digit binary number
    return scores
        .map(score => [parseInt(score[0]), parseInt(score[1])]) // Convert scores to integers
        .reduce((resultString, score) =>
            score[0] > score[1] ?
                resultString + '10' : // Team1 won
                score[0] < score[1] ?
                    resultString + '01' : // Team2 won
                    resultString + '11', // Draw
            '');
}

module.exports.winnersStringToHex = (winnersString) => {
    let winnersHex = '';
    for (let i = 0; i < winnersString.length; i += 4) {
        // Slice the winner string in 4 binary digits
        // Each 4 binary digit correspond to a hex digit, e.g 0101 -> 5 and 1111 -> F
        // 0 digits are added at the end if it does not have 4 digits length
        let stringSlice = winnersString.slice(i, i + 4).padEnd(4, '0');

        // Parse the binary string to decimal, then convert to hex
        winnersHex += parseInt(stringSlice, 2).toString(16);
    }
    return winnersHex;
}