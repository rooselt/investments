import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { PracticeTest } from '../models/practice-test.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class PracticeTestService extends BaseService {

    private routeAPI: string = `${environment.api}/trends`;

    constructor(
        private http: HttpClient,
        cookieService: CookieService
    ) {
        super(cookieService);
    }

    get(params: { id: number }): Observable<PracticeTest> {
      return this.http.get<PracticeTest>(this.routeAPI, this.httpOptions(JSON.parse(JSON.stringify(params))));
    }
}
