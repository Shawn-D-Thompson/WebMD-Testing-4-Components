import webAssurance from '../pageobjects/webMD.assurance'
import navTools from '../pageobjects/webMD.tools.js'


describe('Positive/Negative Search Tests', () => {

    it('Positive Search Attempt', async () => {
        
      before(async () => {
        await browser.reloadSession();
        await navTools.main(); 
      });
        

        await navTools.searchSelectAndInput("Health");

        // Wait for search results to appear
        await webAssurance.searchTimeoutCheck()

    })
    it('Negative Search Attempt', async () => {

        await navTools.main()
        await navTools.searchSelectAndInput("aehoifhaewof");
        await webAssurance.checkSearchError() 

    });
});