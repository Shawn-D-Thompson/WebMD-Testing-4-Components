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
        //await webAssurance.searchTimeoutCheck()

    })
    it('Negative Search Attempt', async () => {

        await navTools.open()
        await navTools.searchSelectAndInput("aehoifhaewof");
        await webAssurance.checkSearchError() 

    });
});

describe('Checking that the "Policies" links function properly', () => {

    before(async () => {
        await navTools.open()
    });

    // Defining policies to test
    const policiesToTest = [
        'Privacy Policy',
        'Cookie Policy',
        'Editorial Policy',
        'Advertising Policy',
        'Correction Policy',
        'Terms of Use',
        'Your Privacy Choices',
    ];

    // Looping Checks/Assertions for Policy Links
    policiesToTest.forEach((policy) => {
        it(`should navigate to ${policy} page`, async () => {
            // Select the policy link (assumes navTools is defined)
            await navTools.policySelection(policy);

            // Optional: Validate navigation (e.g., check URL or page content)
            const currentUrl = await browser.getUrl();
            console.log(`Navigated to: ${currentUrl}`); // Debug log

            await navTools.open();
        });
    });

});


