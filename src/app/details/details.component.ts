import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
  nombre_empresa = this.activatedRoute.snapshot.params.nombre_empresa;

  headers = ['name', 'persons', 'day', 'hour', 'finalPrice'];

  empresaData: Array<unknown> = [];

  rows: Array<unknown> = [];

  dataSource = new MatTableDataSource(this.rows);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getData() {
    console.log('reload on getdata');
    this.firebaseService
      .getEmpresasByName(this.nombre_empresa)
      .subscribe((res) => {
        this.empresaData = res;
        this.rows = [];
        this.orderData();
        this.dataSource.data = this.rows;
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

  formatPrices(price: number) {
    const formatedCurrency = new Intl.NumberFormat().format(price);
    return formatedCurrency;
  }
}
