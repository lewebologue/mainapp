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
  FormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonComponent } from '../../components/button/button.component';
import { MatInputModule } from '@angular/material/input';
import { CakesService } from '../../services/cakes.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cakes',
  imports: [
    CommonModule,
    TableComponent,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
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
  #toastr = inject(ToastrService);

  apiData: MatTableDataSource<Cakes> = new MatTableDataSource<Cakes>([]);

  addCakeControlGroup = this.#formBuilder.group({
    name: ['', Validators.required],
    parts: [0, Validators.required],
    price: [0, Validators.required],
    color: ['#F5F5F5', Validators.required],
  });

  editCakeControlGroup = this.#formBuilder.group({
    name: [''],
    parts: [0],
    price: [0],
    color: ['#F5F5F5'],
  });

  cakeColorOptions = [
    { value: '#F5F5F5', label: 'Blanc' },
    { value: '#7E6A59', label: 'Marron clair' },
    { value: '#473822', label: 'Marron' },
    { value: '#753800', label: 'Chocolat' },
    { value: '#11734B', label: 'Vert' },
    { value: '#7FAD8B', label: 'Vert sauge' },
    { value: '#F1BD31', label: 'Jaune' },
    { value: '#B19E3A', label: 'Jaune moutarde amora' },
    { value: '#5A3286', label: 'Violet' },
    { value: '#C5A0A0', label: 'Rose poudrée' },
    { value: '#0362F1', label: 'Bleu roi' },
    { value: '#BFE1F6', label: 'Bleu ciel' },
  ];

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
        id: '',
        name: this.addCakeControlGroup.value.name ?? '',
        parts: this.addCakeControlGroup.value.parts ?? 0,
        price: this.addCakeControlGroup.value.price ?? 0,
        color: this.addCakeControlGroup.value.color ?? '#F5F5F5',
      };
      this.#cakesService
        .createCake(cakeData)
        .subscribe(() => this.getAllCakes());
    }
  }

  deleteCake(id: string) {
    this.#cakesService.deleteCake(id).subscribe(() => {
      this.#toastr.success('Gâteau supprimé');
      this.getAllCakes();
    });
  }

  editCake(data: FormGroup) {
    const editCakeData: Cakes = {
      id: data.value.id,
      name: data.value.name,
      parts: parseInt(data.value.parts),
      price: parseInt(data.value.price),
      color: data.value.color,
    };
    this.#cakesService
      .updateCake(data.value.id, editCakeData)
      .pipe(
        catchError((error) => {
          this.#toastr.error('Erreur lors de la modification du gâtal');
          console.error('Erreur:', error);
          return of([]);
        }),
      )
      .subscribe(() => {
        this.#toastr.success('Gâteau Modifié');
        this.getAllCakes();
      });
  }
}
