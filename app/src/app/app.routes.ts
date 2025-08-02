import { Routes } from '@angular/router';
import { CakesComponent } from './pages/cakes/cakes.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { KpiComponent } from './pages/kpi/kpi.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';
import { EditOrderComponent } from './pages/edit-order/edit-order.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
// import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cakes',
    component: CakesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-orders',
    component: NewOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-order/:id',
    component: EditOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'kpi',
    component: KpiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
