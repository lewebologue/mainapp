import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TableComponent } from '../../components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { Orders } from '../../models/orders.interface';
import { ButtonComponent } from '../../components/button/button.component';
@Component({
  selector: 'app-orders',
  imports: [MatTabsModule, TableComponent, ButtonComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  todayOrders: MatTableDataSource<Orders[]> = new MatTableDataSource<Orders[]>(
    [],
  );
  allOrders: MatTableDataSource<Orders[]> = new MatTableDataSource<Orders[]>(
    [],
  );

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    //TODO
  }

  editOrder() {
    //TODO
  }

  deleteOrder() {
    //TODO
  }
}
