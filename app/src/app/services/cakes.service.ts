import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cakes } from '../models/cakes.interface';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class CakesService {
  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {}
  #apiBaseUrl: string = environment.apiUrl;

  getCakes(): Observable<Cakes[]> {
    return this.httpClient
      .get<Cakes[]>(`${this.#apiBaseUrl}/cake`)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }

  createCake(cakeData: Cakes): Observable<Cakes> {
    return this.httpClient
      .post<Cakes>(`${this.#apiBaseUrl}/cake`, cakeData)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }

  deleteCake(id: string): Observable<Cakes> {
    return this.httpClient
      .delete<Cakes>(`${this.#apiBaseUrl}/cake/${id}`)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }

  updateCake(id: string, cakeData: Cakes): Observable<Cakes> {
    return this.httpClient
      .put<Cakes>(`${this.#apiBaseUrl}/cake/${id}`, cakeData)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }
}
