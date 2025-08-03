import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Orders } from '../models/orders.interface';
import { CreateOrder } from '../models/create-order.interface';
import { PaymentMethod } from '../models/paymentMethods.enum';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';

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
  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {}
  #apiBaseUrl: string = environment.apiUrl;

  getOrders(): Observable<Orders[]> {
    return this.httpClient
      .get<Orders[]>(`${this.#apiBaseUrl}/order`)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }

  getOneOrder(id: string): Observable<Orders> {
    return this.httpClient
      .get<Orders>(`${this.#apiBaseUrl}/order/${id}`)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }

  createOrder(orderData: CreateOrder): Observable<Orders> {
    return this.httpClient
      .post<Orders>(`${this.#apiBaseUrl}/order`, orderData)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }

  markAsDelivered(orderId: string): Observable<Orders> {
    return this.httpClient
      .patch<Orders>(`${this.#apiBaseUrl}/order/${orderId}`, {
        delivered: true,
      })
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }

  updateOrder(orderId: string, orderData: UpdateOrderData): Observable<Orders> {
    return this.httpClient
      .patch<Orders>(`${this.#apiBaseUrl}/order/${orderId}`, orderData)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }

  deleteOrder(orderId: string): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.#apiBaseUrl}/order/${orderId}`)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }
}
