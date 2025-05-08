import { browser } from '@wdio/globals';


export default class keys {
    main(path) {
        return browser.url(`https://www.webmd.com/${path}`);
    }
}