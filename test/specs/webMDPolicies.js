import webAssurance from '../pageobjects/webMD.assurance'
import navTools from '../pageobjects/webMD.tools.js'


describe('Checking that the "Policies" links function properly', () => {

    const policiesToTest = [
        'Privacy Policy',
        'Cookie Policy',
        'Editorial Policy',
        'Advertising Policy',
        'Correction Policy',
        'Terms of Use',
        'Your Privacy Choices',
    ];

    beforeEach(async () => {
        await navTools.main();
    });

    for (const policy of policiesToTest) {
        it(`should navigate to ${policy} page`, async () => {
            await navTools.policySelection(policy);

            const currentUrl = await browser.getUrl();
            console.log(`Navigated to: ${currentUrl}`);

            // Optionally validate the URL here
        });
    }

});
