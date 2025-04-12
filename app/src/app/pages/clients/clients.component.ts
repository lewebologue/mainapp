import { Component, inject, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Customers } from '../../models/customers.interface';
import { FormBuilder, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clients',
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  #customerService = inject(ClientsService);
  #formBuilder = inject(FormBuilder);
  // #toastr = inject(ToastrService);

  clientsData: MatTableDataSource<Customers> =
    new MatTableDataSource<Customers>([]);

  customerControlGroup = this.#formBuilder.group({
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.#customerService.getCustomers().subscribe((response: Customers[]) => {
      this.clientsData = new MatTableDataSource<Customers>(response);
    });
  }
}
