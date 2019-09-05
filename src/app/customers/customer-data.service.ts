import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  customers = null;
  subscription;

  subscribeToCustomers() {
    if (!this.customers) {
      this.subscription = this.db.collection('customers').valueChanges({idField: 'id'})
      .subscribe(customers =>  {
        this.customers = customers;
      });
    }
  }

  getCustomer(id: string) {
    if (this.customers) {
      const cached = this.customers.find(v => v.id === id);
      console.log('use cached');
      return of(cached);
    } else {
      console.log('use db');
      return this.db.collection('customers').doc(id).valueChanges();
    }

  }

  dispose() {
    this.subscription.unsubscribe();
    this.customers = null;
  }



  constructor(private db: AngularFirestore) { }
}
