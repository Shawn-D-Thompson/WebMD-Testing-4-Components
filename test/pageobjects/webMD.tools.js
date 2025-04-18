import { $ } from '@wdio/globals'
import Pages from './webMD.page.js';

class navTools extends Pages {

//Site Navigational Selectors for Testing
    
    //selectors for the "Health A-Z" filter
    letterSelect (letter) {
        return $(`a[data-metrics-link="${letter}"]`);
    }
    
    //selectors for the "Search Bar" testing
    get searchSelect () {
        return $('.vn-menu-btn.vn-search.vn-dt');
    }
    get searchBarSelect () {
        return $('.webmd-input__inner');
    }
    get searchSubmit () {
        return $('button[type="submit"]');
    }
    
    //selectors for checking the “Policies” links
    selectPoliciesOptions(num) {
        return $(`[data-metrics-link="${num}"]`);
    }
    


//Functions to allow for Testing

    //Functions for the "Health A-Z" filter
    async openLetterFilter() {
        return super.open('a-to-z-guides/health-topics');
    }
    async selectLetterFilter (letter) {
         await this.letterSelect(letter).click()
    }

    //Functions for the "Search Bar" tests
    async searchSelectAndInput (text) {
        await this.searchSelect.click()
        await this.searchBarSelect.setValue(text);
        await this.searchSubmit.click()
    }


 
}


export default new navTools();