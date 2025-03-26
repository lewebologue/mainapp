import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CakesResponse } from '../models/cakes.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getCakes(): Observable<CakesResponse> {
    return this.httpClient.get<CakesResponse>('http://localhost:3000/cake');
  }
}
