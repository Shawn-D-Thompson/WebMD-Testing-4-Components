import { $ } from '@wdio/globals';
import keys from './webMD.globals.js';

class policyTools extends keys {

// Selector for checking the “Policies” links
policiesLinks(index) {
return $(`.footer-sub-links a[data-metrics-link="${index}"]`);
}


// Function to click each policy link
async policySelection(index) {
    await this.policiesLinks(index).click();
}

async navigatePolicies() {
    for (let i = 1; i <= 6; i++) {
        await this.policySelection(i);
        const currentUrl = await browser.getUrl();
        console.log(`Navigated to: ${currentUrl}`);
    }
}
}

export default new policyTools();
