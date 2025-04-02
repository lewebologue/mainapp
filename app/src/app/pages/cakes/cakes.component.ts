import { Component, inject, OnInit } from '@angular/core';
import { Cakes } from '../../models/cakes.interface';
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
import { CakesService } from '../../services/cakes.service';

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
  #cakesService = inject(CakesService);
  #formBuilder = inject(FormBuilder);

  apiData: MatTableDataSource<Cakes> = new MatTableDataSource<Cakes>([]);

  addCakeControlGroup = this.#formBuilder.group({
    name: ['', Validators.required],
    parts: [0, Validators.required],
    price: [0, Validators.required],
  });

  ngOnInit(): void {
    this.getAllCakes();
  }

  getAllCakes(): void {
    this.#cakesService.getCakes().subscribe((response: Cakes[]) => {
      this.apiData = new MatTableDataSource<Cakes>(response);
    });
  }

  createCake() {
    if (this.addCakeControlGroup.valid) {
      const cakeData: Cakes = {
        name: this.addCakeControlGroup.value.name ?? '',
        parts: this.addCakeControlGroup.value.parts ?? 0,
        price: this.addCakeControlGroup.value.price ?? 0,
      };
      this.#cakesService
        .createCake(cakeData)
        .subscribe(() => this.getAllCakes());
    }
  }
}
