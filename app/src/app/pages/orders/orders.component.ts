import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TableComponent } from '../../components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { Orders } from '../../models/orders.interface';
import { ButtonComponent } from '../../components/button/button.component';
import { OrdersService } from '../../services/orders.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-orders',
  imports: [MatTabsModule, TableComponent, ButtonComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  #orderService = inject(OrdersService);
  #formBuilder = inject(FormBuilder);

  todayOrders: MatTableDataSource<Orders> = new MatTableDataSource<Orders>([]);
  upcomingOrders: MatTableDataSource<Orders> = new MatTableDataSource<Orders>(
    [],
  );

  orderFormGroup: FormGroup = this.#formBuilder.group({
    id: [''],
    Withdrawal_date: [''],
    total: [''],
    delivered: [''],
  });

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.#orderService.getOrders().subscribe((response: Orders[]) => {
      const today = new Date();
      const todayStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      const todayEnd = new Date(todayStart);
      todayEnd.setDate(todayEnd.getDate() + 1);

      this.todayOrders.data = response.filter((order) => {
        const orderDate = new Date(order.Withdrawal_date);
        return orderDate >= todayStart && orderDate < todayEnd;
      });

      this.upcomingOrders.data = response.filter((order) => {
        const orderDate = new Date(order.Withdrawal_date);
        return orderDate >= todayEnd;
      });
    });
  }

  editOrder(formGroup: FormGroup) {
    const formData = formGroup.value;
    const orderId = formData.id;

    if (!orderId) {
      alert('Erreur: ID de commande manquant');
      return;
    }

    // Préparer les données pour la mise à jour
    const updateData: Partial<Orders> = {
      Withdrawal_date: formData.Withdrawal_date
        ? new Date(formData.Withdrawal_date)
        : undefined,
      total: formData.total ? Number(formData.total) : undefined,
      delivered:
        formData.delivered !== undefined ? formData.delivered : undefined,
    };

    // Nettoyer les valeurs undefined
    Object.keys(updateData).forEach((key) => {
      if (updateData[key as keyof Orders] === undefined) {
        delete updateData[key as keyof Orders];
      }
    });

    this.#orderService.updateOrder(orderId, updateData).subscribe({
      next: () => {
        alert('Commande mise à jour avec succès !');
        this.getAllOrders();
      },
      error: (error: unknown) => {
        console.error('Erreur lors de la mise à jour de la commande:', error);
        alert('Erreur lors de la mise à jour de la commande.');
      },
    });
  }

  deleteOrder(orderId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      this.#orderService.deleteOrder(orderId).subscribe({
        next: () => {
          alert('Commande supprimée avec succès !');
          this.getAllOrders();
        },
        error: (error: unknown) => {
          console.error('Erreur lors de la suppression de la commande:', error);
          alert('Erreur lors de la suppression de la commande.');
        },
      });
    }
  }

  markAsDelivered(orderId: string) {
    this.#orderService.markAsDelivered(orderId).subscribe({
      next: () => {
        this.getAllOrders();
      },
      error: (error: unknown) => {
        console.error('Erreur lors de la mise à jour de la commande:', error);
        alert('Erreur lors de la mise à jour de la commande.');
      },
    });
  }
}
