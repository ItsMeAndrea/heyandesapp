import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  nombre_empresa = this.activatedRoute.snapshot.params.nombre_empresa;

  headers = ['Nombre cliente', 'Personas', 'Día', 'Hora', 'Valor venta'];

  empresaData: Array<unknown> = [];

  rows: Array<unknown> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log('reload on getdata');
    this.firebaseService
      .getEmpresasByName(this.nombre_empresa)
      .subscribe((res) => {
        this.empresaData = res;
        this.rows = [];
        this.orderData();
      });
  }

  orderData() {
    this.empresaData.forEach((data) => {
      const rowData = {
        name: data.name,
        persons: data.persons,
        day: data.day,
        hour: data.hour,
        finalPrice: data.finalPrice,
      };

      this.rows.push(rowData);
    });
  }
}
