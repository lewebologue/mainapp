import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cakes } from '../models/cakes.interface';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CakesService {
  constructor(private httpClient: HttpClient) {}
  #apiBaseUrl: string = environment.apiUrl;

  getCakes(): Observable<Cakes[]> {
    return this.httpClient.get<Cakes[]>(`${this.#apiBaseUrl}/cake`);
  }

  createCake(cakeData: Cakes): Observable<Cakes> {
    return this.httpClient.post<Cakes>(`${this.#apiBaseUrl}/cake`, cakeData);
  }

  deleteCake(id: string): Observable<Cakes> {
    return this.httpClient.delete<Cakes>(`${this.#apiBaseUrl}/cake/${id}`);
  }

  updateCake(id: string, cakeData: Cakes): Observable<Cakes> {
    return this.httpClient.put<Cakes>(
      `${this.#apiBaseUrl}/cake/${id}`,
      cakeData,
    );
  }
}
