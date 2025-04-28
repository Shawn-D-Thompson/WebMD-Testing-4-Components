import { $ } from '@wdio/globals'
import Pages from './webMD.page.js';


class webAssurance extends Pages {
    
    async checkSearchError() {

        const errorElement = $('div.noRes-container');
        const errorText = errorElement.getText()
        const expectedErrorText = 'There are no results matching your search. Make sure your spelling is correct or try broadening your keywords.'
        expect(errorText).toHaveText(expectedErrorText);
    }


    async checkAndClosePopup() {
        const popupSelector = '[data-testid="modal-close"]'; // ← Replace with actual close button selector
    
        const isPopupPresent = await $(popupSelector).isDisplayed().catch(() => false);
    
        if (isPopupPresent) {
            console.log('🔔 Popup detected — closing it!');
            await $(popupSelector).click();
            await browser.pause(500); // Optional: allow time for popup to disappear
        } else {
            console.log('✅ No popup detected.');
        }
    }


    get detectLetterResults () {
        return $$('ul[class="link-list"]')
    }
    

    get detectTextinSpecies () {
        return $('.content-container')
    }
}

export default new webAssurance();
