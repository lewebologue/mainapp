import { Component, inject, OnInit } from '@angular/core';
import { Cakes } from '../../models/cakes.interface';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonComponent } from '../../components/button/button.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cakes',
  imports: [
    CommonModule,
    TableComponent,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.scss'],
})
export class CakesComponent implements OnInit {
  #formBuilder = inject(FormBuilder);
  apiData: MatTableDataSource<Cakes> = new MatTableDataSource<Cakes>([]);
  addCakeModal = false;

  addCakeControlGroup = this.#formBuilder.group({
    name: ['', Validators.required],
    parts: [0, Validators.required],
    price: [0, Validators.required],
  });

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
