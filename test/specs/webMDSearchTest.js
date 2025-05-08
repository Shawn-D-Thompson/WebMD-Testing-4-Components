import searchTools from '../pageobjects/searchTools.js'

describe('Positive/Negative Search Tests', () => {

    it('Positive Search Attempt', async () => {
        
        await searchTools.main()
        await searchTools.searchSelectAndInput("Health");
        await searchTools.searchTimeoutCheck()

    })
    it('Negative Search Attempt', async () => {

        await searchTools.main()
        await searchTools.searchSelectAndInput("aehoifhaewof");
        await searchTools.checkSearchError() 

    });
});