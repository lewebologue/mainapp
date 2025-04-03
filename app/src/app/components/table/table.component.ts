import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
  SimpleChanges, Output, EventEmitter,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cakes } from '../../models/cakes.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ButtonComponent } from '../button/button.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    ButtonComponent,
    MatIconModule,
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
  @Output() editButtonClick = new EventEmitter<string>();
  @Output() deleteButtonClick = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  cakesTableEnum: Record<string, string> = {
    name: 'Nom',
    parts: 'Parts',
    price: 'Prix',
  };

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onEdit(id: string) {
    this.editButtonClick.emit(id);
  }

  onDelete(id: string) {
    this.deleteButtonClick.emit(id);
  }
}
