import { isDevMode } from '@angular/core';

export class Utility {

    showDevLog(message: string){
        if (isDevMode) {
            console.info(message);
        }
    }

    saveToLocal(key: string, value: string){
        localStorage.setItem(key, value);
    }

    getFromLocal(key: string): string {
        return localStorage.getItem(key);
    }

    removeFromLocal(key: string) {
        localStorage.removeItem(key);
    }

    clearLocalStorage() {
        localStorage.clear();
    }
}
