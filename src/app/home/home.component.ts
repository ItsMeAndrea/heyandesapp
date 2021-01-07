import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  headers = ['Nombre empresa', 'Total ventas', 'Comisión', 'Detalle'];

  empresas: Array<unknown> = [];

  nombreEmpresas: Array<void> = [];

  rows: Array<unknown> = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.firebaseService.getEmpresas().subscribe((res) => {
      this.empresas = res;
      this.filterEmpresas();
    });
  }

  filterEmpresas() {
    this.nombreEmpresas = this.empresas.map((empresa) => empresa.nameAgency);
    const uniqueSet = new Set(this.nombreEmpresas);
    const uniqueNombres = [...uniqueSet];

    uniqueNombres.forEach((nombre) => {
      const empresa = this.empresas.filter(
        (empresa) => empresa.nameAgency === nombre
      );
      const finalPrice = empresa.map((empresa) => empresa.finalPrice);

      const totalSales = finalPrice.reduce((a, b) => a + b, 0);

      const comision = totalSales * 0.025;

      const rowData = {
        nameAgency: nombre,
        totalSales,
        comision,
      };

      this.rows.push(rowData);
    });
  }
}
