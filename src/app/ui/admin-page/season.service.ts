import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  seasonsCollection: AngularFirestoreCollection<Season>;
  seasonDocument: AngularFirestoreDocument<Season>;

  constructor(private afs: AngularFirestore) {
    this.seasonsCollection = this.afs.collection('seasons', (ref) => ref.orderBy('updated', 'desc'));
  }

  getData(): Observable<Season[]> {
    // ['added', 'modified', 'removed']
    return this.seasonsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return <Season>{ id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getSeason(id: string) {
    return this.afs.doc<any>(`seasons/${id}`);
  }

  createSeason(name: string, user: User) {
    const season = {
      name,
      created: this.timestamp,
      updated: this.timestamp,
      enabled: false,
      created_by: user,
      updated_by: user
    };
    return this.seasonsCollection.add(season);
  }

  disableAllSeasons(user: User) {
    const batch = this.afs.firestore.batch();
    const seasonsCollection = this.afs.collection('seasons', ref => ref.where('enabled', '==', true));

    return seasonsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => batch.update(a.payload.doc.ref, {
          enabled: false,
          updated: this.timestamp,
          updated_by: user
        }));
      }),
      flatMap(() => batch.commit())
    );
  }

  enableSeason(id: string, user: User) {
    return this.disableAllSeasons(user).pipe(
      flatMap(() =>
        this.getSeason(id).update({
          enabled: true,
          updated: this.timestamp,
          updated_by: user
        })
      )
    );
  }

  get timestamp() {
    return firestore.FieldValue.serverTimestamp();
  }
}
