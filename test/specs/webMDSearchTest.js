import webAssurance from '../pageobjects/webMD.assurance'
import navTools from '../pageobjects/webMD.tools.js'


describe('Positive/Negative Search Tests', () => {

    it('Positive Search Attempt', async () => {
        
        await navTools.main()
        await navTools.searchSelectAndInput("Health");
        await webAssurance.searchTimeoutCheck()

    })
    it('Negative Search Attempt', async () => {

        await navTools.main()
        await navTools.searchSelectAndInput("aehoifhaewof");
        await webAssurance.checkSearchError() 

    });
});