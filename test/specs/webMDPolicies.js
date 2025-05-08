import policyTools from '../pageobjects/policiesTools.js';

describe('Checking that the "Policies" links function properly', () => {
    beforeEach(async () => {
        await policyTools.main();
    });

    it('should navigate to all policy pages', async () => {
        await policyTools.navigatePolicies();
    });
});
