import webAssurance from '../pageobjects/webMD.assurance'
import navTools from '../pageobjects/webMD.tools.js'


describe('Testing the "Pill Identifier" filter options', () => {

    //Shape Filter
    it('should display results for each shape', async () => {
        const shapeOptions = [
            '3 Sided',
            '5 Sided',
            '6 Sided',
            //'7 Sided',
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
            const dropDown = await $$('div.webmd-scrollbar');
            return dropDown.length > 0;
        })
  
        const option = await $(`//li[contains(., "${shape}")]`);
        await option.waitForDisplayed({ timeout: 5000 });
        await option.waitForClickable({ timeout: 5000 });
        await option.click();
  
        await browser.waitUntil(async () => await option.isDisplayed(), { timeout: 3000 });

        await option.click();


        console.log(`Selected shape: ${shape}`);
        await navTools.selectSubmit()

        await browser.waitUntil(async () => {
            const searchResults = await $('div.search-results-container')
            return await searchResults.isExisting();
         });

            const allValid = await navTools.checkResults(shape);
            if (!allValid) {
                throw new Error(`"${shape}" did not yield valid results`);
            }}
    })

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
            await navTools.selectColor(); // Reopen dropdown each time
    
            await browser.waitUntil(async () => {
                const dropDown = await $$('div.webmd-scrollbar');
                return dropDown.length > 0;
            })
    
            const option = await $(`//li[contains(., "${color}")]`);
            await option.waitForDisplayed({ timeout: 5000 });
            await option.waitForClickable({ timeout: 5000 });
            await option.click();

    
            console.log(`Selected Color: ${color}`);

            await navTools.selectSubmit();
          
            await browser.waitUntil(async () => {
                const searchResults = await $('div.search-results-container')
                return await searchResults.isExisting();
            });
            const allValid = await navTools.checkResults();
            if (!allValid) {
                throw new Error(`"${color}" did not yield valid results`);
            }
        }
    })


    //Text Filter
    // it(`Should display results for APO`, async () => {

    //     await navTools.openPillIdentifier()
    //     await navTools.enterPillText('APO')
    //     await navTools.selectSubmit();

    //     await browser.waitUntil(async () => {
    //         const results = await $('div.search-results-container');
    //         return await results.isDisplayed();
    //     })

    // })
})