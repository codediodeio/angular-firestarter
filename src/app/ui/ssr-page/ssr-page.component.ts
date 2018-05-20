import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AngularFirestore } from 'angularfire2/firestore';

import { tap, startWith } from 'rxjs/operators';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const DATA = makeStateKey<any>('animals');

@Component({
  selector: 'ssr-page',
  templateUrl: './ssr-page.component.html',
  styleUrls: ['./ssr-page.component.scss']
})
export class SsrPageComponent implements OnInit {

  animals;

  constructor(
    private afs: AngularFirestore,
    private meta: Meta,
    private titleService: Title,
    private state: TransferState
  ) { }

  ngOnInit() {
   // set metatags for twitter
   this.setMetaTags();

    // Get the animals from the database
    const animals$ = this.afs.collection('animals').valueChanges();

    // If state is available, start with it your observable
    const exists = this.state.get(DATA, [] as any);
    if (!exists.length) {
      animals$.pipe(
        tap(list => {
          this.state.set(DATA, list);
          this.animals = list;
        })
      )
      .subscribe();
    } else {
      this.animals = exists;
    }


  }

  setMetaTags() {
    this.titleService.setTitle('Angular Firebase Animals');

    // Set meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@angularfirebase' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Angular Firebase Animals' });
    this.meta.updateTag({ name: 'twitter:description', content: 'A server-rendered list of animals from Cloud Firestore in Angular' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://goo.gl/MzskMe'});
  }

}
