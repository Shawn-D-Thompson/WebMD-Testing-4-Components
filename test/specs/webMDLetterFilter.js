import webAssurance from '../pageobjects/webMD.assurance'
import navTools from '../pageobjects/webMD.tools.js'


describe('WebMD Health A-Z Filter', () => {

    before(async () => {
        await navTools.openLetterFilter();
    }) 
   
        for (let letter of 'bcdefghijklmnopqrstuvwxyza') {
            it(`should only show results that start with the letter ${letter}`, async () => {
                await navTools.selectLetterFilter(letter);
    
                const allValid = await navTools.checkResultsStartWith(letter);
                if (!allValid) {
                    throw new Error(`Results did not start with the letter "${letter}"`);
                }
        });
    }
});