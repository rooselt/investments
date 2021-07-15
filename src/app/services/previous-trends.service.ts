import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import { Trends } from '../models/trends.model';

@Injectable({ providedIn: 'root' })
export class PreviousTrendsService extends BaseService {


    constructor(
        private http: HttpClient,
        cookieService: CookieService
    ) {
        super(cookieService)
    }

    list(): Observable<Trends[]> {
        return this.http.get<Trends[]>(`${environment.api}/trends`)
    }

    buy(id: number, userId: number, amount: number){
        let queryString: string = `id=${id}&idUser=${userId}&amount=${amount}`;
        return this.http.post<any>(`${environment.api}/trends/buy?${queryString}`, '', this.httpOptions())
    }
   
}