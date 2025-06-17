import { Routes } from '@angular/router';import { CakesComponent } from './pages/cakes/cakes.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { KpiComponent } from './pages/kpi/kpi.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';

export const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
  },
  {
    path: 'cakes',
    component: CakesComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'add-orders',
    component: NewOrderComponent,
  },
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: 'kpi',
    component: KpiComponent,
  },
];
