import webAssurance from '../pageobjects/webMD.assurance'
import navTools from '../pageobjects/webMD.tools.js'


describe('Testing the "Pill Identifier" filter options', () => {

    //Shape Filter
    it('should display results for each shape', async () => {
        const shapeOptions = [
            '3 Sided',
            '5 Sided',
            '6 Sided',
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
        try {
          // Reset UI state
            await browser.keys('Escape');
      
          // Re-open dropdown and select option
            await navTools.selectShapeMenu();
            await navTools.selectDropdownOption(shape);
      
            await navTools.selectSubmit();
      
          // Confirm results are displayed
            await navTools.waitForSearchResults()
      
        } catch (err) {
          console.error(`Error testing ${shape}:`, err);
          throw err;
        }
    }})
      
  
    //for (let shape of shapeOptions) {

    //     await navTools.selectShape(); // Reopen dropdown each time

    //     await navTools.selectDropdownOption(shape)

    //     await navTools.selectSubmit()

    //     await browser.waitUntil(async () => {
    //         const searchResults = await $('div.search-results-container')
    //         return await searchResults.isExisting();
    //      });

    //     const allValid = await navTools.checkResults(shape);
    //     if (!allValid) {
    //         throw new Error(`"${shape}" did not yield valid results`);
    //     }}
    // })

    //Color Filter
    it('should display results for each color', async () => {

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

            await navTools.selectColorMenu(); // Reopen dropdown each time

            await navTools.selectDropdownOption(color)

            console.log(`Selected Color: ${color}`);

            await navTools.selectSubmit();

            await navTools.waitForSearchResults()
            // await browser.waitUntil(async () => {
            //     const searchResults = await $('div.search-results-container')
            //     return await searchResults.isDisplayed({timeout: 10000});
            // });
        }
    })


    //Text Filter
    it(`Should display results for APO BU75`, async () => {

        await navTools.openPillIdentifier()
        await navTools.enterPillText('APO')
        await navTools.selectSubmit();

        await browser.waitUntil(async () => {
            const searchResults = await $('div.search-results-container')
            return await searchResults.isDisplayed({timeout: 10000});
         });

        const allValid = await navTools.checkResults();
        if (!allValid) {
            throw new Error(`"APO" did not yield valid results`);
        }

        await navTools.openPillIdentifier()
        await navTools.enterPillText('APO', 'BU75')
        await navTools.selectSubmit();

        await browser.waitUntil(async () => {
            const searchResults = await $('div.search-results-container')
            return await searchResults.isDisplayed();
        })

    })
})