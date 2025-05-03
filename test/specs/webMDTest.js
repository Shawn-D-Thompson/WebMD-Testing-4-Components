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

describe('Checking that the "Policies" links function properly', () => {

    before(async () => {
        await navTools.main()
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
    for (const policy of policiesToTest) {
      it(`should navigate to ${policy} page`, async () => {
          
          await navTools.policySelection(policy);
  
          const currentUrl = await browser.getUrl();
          console.log(`Navigated to: ${currentUrl}`);
  
          await navTools.main();
      });
  }
  

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

      before(async () => {
        await browser.reloadSession(); 
      });
  
      await navTools.openPillIdentifier();
  
      for (let shape of shapeOptions) {
        await navTools.selectShape(); // Reopen dropdown each time
  
        await browser.waitUntil(async () => {
          const dropDown = await $$('div.webmd-scrollbar');
          return dropDown.length > 0;
        })
  
        const options = await $(`//li[contains(., "${shape}")]`);
        await options.waitForClickable({ timeout: 5000 });
        await options.click();
  
        console.log(`Selected shape: ${shape}`);

        await navTools.selectSubmit()

        await browser.waitUntil(async () => {
            const searchResults = await $('div.search-results')
            return await searchResults.isExisting();
         });
          const allValid = await navTools.checkResults(shape);
          if (!allValid) {
            throw new Error(`"${shape}" did not yield valid results`);
          }
        }
    })
    


    it('should display results for each Color option', async () => {
        const colorOptions = [
          'White',
          'Off-White',
          'Clear',
          'Gray',
          'Black',
          'Tan',
          'Brown',
          'Red',
          'Multi-Color',
          'Orange',
          'Peach',
          'Yellow',
          'Gold',
          'Green',
          'Turquoise',
          'Blue',
          'Purple',
          'Pink'
        ];
    
        await navTools.openPillIdentifier();
    
        for (let color of colorOptions) {
          await navTools.selectColor(); // Reopen dropdown each time
    
          await browser.waitUntil(async () => {
            const dropDown = await $$('div.webmd-scrollbar');
            return dropDown.length > 0;
          })
    
          const options = await $(`//li[contains(., "${color}")]`);
          await options.waitForClickable({ timeout: 5000 });
          await options.click();
    
          console.log(`Selected Color: ${color}`);

          await navTools.selectSubmit();
          
          await browser.waitUntil(async () => {
            const searchResults = await $('div.search-results')
            return await searchResults.isExisting();
         });
          const allValid = await navTools.checkResults();
          if (!allValid) {
            throw new Error(`"${color}" did not yield valid results`);
          }
        }
    })
})
