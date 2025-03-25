import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  Client: string;
  nb_pieces: number;
  total: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Client: 'Hydrogen', nb_pieces: 1.0079, total: 'H'},
  {Client: 'Helium', nb_pieces: 4.0026, total: 'He'},
  {Client: 'Lithium', nb_pieces: 6.941, total: 'Li'},
  {Client: 'Beryllium', nb_pieces: 9.0122, total: 'Be'},
  {Client: 'Boron', nb_pieces: 10.811, total: 'B'},
  {Client: 'Carbon', nb_pieces: 12.0107, total: 'C'},
  {Client: 'Nitrogen', nb_pieces: 14.0067, total: 'N'},
  {Client: 'Oxygen', nb_pieces: 15.9994, total: 'O'},
  {Client: 'Fluorine', nb_pieces: 18.9984, total: 'F'},
  {Client: 'Neon', nb_pieces: 20.1797, total: 'Ne'},
];

@Component({
  selector: 'app-table',
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  displayedColumns: string[] = ['Client', 'nb_pieces', 'total'];
  dataSource = ELEMENT_DATA;
}
