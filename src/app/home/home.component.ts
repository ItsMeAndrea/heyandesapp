import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  headers = ['nameAgency', 'totalSales', 'comision', 'detalle'];

  empresas: Array<unknown> = [];

  nombreEmpresas: Array<void> = [];

  rows: Array<unknown> = [];

  dataSource = new MatTableDataSource(this.rows);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getData() {
    this.firebaseService.getEmpresas().subscribe((res) => {
      this.empresas = res;
      this.filterEmpresas();
      this.dataSource.data = this.rows;
      console.log('work');
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

  getMoreSales() {
    const totalSales = this.rows.map((empresa) => empresa.totalSales);

    return Math.max(...totalSales);
  }

  monthWithMoreSales() {
    const meses = this.empresas.map((empresa) => {
      const date = new Date(empresa.datePayment);
      const month = date.getMonth();
      return month;
    });
    const uniqueSet = new Set(meses);
    const uniqueMeses = [...uniqueSet];

    let monthData = [];

    const monthName = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    uniqueMeses.forEach((mes) => {
      const datosPorMes = this.empresas.filter((data) => {
        const dataMeses = new Date(data.datePayment).getMonth();

        return dataMeses === mes;
      });

      const totalMes = datosPorMes
        .map((data) => data.finalPrice)
        .reduce((a, b) => a + b, 0);

      const data = {
        mes,
        totalMes,
      };

      monthData.push(data);
    });

    const mothWithMoreSales = monthData.reduce(
      (a, b) => (a = a > b.totalMes ? a : b.mes),
      0
    );

    return monthName[mothWithMoreSales];
  }

  formatPrices(price: number) {
    const formatedCurrency = new Intl.NumberFormat().format(price);
    return formatedCurrency;
  }
}
