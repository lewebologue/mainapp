import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customers } from '../../models/customers.interface';
import { ClientsService } from '../../services/clients.service';
import { CakesService } from '../../services/cakes.service';
import { Cakes } from '../../models/cakes.interface';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-new-order',
  imports: [
    CommonModule,
    MatLabel,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatInput,
    MatLabel,
    MatOption,
    ReactiveFormsModule,
    MatFormField,
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatButton,
    MatCardSubtitle,
    MatCardTitle,
  ],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss',
})
export class NewOrderComponent implements OnInit {
  #customerService = inject(ClientsService);
  #cakesService = inject(CakesService);
  #formBuilder = inject(FormBuilder);

  clientsData: Customers[] = [];
  cakesData: Cakes[] = [];
  selectedClient: Customers | null = null;
  selectedCake: Cakes[] = [];

  firstFormGroup = this.#formBuilder.group({
    clientControl: [[''], Validators.required],
  });

  ngOnInit(): void {
    this.getAllCakes();
    this.getAllCustomers();
    // this.filteredOptions = this.cakeControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => (typeof value === 'string' ? value : '')),
    //   map((name) => (name ? this._filter(name) : this.clients.slice())),
    // );
  }

  // private _filter(value: string): Customers[] {
  //   const filterValue = value.toLowerCase();
  //   return this.clientsData.filter(
  //     (client) =>
  //       client.lastname.toLowerCase().includes(filterValue) ||
  //       client.firstname.toLowerCase().includes(filterValue),
  //   );
  }

  onClientSelected(event: MatAutocompleteSelectedEvent): void {
    const selected = event.option.value;
    this.#customerService.getOneCustomer(selected).subscribe((response) => {
      this.selectedClient = response;
    });
  }

  displayClient(clientId: string): string {
    if (!clientId) return '';
    const client = this.clientsData.find((c) => c.id === clientId);
    return client ? `${client.lastname} ${client.firstname}` : '';
  }

  getAllCustomers() {
    this.#customerService.getCustomers().subscribe((response: Customers[]) => {
      this.clientsData = response;
    });
  }

  getAllCakes(): void {
    this.#cakesService.getCakes().subscribe((response: Cakes[]) => {
      this.cakesData = response;
    });
  }

  resetClient(): void {
    this.selectedClient = null;
  }

  addToOrder(event: MatAutocompleteSelectedEvent): void {
    const cake: Cakes = event.option.value;
    this.selectedCake.push(cake);
    // console.log('addToOrder', this.selectedCake);
  }
}
