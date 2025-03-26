import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CakesResponse } from '../../models/cakes.interface';

@Component({
  selector: 'app-cakes',
  imports: [],
  templateUrl: './cakes.component.html',
  styleUrl: './cakes.component.scss'
})
export class CakesComponent implements OnInit {
  constructor(private cakesService: ApiService) { }

  ngOnInit() {
    this.cakesService.getCakes().subscribe((data: CakesResponse) => {
      console.log(data);
    });
  }
}
