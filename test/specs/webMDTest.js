import { expect } from '@wdio/globals'
import webAssurance from '../pageobjects/webMD.assurance'
import navTools from '../pageobjects/webMD.tools.js'

describe('WebMD Health A-Z Filter', () => {
    for (let letter of 'bcdefghijklmnopqrstuvwxyza') {
        it(`should only show results that start with the letter ${letter}`, async () => {
            await navTools.openLetterFilter();
            await navTools.selectLetterFilter(letter);

            // Wait for the letter filter results to appear
            const results = await $$('ul.link-list li a');
            await browser.waitUntil(async () => (await results.length) > 0, {
                timeout: 5000,
                timeoutMsg: 'expected results to appear after 5s',
            });

            for (let item of results) {
                const text = await item.getText();
                if (text.length > 0) {
                    expect(text[0].toUpperCase()).toBe(letter);
                }
            }
        });
    }
});













// describe('', () => {
//     it('Testing the "Health A-Z” search filter options', async () => {
//         await browser.url('https://www.webmd.com/');
//         await navTools.openLetterFilter()
//         await navTools.selectLetterFilter('f')
//         await navTools.selectLetterFilter('d')
//         await navTools.selectLetterFilter('x')
//         await navTools.selectLetterFilter('g')
//         await navTools.selectLetterFilter('w')
//         await navTools.selectLetterFilter('a')
//         await navTools.open()

//     })

//     it('Checking the "Policies" options', async () => {
//         const policiesLink = await $('=Policies');
//         const aboutLink = await $('=About');
//         const advertisersLink = await $('=For Advertisers');
    
//         await aboutLink.click();
    
//         await advertisersLink.click();
       
//         await policiesLink.click();
//     });
// })
