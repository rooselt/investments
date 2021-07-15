import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import { UserPosition } from '../models/userPosition.model';

@Injectable({ providedIn: 'root' })
export class PreviousPositionService extends BaseService {


    constructor(
        private http: HttpClient,
        cookieService: CookieService
    ) {
        super(cookieService)
    }

    list(idUser: number, symbol: string): Observable<UserPosition> {
        return this.http.get<UserPosition>(`${environment.api}/user-position/${idUser}/${symbol}`)
    }

    listAll(idUser: number): Observable<UserPosition> {
        return this.http.get<UserPosition>(`${environment.api}/user-position/${idUser}`)
    }
}