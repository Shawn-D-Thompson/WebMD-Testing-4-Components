import letterTools from '../pageobjects/letterFilterTools.js';

describe('WebMD Health A-Z Filter', () => {
    before(async () => {
        await letterTools.openLetterFilter();
    });

    it('should only show results that start with the correct letter for each filter', async () => {
        await letterTools.validateLetterFilter();
    });
});
