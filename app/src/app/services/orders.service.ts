import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../models/orders.interface';
import { CreateOrder } from '../models/create-order.interface';
import { PaymentMethod } from '../models/paymentMethods.enum';
import { environment } from '../../environments/environment';

export interface UpdateOrderData {
  total?: number;
  Withdrawal_date?: Date;
  PaymentMethod?: PaymentMethod;
  deposit?: number;
  remaining_balance?: number;
  delivered?: boolean;
  cakes?: { id: string }[];
}

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

  markAsDelivered(orderId: string): Observable<Orders> {
    return this.httpClient.patch<Orders>(
      `${this.#apiBaseUrl}/order/${orderId}`,
      {
        delivered: true,
      },
    );
  }

  updateOrder(orderId: string, orderData: UpdateOrderData): Observable<Orders> {
    return this.httpClient.patch<Orders>(
      `${this.#apiBaseUrl}/order/${orderId}`,
      orderData,
    );
  }

  deleteOrder(orderId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.#apiBaseUrl}/order/${orderId}`);
  }
}
