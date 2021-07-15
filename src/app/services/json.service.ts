import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonData } from '../models/json-data.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JsonDataService {

    private jsonPath: string = "./assets/json/data.json";

    constructor(
        private http: HttpClient
    ) {
    }

    get(): Observable<JsonData> {
        return this.http.get<JsonData>(this.jsonPath);
    }
}
