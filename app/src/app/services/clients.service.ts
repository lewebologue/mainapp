import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from '../models/customers.interface';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private httpClient: HttpClient) {}
  #apiBaseUrl: string = environment.apiUrl;

  getCustomers(): Observable<Customers[]> {
    return this.httpClient.get<Customers[]>(`${this.#apiBaseUrl}/customer`);
  }

  getOneCustomer(id: string): Observable<Customers> {
    return this.httpClient.get<Customers>(`${this.#apiBaseUrl}/customer/${id}`);
  }

  deleteCustomer(id: string): Observable<Customers> {
    return this.httpClient.delete<Customers>(
      `${this.#apiBaseUrl}/customer/${id}`,
    );
  }

  updateCustomer(id: string, data: Customers): Observable<Customers> {
    return this.httpClient.patch<Customers>(
      `${this.#apiBaseUrl}/customer/${id}`,
      data,
    );
  }

  createCustomer(customerData: Customers) {
    return this.httpClient.post(`${this.#apiBaseUrl}/customer`, customerData);
  }
}
