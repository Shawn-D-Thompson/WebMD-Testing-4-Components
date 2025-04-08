import { $ } from '@wdio/globals'
import Pages from './webMD.page.js';

class NavTools extends Pages {

//Site Navigational Selectors for Testing
    
    letterSelect (letter) {
        return $(`a[data-metrics-link="${letter}"]`);
    }
    get searchSelect () {
        return $('.vn-menu-btn.vn-search.vn-dt');
    }
    get searchBarSelect () {
        return $('.webmd-input__inner');
    }
    get searchSubmit () {
        return $('button[type="submit"]');
    }
    get homeSelect() {
        return $('a[href="https://www.webmd.com/"]')
    }
    get findDoctor() {
        return $('a[href="https://doctor.webmd.com/"]')
    }
    get symptomChecker() {
        return $('a[href="https://symptoms.webmd.com"]')
    }
    get livingViewAll() {
        return $('a[href="https://www.webmd.com/living-healthy"]')
    }


//Functions to allow for Testing


    async goHome() {
        await browser.url('https://www.webmd.com/');
    }
    async symptonChecking() {
        await this.symptomChecker.click()
    }
    async livHealthyViewAll() {
        await this.livingViewAll.click()
    }
    async goFindDoctor() {
        await this.findDoctor.click()
    }
    async searchSelectAndInput (text) {
        await this.searchSelect.click()
        await this.searchBarSelect.setValue(text);
        await this.searchSubmit.click()
    }
    async selectLetterFilter (letter) {
        await this.letterSelect(letter).click()
    }

    async openLetterFilter() {
        return super.open('a-to-z-guides/health-topics');
    }
    async 
}


export default new NavTools();