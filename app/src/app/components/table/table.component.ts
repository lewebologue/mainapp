import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ButtonComponent } from '../button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    ButtonComponent,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> implements AfterViewInit, OnChanges {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  @Input() title = '';
  @Input() addButton = false;
  @Input() formGroup!: FormGroup;
  @Input() orderTable = false;
  @Input() cakeColorOptions: { value: string; label: string }[] = [];
  @Output() editButtonClick = new EventEmitter<FormGroup>();
  @Output() deleteButtonClick = new EventEmitter<string>();
  @Output() addButtonClick = new EventEmitter<string>();
  @Output() markAsDeliveredClick = new EventEmitter<string>();
  @Output() directEditClick = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  editMode = false;
  editModeID: string | null = null;

  get visibleColumns(): string[] {
    if (this.editMode) {
      return this.displayedColumns;
    } else {
      return this.displayedColumns.filter((column) => column !== 'color');
    }
  }

  tableEnum: Record<string, string> = {
    name: 'Nom',
    price: 'Prix',
    parts: 'Nb de parts',
    color: 'Couleur',
    lastname: 'Nom ',
    firstname: 'Prénom',
    phone: 'Téléphone',
    'customer.firstname': 'Prénom',
    'customer.lastname': 'Nom',
    Withdrawal_date: 'Date de retrait',
    total: 'Total',
    delivered: 'Statut',
  };

  getNestedProperty(obj: unknown, path: string): string {
    const result = path
      .split('.')
      .reduce((o, p) => (o && (o as Record<string, unknown>)[p]) || '', obj);
    return result?.toString() || '';
  }

  getCakeColorLabel(colorValue: string): string {
    const colorOption = this.cakeColorOptions.find(
      (option) => option.value === colorValue,
    );
    return colorOption ? colorOption.label : colorValue;
  }

  getTextColor(backgroundColor: string): string {
    if (!backgroundColor || backgroundColor === '') {
      return '#000';
    }

    const lightColors = [
      '#FFF',
      '#F5F5F5',
      '#BFE1F6',
      '#F1BD31',
      '#C5A0A0',
      '#7FAD8B',
    ];

    if (backgroundColor === '#F5F5F5') {
      return '#000';
    }

    return lightColors.includes(backgroundColor) ? '#000' : '#fff';
  }

  hasColorData(): boolean {
    return (
      this.displayedColumns.includes('color') &&
      this.cakeColorOptions.length > 0
    );
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }

    if (!this.formGroup) {
      const controls: Record<string, FormControl> = {};
      this.displayedColumns.forEach((column) => {
        if (column !== 'actions' && !column.includes('.')) {
          controls[column] = new FormControl('');
        }
      });
      this.formGroup = new FormGroup(controls);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onEdit(id: string) {
    if (this.orderTable) {
      this.directEditClick.emit(id);
      return;
    }
    this.editModeID = id;
    this.editMode = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = this.dataSource.data.find((item: any) => item.id === id);
    if (element) {
      this.formGroup.addControl('id', new FormControl(id));
      this.formGroup.patchValue(element);
    }
  }

  onDelete(id: string) {
    this.deleteButtonClick.emit(id);
  }

  onValid() {
    this.editButtonClick.emit(this.formGroup);
    this.editMode = false;
    this.editModeID = null;
  }

  onClose() {
    this.editMode = false;
    this.editModeID = null;
  }

  addCakeToOrder(id: string) {
    const cakeOrder: string[] = [];
    cakeOrder.push(id);
    console.warn('Cake order:', cakeOrder);
  }

  onMarkAsDelivered(id: string) {
    this.markAsDeliveredClick.emit(id);
  }
}
