import { Routes } from '@angular/router';
import { CakesComponent } from './pages/cakes/cakes.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { KpiComponent } from './pages/kpi/kpi.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'cakes',
    component: CakesComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] },
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] },
  },
  {
    path: 'add-orders',
    component: NewOrderComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] },
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] },
  },
  {
    path: 'kpi',
    component: KpiComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] },
  },
];
