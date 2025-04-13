import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Customers } from '../../models/customers.interface';
import { ClientsService } from '../../services/clients.service';
import { TableComponent } from '../../components/table/table.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-clients',
  imports: [
    CommonModule,
    TableComponent,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  #customerService = inject(ClientsService);
  #formBuilder = inject(FormBuilder);
  #toastr = inject(ToastrService);

  clientsData: MatTableDataSource<Customers> =
    new MatTableDataSource<Customers>([]);

  customerControlGroup = this.#formBuilder.group({
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.#customerService.getCustomers().subscribe((response: Customers[]) => {
      this.clientsData = new MatTableDataSource<Customers>(response);
    });
  }

  createCustomer() {
    if (this.customerControlGroup.valid) {
      const customerData: Customers = {
        lastname: this.customerControlGroup.value.lastname ?? '',
        firstname: this.customerControlGroup.value.firstname ?? '',
        email: this.customerControlGroup.value.email ?? '',
        phone: this.customerControlGroup.value.phone ?? '',
      };
      this.#customerService
        .createCustomer(customerData)
        .subscribe(() => this.getAllCustomers());
    }
  }

  editCustomer(data: FormGroup) {
    const editCustomerData: Customers = {
      lastname: data.value.lastname ?? '',
      firstname: data.value.firstname ?? '',
      email: data.value.email ?? '',
      phone: data.value.phone ?? '',
      updatedAt: new Date(),
    };
    this.#customerService
      .updateCustomer(data.value.id, editCustomerData)
      .pipe(
        catchError((error) => {
          this.#toastr.error('Erreur lors de la modification du client');
          console.error('Erreur:', error);
          return of([]);
        }),
      )
      .subscribe(() => {
        this.#toastr.success('Client Modifié');
        this.getAllCustomers();
      });
  }

  deleteClient(id: string) {
    this.#customerService.deleteCustomer(id).subscribe(() => {
      this.#toastr.success('Client supprimé');
      this.getAllCustomers();
    });
  }
}
