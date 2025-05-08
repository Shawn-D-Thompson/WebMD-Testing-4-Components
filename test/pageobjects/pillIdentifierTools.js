import { $ } from '@wdio/globals';
import keys from './webMD.globals.js';

class pillTools extends keys {

    // Shape and Color Options
    shapeOptions = [
        '3 Sided', '5 Sided', '6 Sided', '8 Sided', 'Oval',
        'Round', 'Oblong', 'Square', 'Rectangle', 'Diamond', 'Other'
    ];

    colorOptions = [
        'White', 'Off-White', 'Clear', 'Gray', 'Black',
        'Tan', 'Brown', 'Red', 'Multi-Color', 'Orange', 'Peach',
        'Yellow', 'Gold', 'Green', 'Turquoise', 'Blue', 'Purple', 'Pink'
    ];

    // Selectors
    get colorSelect() { return $('.color-section'); }
    get shapeSelect() { return $('.shape-section'); }
    get textSelect() { return $('.imprint-search'); }
    get textSide1Select() { return $('input[name="imprintSideOne"]'); }
    get textSide2Select() { return $('input[name="imprintSideTwo"]'); }
    get pillSubmit() { return $('//button[contains(normalize-space(), "Result")]'); }

    // Open Pill Identifier
    async openPillIdentifier() {
        return super.main('pill-identification/default.htm');
    }

    // Run Shape Test
    async testShapes() {
        for (let shape of this.shapeOptions) {
            await browser.keys('Escape');
            await this.selectShapeMenu();
            await this.selectDropdownOption(shape);
            await this.selectSubmit();
            await this.waitForSearchResults();
        }
    }

    // Run Color Test
    async testColors() {
        for (let color of this.colorOptions) {
            await this.selectColorMenu();
            await this.selectDropdownOption(color);
            await this.selectSubmit();
            await this.waitForSearchResults();
        }
    }

    // Text Input Test
    async testTextInput(text1, text2 = '') {
        await this.openPillIdentifier();
        await this.enterPillText(text1, text2);
        await this.selectSubmit();
        await this.waitForSearchResults();
    }

    // Functions for the "Pill Identifier" tests

    async selectColorMenu() {
        await this.colorSelect.click();
    }

    async selectShapeMenu() {
        await this.shapeSelect.click();
    }

    async selectSubmit() {
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

    async waitForSearchResults() {
        await browser.waitUntil(async () => {
            const results = $('div.search-results-container');
            return await results.isDisplayed();
        }, { timeout: 10000 });
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
        }}
    

    async selectDropdownOption(Text) {
        const option = $(`//li[contains(., "${Text}")]`);
        await option.waitForDisplayed({ timeout: 5000 });
        await option.waitForClickable({ timeout: 5000 });
        await browser.waitUntil(async () => await option.isDisplayed(), { timeout: 5000 });
        await option.click();
    }
}

export default new pillTools();
