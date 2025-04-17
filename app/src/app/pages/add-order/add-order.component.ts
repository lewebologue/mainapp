import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { ButtonComponent } from '../../components/button/button.component';
import { Cakes } from '../../models/cakes.interface';
import { Customers } from '../../models/customers.interface';
import { CakesService } from '../../services/cakes.service';
import { ClientsService } from '../../services/clients.service';
// import { OrdersService } from '../../services/orders.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-add-order',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonComponent,
    MatSelectModule,
    MatListModule,
  ],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss',
})
export class AddOrderComponent implements OnInit {
  constructor() {
    this.secondFormGroup = new FormGroup({
      cakes: this.cakeControl,
    });
  }
  #formBuilder = inject(FormBuilder);
  #clientService = inject(ClientsService);
  #cakesService = inject(CakesService);
  // #orderService = inject(OrdersService);

  clients!: Customers[];
  selectedClient!: Customers;
  cakes!: Cakes[];

  firstFormGroup = this.#formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup!: FormGroup;
  isLinear = true;
  cakeControl = new FormControl();

  ngOnInit(): void {
    this.getAllCakes();
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.#clientService.getCustomers().subscribe((response: Customers[]) => {
      this.clients = response;
    });
  }

  getAllCakes() {
    this.#cakesService.getCakes().subscribe((response: Cakes[]) => {
      this.cakes = response;
    });
  }

  createOrder() {
    //TODO
  }
}
