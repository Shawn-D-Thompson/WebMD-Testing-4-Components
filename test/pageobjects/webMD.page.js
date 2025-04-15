import { browser } from '@wdio/globals';


export default class Pages {
    open(path) {
        return browser.url(`https://www.webmd.com/${path}`);
    }
}