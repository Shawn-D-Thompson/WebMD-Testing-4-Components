import { $ } from '@wdio/globals'
import Pages from './webMD.page.js';

class navTools extends Pages {
    


//Site Navigational Selectors for Testing
    
    //selectors for the "Health A-Z" filter
    letterSelect (letter) {
        return $(`a[data-metrics-link="${letter}"]`);
    }
    
    //selectors for the "Search Bar" testing
    get searchSelect () {
        return $('.vn-mt.vn-menu-btn.vn-search');
    }
    get searchBarSelect () {
        return $('.webmd-input__inner');
    }
    get searchSubmit () {
        return $('button[type="submit"]');
    }
    
    //selectors for checking the “Policies” links
    policiesLinks (policy) {
        return $(`=${policy}`)
    }
        /*
        Polocies include "Policies", "About", "For Advertisers", "Privacy Policy"
                         "Cookie Policy", "Your Privacy Choices", "Editorial Policy",
                         "Advertising Policy", "Correction Policy", "Terms of Use"
        */
    
    //selectors for the Pill Identifier Test
    get colorSelect () {
        return $('.color-section');
    }
    get shapeSelect () {
        return $('.shape-section');
    }
    get textSelect () {
        return $('.imprint-search');
    }
    get textSide1Select() {
        return $('input[name="imprintSideOne"]');
    }
    get textSide2Select () {
        return $('input[name="imprintSideTwo"]');
    }
    get pillSubmit () {
        return $("//button[contains(normalize-space(), 'Result')]");
    }


//Functions to allow for Testing

    //Functions for the "Health A-Z" filter
    async openLetterFilter() {
        return super.main('a-to-z-guides/health-topics');
    }
    async selectLetterFilter (letter) {
         await this.letterSelect(letter).click();
    }
    async checkResultsStartWith(letter) {
        const results = await $$('ul.link-list li a');
        await browser.waitUntil(() => results.length > 0, {
            timeout: 3000,
            timeoutMsg: 'Expected results to appear after 3s',
        });

        for (let item of results) {
            const text = await item.getText();
            if (text.length > 0 && text[0].toLowerCase() !== letter) {
                return false;
        }};

        return true;

    }


    //Functions for the "Search Bar" tests
    async searchSelectAndInput (text) {
        await this.searchSelect.click()
        await this.searchBarSelect.setValue(text);
        await this.searchSubmit.click()
    }

    //Functions for the "Policies" tests
    async policySelection(policy) {
        await this.policiesLinks(policy).click();
    }

    //Functions for the "Pill Identifier" tests

        async openPillIdentifier() {
            return super.main('pill-identification/default.htm');
        }
        async selectColorMenu () {
            await this.colorSelect.click()
        }
        async selectShapeMenu () {
            await this.shapeSelect.click()
        }
        async selectSubmit () {
            const button = $("//button[contains(., 'Result')]");
            await button.waitForDisplayed({ timeout: 5000 });
            await button.waitForClickable({ timeout: 5000 });
            await button.click();
        }
        
        async checkResults() {
            const resultHeader = $('div.search-results-header');
            
            await resultHeader.waitForExist({ timeout: 5000 });
        
            const text = await resultHeader.getText();
            
            return text.trim().length > 0;
        }

        // In navTools.js
        async waitForSearchResults() {
            await browser.waitUntil(async () => {
                const results = await $('div.search-results-container');
                return await results.isDisplayed();
            }, {timeout: 10000});
}



        async enterPillText(text1, text2 = '') {
            // SIDE 1 INPUT
            await this.textSelect.waitForDisplayed({ timeout: 5000 });
            await this.textSelect.waitForClickable({ timeout: 5000 });
            await this.textSelect.click();
            await this.textSide1Select.setValue(text1);
        
            // Wait for first dropdown to become visable
            const side1Dropdown = await $('#webmd-typeahead');
            await side1Dropdown.waitForDisplayed({ timeout: 5000 });
        
            const side1Suggestions = await side1Dropdown.$$('li');
            if (side1Suggestions.length > 0) {
                await side1Suggestions[0].waitForClickable();
                await side1Suggestions[0].click();
            }
        
            // SIDE 2 INPUT
            if (text2 !== '') {
                await this.textSide2Select.waitForDisplayed();
                await this.textSide2Select.waitForClickable();
                await this.textSide2Select.click();
                await this.textSide2Select.setValue(text2);
        
                // Wait for second dropdown to become visible
                const dropdowns = await $$('ul#webmd-typeahead');
                const side2Dropdown = dropdowns.length > 1 ? dropdowns[1] : dropdowns[0]; // fallback just in case
        
                await side2Dropdown.waitForDisplayed({ timeout: 5000 });
        
                const side2Suggestions = await side2Dropdown.$$('li');
                if (side2Suggestions.length > 0) {
                    await side2Suggestions[0].waitForClickable({ timeout: 5000 });
                    await side2Suggestions[0].click();
                }
            }
        }
        
        
        

        async selectDropdownOption(Text) {
            const option = $(`//li[contains(., "${Text}")]`);
            await option.waitForDisplayed({ timeout: 5000 });
            await option.waitForClickable({ timeout: 5000 });
            await browser.waitUntil(async () => await option.isDisplayed(), { timeout: 5000 });
            await option.click();
        }
          
          
        
    
}


export default new navTools();