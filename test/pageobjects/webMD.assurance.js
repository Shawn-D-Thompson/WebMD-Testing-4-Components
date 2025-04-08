import { $ } from '@wdio/globals'
import Pages from './webMD.page.js';


class webAssurance extends Pages {
    
    get detectTextInSearch () {
        return $('.listing-body')
    }
    

    get detectTextinSpecies () {
        return $('.content-container')
    }
}

export default new webAssurance();
