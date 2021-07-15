import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieIdentifier } from '../identifiers/cookie.identifier';

@Injectable({ providedIn: 'root' })
export abstract class BaseService {

    private _httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',            
            'Authorization': this.cookieService.get(CookieIdentifier.accessAPI)
        }),
        withCredentials: false,
        params: null,
    };

    protected httpOptions(params?: HttpParams | any): object {
        this._httpOptions.params = params ? <HttpParams>params : undefined;        
        return this._httpOptions;
    }

    constructor(
        public cookieService: CookieService
    ) { }
}
