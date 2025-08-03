import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';

export interface KpiData {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalCustomers: number;
  totalCakes: number;
}

export interface OrdersKpiData {
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  ordersThisMonth: number;
}

export interface RevenueKpiData {
  totalRevenue: number;
  revenueThisMonth: number;
  averageOrderValue: number;
}

@Injectable({
  providedIn: 'root',
})
export class KpiService {
  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {}
  
  private apiBaseUrl: string = environment.apiUrl;

  getKpiData(): Observable<KpiData> {
    return this.httpClient
      .get<KpiData>(`${this.apiBaseUrl}/kpi`)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }

  getOrdersKpi(): Observable<OrdersKpiData> {
    return this.httpClient
      .get<OrdersKpiData>(`${this.apiBaseUrl}/kpi/orders`)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }

  getRevenueKpi(): Observable<RevenueKpiData> {
    return this.httpClient
      .get<RevenueKpiData>(`${this.apiBaseUrl}/kpi/revenue`)
      .pipe(catchError(this.errorHandler.handleError.bind(this.errorHandler)));
  }
}
