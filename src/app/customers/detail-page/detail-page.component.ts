import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';
import { SeoService } from 'src/app/services/seo.service';
import { CustomerDataService } from '../customer-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  customerId: string;
  customer: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private seo: SeoService,
    public data: CustomerDataService
  ) {}

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');

    // this.customer = this.db
    //   .collection('customers')
    //   .doc<any>(customerId)
    //   .valueChanges()
    this.customer = this.data.getCustomer(this.customerId)
      .pipe(
        tap(cust =>
          this.seo.generateTags({
            title: cust.name,
            description: cust.bio,
            image: cust.image,
          })
        )
      );
  }
}
