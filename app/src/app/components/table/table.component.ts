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
import { Cakes } from '../../models/cakes.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ButtonComponent } from '../button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

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
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit, OnChanges {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<Cakes> =
    new MatTableDataSource<Cakes>([]);
  @Input() title = '';
  @Input() addButton = false;
  @Input() formGroup!: FormGroup;
  @Output() editButtonClick = new EventEmitter<FormGroup>();
  @Output() deleteButtonClick = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  editMode = false;
  editModeID: string | null = null;

  cakesTableEnum: Record<string, string> = {
    name: 'Nom',
    parts: 'Parts',
    price: 'Prix',
  };

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
    const controls: Record<string, FormControl> = {};
    this.displayedColumns.forEach((column) => {
      if (column !== 'actions') {
        controls[column] = new FormControl('');
      }
    });

    this.formGroup = new FormGroup(controls);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onEdit(id: string) {
    this.editModeID = id;
    this.editMode = true;
    const element = this.dataSource.data.find((item) => item.id === id);
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
}
