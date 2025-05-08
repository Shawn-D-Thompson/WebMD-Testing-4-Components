import { $ } from '@wdio/globals';
import keys from './webMD.globals.js';

class letterTools extends keys {
    letterSelect(letter) {
        return $(`a[data-metrics-link="${letter}"]`);
    }

    async openLetterFilter() {
        return super.main('a-to-z-guides/health-topics');
    }

    async selectLetterFilter(letter) {
        const letterElement = this.letterSelect(letter);
        await letterElement.waitForClickable({ timeout: 10000 });
        await letterElement.click();
    }

    async checkResultsStartWith(letter) {
        const results = await $$('ul.link-list li a');
        await browser.waitUntil(() => results.length > 0, {
            timeout: 5000,
            timeoutMsg: 'Expected results to appear after 5s',
        });

        for (let item of results) {
            const text = await item.getText();
            if (text.length > 0 && text[0].toLowerCase() !== letter) {
                return false;
            }
        }

        return true;
    }

    async validateLetterFilter() {
        for (let letter of 'bcdefghijklmnopqrstuvwxyza') {
            await this.selectLetterFilter(letter);

            const allValid = await this.checkResultsStartWith(letter);
            if (!allValid) {
                throw new Error(`Results did not start with the letter "${letter}"`);
            }
        }
    }
}

export default new letterTools();
