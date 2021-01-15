import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

//https://medium.com/@santibarbat/how-to-use-localstorage-with-angular-9-universal-ssr-517578615637

class LocalStorage implements Storage {
    [name: string]: any;
    readonly length: number;
    clear(): void {}
    getItem(key: string): string | null {return undefined;}
    key(index: number): string | null {return undefined;}
    removeItem(key: string): void {}
    setItem(key: string, value: string): void {}
}


@Injectable({
    providedIn: 'root'
})
export class LocalstorageService implements Storage {

    private storage: Storage;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.storage = new LocalStorage();

        this.isBrowser = isPlatformBrowser(platformId);

        if (this.isBrowser) {
            this.storage = localStorage;
        }
    }

    [name: string]: any;

    length: number;

    clear(): void {
        this.storage.clear();
    }

    getItem(key: string): string | null {
        return this.storage.getItem(key);
    }

    key(index: number): string | null {
        return this.storage.key(index);
    }

    removeItem(key: string): void {
        return this.storage.removeItem(key);
    }

    setItem(key: string, value: string): void {
        return this.storage.setItem(key, value);
    }
}
