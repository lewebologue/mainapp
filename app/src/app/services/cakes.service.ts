import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cakes } from '../models/cakes.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CakesService {
  constructor(private httpClient: HttpClient) {}

  getCakes(): Observable<Cakes[]> {
    return this.httpClient.get<Cakes[]>('http://localhost:3000/cake');
  }

  createCake(cakeData: Cakes): Observable<Cakes> {
    return this.httpClient.post<Cakes>('http://localhost:3000/cake', cakeData);
  }

  deleteCake(id: number): Observable<Cakes> {
    return this.httpClient.delete<Cakes>(`http://localhost:3000/cake/${id}`);
  }

  updateCake(cakeData: Cakes): Observable<Cakes> {
    return this.httpClient.put<Cakes>(`http://localhost:3000/cake/${cakeData.id}`, cakeData);
  }
}
