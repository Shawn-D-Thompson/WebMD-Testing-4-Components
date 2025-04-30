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
        return $('.color-section')
    }
    get shapeSelect () {
        return $('.shape-section')
    }
    get textSelect () {
        return $('.mobile-tool-tip')
    }
    get textSide2Select () {
        return $('input[name="imprintSideTwo"]')
    }
    get pillSubmit () {
        return $('.webmd-button webmd-button--primary webmd-button--medium')
    }


//Functions to allow for Testing

    //Functions for the "Health A-Z" filter
    async openLetterFilter() {
        return super.open('a-to-z-guides/health-topics');
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
        return super.open('pill-identification/default.htm');
    }
    async selectColor () {
        await this.colorSelect.click()
    }
    async selectShape () {
        await this.shapeSelect.click()
    }
    async selectText1 () {
        await this.textSelect.click()
    }
    async selectText2 () {
        await this.textSide2Select.click()
    }
    async selectSubmit () {
        await this.pillSubmit.click()
    }
    
}


export default new navTools();