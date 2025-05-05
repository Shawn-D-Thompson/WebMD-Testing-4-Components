import { $ } from '@wdio/globals'
import Pages from './webMD.page.js';

class navTools extends Pages {

    async disableAnimations() {
        await browser.execute(() => {
            const css = `
                * {
                    transition: none !important;
                    animation: none !important;
                }
            `;
            const style = document.createElement('style');
            style.innerHTML = css;
            document.head.appendChild(style);
        });
    }
    


//Site Navigational Selectors for Testing
    
    //selectors for the "Health A-Z" filter
    letterSelect (letter) {
        return $(`a[data-metrics-link="${letter}"]`);
    }
    
    //selectors for the "Search Bar" testing
    get searchSelect () {
        return $('.vn-menu-btn.vn-search.vn-dt');
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
    get textSide2Select () {
        return $('input[name="imprintSideTwo"]')
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
        async selectColor () {
            await this.colorSelect.click()
        }
        async selectShape () {
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

        // async enterPillText(text1, text2 = '') {
        //     await this.textSelect.waitForDisplayed({ timeout: 5000 });
        //     await this.textSelect.waitForClickable({ timeout: 5000 });
        //     await this.textSelect.click();
        //     await this.textSelect.setValue(text1);
        //     await this.textSide2Select.waitForDisplayed({ timeout: 5000 });
        //     await this.textSide2Select.waitForClickable({ timeout: 5000 });
        //     await this.textSide2Select.click();
        //     await this.textSide2Select.setValue(text2);
        //     await browser.keys('Enter');
        //   }

        // async enterPillText(text) {
        //     await this.textSelect.click();
        //     await browser.execute(el => el.value = '', input);
        //     await this.textSelect.setValue(text);
        //     await browser.keys('Enter');
        //   }

        async enterPillText(text) {
            const input = this.textSelect; // define the input element
        
            await input.waitForDisplayed({ timeout: 5000 });
            await input.waitForEnabled({ timeout: 5000 });
        
            await input.click();
            await browser.execute(el => el.value = '', input); // clear using JS
            await input.setValue(text);
            await browser.keys('Enter');
        }
        

        async selectDropdownOption(Text) {
            const option = $(`//li[contains(., "${Text}")]`);
            await option.waitForDisplayed({ timeout: 5000 });
            await option.waitForClickable({ timeout: 5000 });
            //await browser.waitUntil(async () => await option.isDisplayed(), { timeout: 5000 });
            await option.click();

            // const isVisible = await option.isDisplayed();
            //     if (!isVisible) {
            //         throw new Error(`Option "${Text}" is not visible`);
            //     }

            //     await option.click();
            //     console.log(`Clicked on: ${Text}`);
        }
          
          
        
    
}


export default new navTools();