import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Cakes } from '../../models/cakes.interface';
import { Customers } from '../../models/customers.interface';
import { CakesService } from '../../services/cakes.service';
import { ClientsService } from '../../services/clients.service';
import { OrdersService } from '../../services/orders.service';
import { PaymentMethod } from '../../models/paymentMethods.enum';
import { CreateOrder } from '../../models/create-order.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss',
})
export class NewOrderComponent implements OnInit {
  #customerService = inject(ClientsService);
  #cakesService = inject(CakesService);
  #ordersService = inject(OrdersService);
  #formBuilder = inject(FormBuilder);

  clientsData: Customers[] = [];
  cakesData: Cakes[] = [];
  selectedClient: Customers | null = null;
  orderItems: OrderItem[] = [];
  paymentMethodOptions = Object.entries(PaymentMethod).map(([key, value]) => ({
    key: key as keyof typeof PaymentMethod,
    value: value,
    label: value,
  }));

  firstFormGroup = this.#formBuilder.group({
    clientControl: ['', Validators.required],
    cakeControl: [''],
  });
  paymentFormGroup = this.#formBuilder.group({
    paymentMethod: ['', Validators.required],
    deposit: [0, [Validators.required, Validators.min(0)]],
    withdrawalDate: ['', Validators.required],
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

  validateOrder(): void {
    if (!this.selectedClient || this.orderItems.length === 0) {
      alert(
        'Veuillez sélectionner un client et ajouter des gâteaux à la commande.',
      );
      return;
    }

    if (!this.paymentFormGroup.valid) {
      alert('Veuillez remplir tous les champs de paiement.');
      this.paymentFormGroup.markAllAsTouched();
      return;
    }

    const formValues = this.paymentFormGroup.value;
    const deposit = formValues.deposit || 0;
    const total = this.getTotalOrder();

    const orderData: CreateOrder = {
      customerId: this.selectedClient.id,
      cakeIds: this.orderItems.map((item) => item.cake.id),
      total: total,
      Withdrawal_date: new Date(formValues.withdrawalDate!),
      PaymentMethod: formValues.paymentMethod as PaymentMethod,
      deposit: deposit,
      remaining_balance: total - deposit,
    };

    this.#ordersService.createOrder(orderData).subscribe({
      next: () => {
        alert('Commande créée avec succès !');
        this.resetForm();
      },
      error: (error) => {
        console.error('Erreur lors de la création de la commande:', error);
        alert('Erreur lors de la création de la commande. Veuillez réessayer.');
      },
    });
  }

  resetForm(): void {
    this.selectedClient = null;
    this.orderItems = [];
    this.firstFormGroup.reset();
    this.paymentFormGroup.reset();
  }
}
