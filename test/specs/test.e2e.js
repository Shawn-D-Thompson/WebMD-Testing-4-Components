import { expect } from '@wdio/globals'
import NavTools from '../pageobjects/webMD.tools'
import webAssurance from '../pageobjects/webMD.assurance'

describe('', () => {
    it('Testing the "Health A-Z” search filter options', async () => {

        // await browser.url('https://www.webmd.com/');
        // await NavTools.symptonChecking()
        // await browser.back()
        // await NavTools.goFindDoctor()
        // await browser.back()
        // await NavTools.livHealthyViewAll()
        // await browser.back()
        await NavTools.openLetterFilter()
        await NavTools.selectLetterFilter('f')
        await NavTools.selectLetterFilter('d')
        await NavTools.selectLetterFilter('x')
        await NavTools.selectLetterFilter('g')
        await NavTools.selectLetterFilter('w')
        await NavTools.selectLetterFilter('a')
        await NavTools.open()

    })

    it('Checking the "Policies" options', async () => {
        const policiesLink = await $('=Policies');
        const aboutLink = await $('=About');
        const advertisersLink = await $('=For Advertisers');
    
        await aboutLink.click();
    
        await advertisersLink.click();
       
        await policiesLink.click();
    });
})    // await LoginPage.open()

        // await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        // await expect(SecurePage.flashAlert).toBeExisting()
        // await expect(SecurePage.flashAlert).toHaveText(
        //     expect.stringContaining('You logged into a secure area!'))
//     })
// })

