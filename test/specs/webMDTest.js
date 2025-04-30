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
    
                const allValid = await navTools.checkResultsStartWith(letter);
                if (!allValid) {
                    throw new Error(`Results did not start with the letter "${letter}"`);
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
            
            await navTools.policySelection(policy);

            const currentUrl = await browser.getUrl();
            console.log(`Navigated to: ${currentUrl}`);

            await navTools.open();
        });
    });

});


describe('Testing the "Pill Identifier" filter options', () => {
    it('should display results for each shape option', async () => {
      const shapeOptions = [
        '3 Sided',
        '5 Sided',
        '6 Sided',
        '7 Sided',
        '8 Sided',
        'Oval',
        'Round',
        'Oblong',
        'Square',
        'Rectangle',
        'Diamond',
        'Other'
      ];
  
      await navTools.openPillIdentifier();
  
      for (let shape of shapeOptions) {
        await navTools.selectShape(); // Reopen dropdown each time
  
        await browser.waitUntil(async () => {
          const options = await $$('div.webmd-scrollbar');
          return options.length > 0;
        })
  
        const option = await $(`//li[contains(., "${shape}")]`);
        await option.waitForClickable({ timeout: 3000 });
        await option.click();
  
        console.log(`Selected shape: ${shape}`);
        await browser.pause(1000); // Optional for visual checking
       }
    })

})
