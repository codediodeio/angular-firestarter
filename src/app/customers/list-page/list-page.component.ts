import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';
import { CustomerDataService } from '../customer-data.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  customers;

  constructor(private seo: SeoService, private db: AngularFirestore, public data: CustomerDataService) {}

  ngOnInit() {
    this.seo.generateTags({
      title: 'Customer List',
      description: 'A list filled with customers'
    });

    // this.customers = this.db.collection('customers').valueChanges({ idField: 'id' });

    this.data.subscribeToCustomers();
  }
}
