import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from '../models/customers.interface';
import { environment } from '../../../environments/environment';
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

  updateCake(id: string, cakeData: Customers): Observable<Customers> {
    return this.httpClient.put<Customers>(
      `${this.#apiBaseUrl}/cake/${id}`,
      cakeData,
    );
  }

  createCustomer(customerData: Customers) {
    return this.httpClient.post(`${this.#apiBaseUrl}/customer`, customerData);
  }
}
