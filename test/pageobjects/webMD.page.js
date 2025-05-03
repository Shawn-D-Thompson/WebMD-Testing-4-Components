import { browser } from '@wdio/globals';


export default class Pages {
    main(path) {
        return browser.url(`https://www.webmd.com/${path}`);
    }
}