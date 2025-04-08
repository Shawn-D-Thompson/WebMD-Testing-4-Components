import { browser } from '@wdio/globals';

// class Pages {
//     open(path) {
//         return browser.url(`https://www.webmd.com/${path}`);
//     }
// }

export default class Pages {
    open(path) {
        return browser.url(`https://www.webmd.com/${path}`);
    }
}