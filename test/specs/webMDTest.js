import { expect } from '@wdio/globals'
import webAssurance from '../pageobjects/webMD.assurance'
import navTools from '../pageobjects/webMD.tools.js'

describe('WebMD Health A-Z Filter', () => {

    before(async () => {
        await navTools.openLetterFilter();
    }) 
   

    for (let letter of 'bcdefghijklmnopqrstuvwxyza') {
        it(`should only show results that start with the letter ${letter}`, async () => {
            
            await navTools.selectLetterFilter(letter);

            // Wait for the letter filter results to appear

            const results = await $$('ul.link-list li a');
            await browser.waitUntil(() => results.length > 0, {
                timeout: 3000,
                timeoutMsg: 'expected results to appear after 3s',
            });

            for (let item of results) {
                const text = await item.getText();
                if (text.length > 0) {
                    expect(text[0].toLowerCase()).toBe(letter);
                }
            }
        });
    }
});


describe('Positive/Negative Search Tests', () => {

    it('Positive Search Attempt', async () => {
        await navTools.open(); 

        await navTools.searchSelectAndInput("Health");

        // Wait for search results to appear
        await webAssurance.searchTimeoutCheck()
    })
    it('Negative Search Attempt', async () => {

        await navTools.open()
        await navTools.searchSelectAndInput("aehoifhaewof");
        const badResults = await $$('div.search-results-container');
            expect(badResults.length).toBe(0);

    });
});








//     it('Checking the "Policies" options', async () => {
//         const policiesLink = await $('=Policies');
//         const aboutLink = await $('=About');
//         const advertisersLink = await $('=For Advertisers');
    
//         await aboutLink.click();
    
//         await advertisersLink.click();
       
//         await policiesLink.click();
//     });
// })
