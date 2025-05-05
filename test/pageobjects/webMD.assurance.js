import { $ } from '@wdio/globals'
import Pages from './webMD.page.js';


class webAssurance extends Pages {
    
    async checkSearchError() {

        const errorElement = $('div.noRes-container');
        const errorText = errorElement.getText()
        const expectedErrorText = 'There are no results matching your search. Make sure your spelling is correct or try broadening your keywords.'
        expect(errorText).toHaveText(expectedErrorText);
    }


    //LetterFilter
    get detectLetterResults () {
        return $$('ul[class="link-list"]')
    }

    async letterTimoutCheck () {
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
    }
    

    async searchTimeoutCheck () {
        await browser.waitUntil(async () => {
            const results = await $$('div.search-results-internal-container');
            return results.length > 0;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected results to appear after 5s',
        });
    }
}

export default new webAssurance();
