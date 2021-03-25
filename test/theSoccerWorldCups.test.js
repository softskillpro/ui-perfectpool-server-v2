const assert = require('chai').assert
const { scrapSoccerWorldCupsByYear } = require('../services/theSoccerWorldCups');

describe('The Soccer World Cups', () => {
    it.only('01 - should correctly scrap score results', async () => {
        const resultsScrapped = await scrapSoccerWorldCupsByYear(2014);
        assert.isNotEmpty(resultsScrapped);
    });
    it.skip('02 - should correctly convert scrapped results to winners string', async () => {
        // TODO winner string test
    });
    it.skip('03 - should correctly convert winners string to hex', async () => {
        // TODO hex result
    });
})
