import { $ } from '@wdio/globals'
import keys from './webMD.globals.js';

class searchTools extends keys {
    
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

    //Functions for the "Search Bar" tests
    async searchSelectAndInput (text) {
        await this.searchSelect.click()
        await this.searchBarSelect.setValue(text);
        await this.searchSubmit.click()
    }
    async searchTimeoutCheck () {
        const result = $('div.search-results-internal-container');
        await browser.waitUntil(async () => {
            const exists = await result.isExisting();
            const visible = await result.isDisplayed();
            return exists && visible;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected results to appear after 5s',
        });
    }
    async checkSearchError() {

        const errorElement = $('div.noRes-container');
        const errorText = errorElement.getText();
        const expectedErrorText = 'There are no results matching your search. Make sure your spelling is correct or try broadening your keywords.'
        await errorElement.waitForDisplayed();
        expect(errorText).toHaveText(expectedErrorText);
    }

}


export default new searchTools();