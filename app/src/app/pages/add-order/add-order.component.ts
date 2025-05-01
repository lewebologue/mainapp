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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { TableComponent } from '../../components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';

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
    MatAutocompleteModule,
    TableComponent,
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
  cakes: MatTableDataSource<Cakes> = new MatTableDataSource<Cakes>([]);

  firstFormGroup = this.#formBuilder.group({
    clientControl: ['', Validators.required],
  });
  secondFormGroup!: FormGroup;
  isLinear = true;
  cakeControl = new FormControl();
  filteredOptions!: Observable<Customers[]>;

  ngOnInit(): void {
    this.getAllCakes();
    this.getAllCustomers();
    this.filteredOptions = this.cakeControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : '')),
      map((name) => (name ? this._filter(name) : this.clients.slice())),
    );
  }

  private _filter(value: string): Customers[] {
    const filterValue = value.toLowerCase();
    return this.clients.filter(
      (client) =>
        client.lastname.toLowerCase().includes(filterValue) ||
        client.firstname.toLowerCase().includes(filterValue),
    );
  }

  displayClient(clientId: string | number): string {
    if (!clientId) return '';
    const client = this.clients.find((c) => c.id === clientId);
    return client ? `${client.lastname} ${client.firstname}` : '';
  }

  getAllCustomers() {
    this.#clientService.getCustomers().subscribe((response: Customers[]) => {
      this.clients = response;
    });
  }

  getAllCakes(): void {
    this.#cakesService.getCakes().subscribe((response: Cakes[]) => {
      this.cakes = new MatTableDataSource<Cakes>(response);
    });
  }

  createOrder() {
    const order = {
      client: this.firstFormGroup.get('clientControl')?.value,
      cake: this.cakeControl.value,
    };
    console.log(order);
    //TODO
  }
}
