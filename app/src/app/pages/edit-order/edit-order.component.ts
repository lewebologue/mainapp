import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';

import { OrdersService } from '../../services/orders.service';
import { CakesService } from '../../services/cakes.service';
import { Orders } from '../../models/orders.interface';
import { Cakes } from '../../models/cakes.interface';
import { PaymentMethod } from '../../models/paymentMethods.enum';
import { UpdateOrderData } from '../../services/orders.service';

@Component({
  selector: 'app-edit-order',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule,
  ],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.scss',
  standalone: true,
})
export class EditOrderComponent implements OnInit {
  #ordersService = inject(OrdersService);
  #cakesService = inject(CakesService);
  #formBuilder = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #toastr = inject(ToastrService);

  orderId: string | null = null;
  orderData: Orders | null = null;
  isLoading = false;
  availableCakes: Cakes[] = [];
  selectedCakes: Cakes[] = [];

  paymentMethodOptions = Object.entries(PaymentMethod).map(([key, value]) => ({
    key: key as keyof typeof PaymentMethod,
    value: value,
    label: value,
  }));

  editOrderForm = this.#formBuilder.group({
    total: [0, [Validators.required, Validators.min(0.01)]],
    Withdrawal_date: ['', Validators.required],
    PaymentMethod: ['', Validators.required],
    deposit: [0, [Validators.min(0)]],
    remaining_balance: [0, [Validators.min(0)]],
    delivered: [false],
  });

  cakeControl = this.#formBuilder.control('');

  ngOnInit(): void {
    this.orderId = this.#route.snapshot.paramMap.get('id');
    if (this.orderId) {
      this.loadOrder();
      this.loadAvailableCakes();
    } else {
      this.#toastr.error('ID de commande manquant');
      this.#router.navigate(['/orders']);
    }
  }

  loadOrder(): void {
    if (!this.orderId) return;

    this.isLoading = true;
    this.#ordersService.getOneOrder(this.orderId).subscribe({
      next: (order: Orders) => {
        this.orderData = order;
        this.populateForm(order);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la commande:', error);
        this.#toastr.error('Erreur lors du chargement de la commande');
        this.isLoading = false;
        this.#router.navigate(['/orders']);
      },
    });
  }

  populateForm(order: Orders): void {
    this.selectedCakes = [...order.cakes];
    this.editOrderForm.patchValue({
      total: order.total,
      Withdrawal_date: order.Withdrawal_date.toString(),
      PaymentMethod: order.PaymentMethod,
      deposit: order.deposit || 0,
      remaining_balance: order.remaining_balance || 0,
      delivered: order.delivered || false,
    });
  }

  loadAvailableCakes(): void {
    this.#cakesService.getCakes().subscribe({
      next: (cakes: Cakes[]) => {
        this.availableCakes = cakes;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des gâteaux:', error);
        this.#toastr.error('Erreur lors du chargement des gâteaux');
      },
    });
  }

  addCake(cake: Cakes): void {
    if (!this.selectedCakes.find((c) => c.id === cake.id)) {
      this.selectedCakes.push(cake);
      this.updateTotalFromCakes();
      this.cakeControl.setValue('');
      this.#toastr.success(`${cake.name} ajouté à la commande`);
    } else {
      this.#toastr.warning('Ce gâteau est déjà dans la commande');
    }
  }

  removeCake(cakeId: string): void {
    const index = this.selectedCakes.findIndex((cake) => cake.id === cakeId);
    if (index > -1) {
      const removedCake = this.selectedCakes.splice(index, 1)[0];
      this.updateTotalFromCakes();
      this.#toastr.success(`${removedCake.name} supprimé de la commande`);
    }
  }

  updateTotalFromCakes(): void {
    const total = this.selectedCakes.reduce((sum, cake) => sum + cake.price, 0);
    this.editOrderForm.patchValue({ total });
    this.onTotalChange();
  }

  onCakeSelected(event: { option: { value: Cakes } }): void {
    const cake: Cakes = event.option.value;
    this.addCake(cake);
  }

  displayCakeFn(cake: Cakes): string {
    return cake ? `${cake.name} - ${cake.parts} parts (${cake.price}€)` : '';
  }

  get filteredCakes(): Cakes[] {
    return this.availableCakes.filter(
      (cake) => !this.selectedCakes.find((selected) => selected.id === cake.id),
    );
  }

  onTotalChange(): void {
    const total = this.editOrderForm.get('total')?.value || 0;
    const deposit = this.editOrderForm.get('deposit')?.value || 0;
    const remainingBalance = Math.max(0, total - deposit);

    this.editOrderForm.patchValue({
      remaining_balance: remainingBalance,
    });
  }

  onDepositChange(): void {
    const total = this.editOrderForm.get('total')?.value || 0;
    const deposit = this.editOrderForm.get('deposit')?.value || 0;
    const remainingBalance = Math.max(0, total - deposit);

    this.editOrderForm.patchValue({
      remaining_balance: remainingBalance,
    });
  }

  updateOrder(): void {
    if (!this.editOrderForm.valid || !this.orderId) {
      this.#toastr.error('Veuillez remplir tous les champs requis');
      this.editOrderForm.markAllAsTouched();
      return;
    }

    if (this.selectedCakes.length === 0) {
      this.#toastr.error('Veuillez sélectionner au moins un gâteau');
      return;
    }

    const formData = this.editOrderForm.value;
    const updateData: UpdateOrderData = {
      total: formData.total || 0,
      Withdrawal_date: new Date(formData.Withdrawal_date!),
      PaymentMethod: formData.PaymentMethod as PaymentMethod,
      deposit: formData.deposit || 0,
      remaining_balance: formData.remaining_balance || 0,
      delivered: formData.delivered || false,
      cakes: this.selectedCakes.map((cake) => ({ id: cake.id })),
    };

    this.isLoading = true;
    this.#ordersService
      .updateOrder(this.orderId, updateData)
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.#toastr.error('Erreur lors de la mise à jour de la commande');
          this.isLoading = false;
          return of(null);
        }),
      )
      .subscribe((result) => {
        if (result) {
          this.#toastr.success('Commande mise à jour avec succès');
          this.#router.navigate(['/orders']);
        }
        this.isLoading = false;
      });
  }

  cancel(): void {
    this.#router.navigate(['/orders']);
  }
}
