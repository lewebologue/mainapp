import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../models/orders.interface';
import { CreateOrder } from '../models/create-order.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}
  #apiBaseUrl: string = environment.apiUrl;

  getOrders(): Observable<Orders[]> {
    return this.httpClient.get<Orders[]>(`${this.#apiBaseUrl}/order`);
  }

  getOneOrder(id: string): Observable<Orders> {
    return this.httpClient.get<Orders>(`${this.#apiBaseUrl}/order/${id}`);
  }

  createOrder(orderData: CreateOrder): Observable<Orders> {
    return this.httpClient.post<Orders>(`${this.#apiBaseUrl}/order`, orderData);
  }
}
