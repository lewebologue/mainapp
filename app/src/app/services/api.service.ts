import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cakes } from '../models/cakes.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getCakes(): Observable<Cakes[]> {
    return this.httpClient.get<Cakes[]>('http://localhost:3000/cake');
  }
}
