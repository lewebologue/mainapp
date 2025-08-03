import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customers } from '../models/customers.interface';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {}
  #apiBaseUrl: string = environment.apiUrl;

  getCustomers(): Observable<Customers[]> {
    return this.httpClient
      .get<Customers[]>(`${this.#apiBaseUrl}/customer`)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }

  getOneCustomer(id: string): Observable<Customers> {
    return this.httpClient
      .get<Customers>(`${this.#apiBaseUrl}/customer/${id}`)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }

  deleteCustomer(id: string): Observable<Customers> {
    return this.httpClient
      .delete<Customers>(`${this.#apiBaseUrl}/customer/${id}`)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }

  updateCustomer(id: string, data: Customers): Observable<Customers> {
    return this.httpClient
      .patch<Customers>(`${this.#apiBaseUrl}/customer/${id}`, data)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }

  createCustomer(customerData: Customers): Observable<Customers> {
    return this.httpClient
      .post<Customers>(`${this.#apiBaseUrl}/customer`, customerData)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }
}
