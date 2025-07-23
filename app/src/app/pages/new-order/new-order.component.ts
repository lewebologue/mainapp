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
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

interface OrderItem {
  cake: Cakes;
  quantity: number;
  total: number;
}

@Component({
  selector: 'app-new-order',
  imports: [
    CommonModule,
    MatLabel,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatInput,
    MatOption,
    ReactiveFormsModule,
    MatFormField,
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatButton,
    MatIconButton,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
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
  orderItems: OrderItem[] = [];

  firstFormGroup = this.#formBuilder.group({
    clientControl: ['', Validators.required],
    cakeControl: [''],
  });

  ngOnInit(): void {
    this.getAllCakes();
    this.getAllCustomers();
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
    const existingItem = this.orderItems.find(
      (item) => item.cake.id === cake.id,
    );

    if (existingItem) {
      existingItem.quantity++;
      existingItem.total = existingItem.quantity * existingItem.cake.price;
    } else {
      this.orderItems.push({
        cake: cake,
        quantity: 1,
        total: cake.price,
      });
    }

    // Reset le champ de recherche
    this.firstFormGroup.get('cakeControl')?.setValue('');
  }

  updateQuantity(item: OrderItem, quantity: number): void {
    if (quantity > 0) {
      item.quantity = quantity;
      item.total = item.quantity * item.cake.price;
    }
  }

  removeItem(index: number): void {
    this.orderItems.splice(index, 1);
  }

  getTotalOrder(): number {
    return this.orderItems.reduce((total, item) => total + item.total, 0);
  }
}
