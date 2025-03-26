import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CakesComponent } from './pages/cakes/cakes.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { KpiComponent } from './pages/kpi/kpi.component';
import { OrdersComponent } from './pages/orders/orders.component';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'cakes',
        component: CakesComponent
    },
    {
        path: 'orders',
        component: OrdersComponent
    },
    {
        path: 'clients',
        component: ClientsComponent
    },
    {
        path: 'kpi',
        component: KpiComponent
    }
];
