import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(public db: AngularFirestore) {}

  createEmpresas(data: any) {
    return this.db.collection('empresas').add({
      nameAgency: data.nameAgency ? data.nameAgency : '',
      createdAt: data.createdAt ? data.createdAt : '',
      hour: data.hour ? data.hour : '',
      timeZone: data.timeZone ? data.timeZone : '',
      datePayment: data.datePayment ? data.datePayment : '',
      finalPrice: data.finalPrice ? data.finalPrice : '',
      name: data.name ? data.name : '',
      totalPrice: data.totalPrice ? data.totalPrice : '',
      paymentStatus: data.paymentStatus,
      day: data.day ? data.day : '',
      persons: data.persons ? data.persons : '',
      wayToPay: data.wayToPay ? data.wayToPay : '',
      status: data.status ? data.status : '',
    });
  }

  getEmpresas() {
    return this.db.collection('/empresas').valueChanges();
  }

  getEmpresasByName(name: string) {
    return this.db
      .collection('empresas', (ref) => ref.where('nameAgency', '==', name))
      .valueChanges();
  }
}
