import { Component, OnInit } from '@angular/core';
import { Cakes } from '../../models/cakes.interface';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-cakes',
  imports: [CommonModule, TableComponent, ModalComponent],
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnInit {
  apiData: MatTableDataSource<Cakes> = new MatTableDataSource<Cakes>([]);
  addCakeModal = false;

  constructor(private cakesService: ApiService) {}

  ngOnInit(): void {
    this.getAllCakes();
  }

  getAllCakes(): void {
    this.cakesService.getCakes().subscribe((response: Cakes[]) => {
      this.apiData = new MatTableDataSource<Cakes>(response);
    });
  }
}
