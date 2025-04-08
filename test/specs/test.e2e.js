import { expect } from '@wdio/globals'
import NavTools from '../pageobjects/webMD.tools'
import webAssurance from '../pageobjects/webMD.assurance'

describe('10 automated actions', () => {
    it('should navigate around the site', async () => {

        await browser.url('https://www.webmd.com/');
        await NavTools.symptonChecking()
        await browser.back()
        await NavTools.goFindDoctor()
        await browser.back()
        await NavTools.livHealthyViewAll()
        await browser.back()
        await NavTools.openLetterFilter()
        await NavTools.selectLetterFilter('f')
        await NavTools.selectLetterFilter('d')
        await NavTools.selectLetterFilter('x')
        await NavTools.selectLetterFilter('g')
        await NavTools.selectLetterFilter('w')
        await NavTools.selectLetterFilter('a')
        await NavTools.open()

    })
})    // await LoginPage.open()

        // await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        // await expect(SecurePage.flashAlert).toBeExisting()
        // await expect(SecurePage.flashAlert).toHaveText(
        //     expect.stringContaining('You logged into a secure area!'))
//     })
// })

