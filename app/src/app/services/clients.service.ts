import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from '../models/customers.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<Customers[]> {
    return this.httpClient.get<Customers[]>('http://localhost:3000/customer');
  }

  getOneCustomer(id: string): Observable<Customers> {
    return this.httpClient.get<Customers>(
      `http://localhost:3000/customer/${id}`,
    );
  }

  deleteCustomer(id: string): Observable<Customers> {
    return this.httpClient.delete<Customers>(
      `http://localhost:3000/customer/${id}`,
    );
  }

  updateCake(id: string, cakeData: Customers): Observable<Customers> {
    return this.httpClient.put<Customers>(
      `http://localhost:3000/cake/${id}`,
      cakeData,
    );
  }
}
