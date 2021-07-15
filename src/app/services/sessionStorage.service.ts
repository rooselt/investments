import { Inject, Injectable } from '@angular/core';;
import { AppComponent } from '../app.component';
// key that is used to access the data in local storageconst STORAGE_KEY = 'local_todolist';
export class SessionStorage implements Storage {
     [name: string]: any;
     readonly length: number;
     clear(): void { }
     getItem(key: string): string | null { return undefined; }
     getUser(key: string): any { return undefined; }
     key(index: number): string | null { return undefined; }
     removeItem(key: string): void { }
     setItem(key: string, value: string): void { }
 }

@Injectable({ providedIn: 'root' })
export class SessionStorageService implements Storage{
     private storage: Storage;

     constructor() {
          this.storage = new SessionStorage();

          AppComponent.isBrowser.subscribe(isBrowser => {
               if (isBrowser) {
                    this.storage = localStorage;
               }
          });
     }

     [name: string]: any;

     length: number;

     clear(): void {
          this.storage.clear();
     }

     getItem(key: string): string | null {
          return this.storage.getItem(key);
     }

     getUser(key: string): any {
          let local =  this.getItem(key);
          let json  = JSON.parse(local);
          let user = json

          return user;
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