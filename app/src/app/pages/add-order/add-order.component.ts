import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { map, Observable, startWith } from 'rxjs';

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
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss',
})
export class AddOrderComponent implements OnInit, AfterViewInit {
  constructor() {
    this.secondFormGroup = new FormGroup({
      cakes: this.cakeControl,
    });
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  #formBuilder = inject(FormBuilder);
  #clientService = inject(ClientsService);
  #cakesService = inject(CakesService);
  // #orderService = inject(OrdersService);

  clients!: Customers[];
  cakes: MatTableDataSource<Cakes> = new MatTableDataSource<Cakes>([]);
  displayedColumns: string[] = ['name', 'parts', 'price'];

  firstFormGroup = this.#formBuilder.group({
    clientControl: ['', Validators.required],
  });
  secondFormGroup!: FormGroup;
  isLinear = true;
  cakeControl = new FormControl();
  filteredOptions!: Observable<Customers[]>;

  tableEnum: Record<string, string> = {
    name: 'Nom',
    price: 'Prix',
    parts: 'Nb de parts',
  };

  orderedCakes: string[] = [];

  ngOnInit(): void {
    this.cakes.paginator = this.paginator;
    this.getAllCakes();
    this.getAllCustomers();
    this.filteredOptions = this.cakeControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : '')),
      map((name) => (name ? this._filter(name) : this.clients.slice())),
    );
  }

  ngAfterViewInit(): void {
    this.cakes.paginator = this.paginator;
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
      if (this.paginator) {
        this.cakes.paginator = this.paginator;
      }
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

  addToOrder(id: string) {
    this.orderedCakes.push(id);
    console.log(this.orderedCakes);
  }
  removeFromOrder(id: string) {
    this.orderedCakes = this.orderedCakes.filter((cakeId) => cakeId !== id);
    console.log(this.orderedCakes);
  }
}
