import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { flatMap, map, first } from 'rxjs/operators';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  seasonsCollection: AngularFirestoreCollection<Season>;
  seasonDocument: AngularFirestoreDocument<Season>;

  constructor(private afs: AngularFirestore) {
    this.seasonsCollection = this.afs.collection('seasons', (ref) => ref.orderBy('created', 'asc'));
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
    return this.afs.doc<Season>(`seasons/${id}`);
  }

  createSeason(name: string, user: Partial<User>) {
    return this.seasonsCollection.add({
      name,
      created: this.timestamp,
      updated: this.timestamp,
      enabled: false,
      created_by: user,
      updated_by: user
    });
  }

  // Returns enabled season id
  getEnabledSeason(): Observable<string> {
    const enabledSeasonQuery = this.afs.collection<Season>(
      'seasons', ref => ref.where('enabled', '==', true).limit(1));

    return enabledSeasonQuery.snapshotChanges().pipe(
      first(),
      map((actions) => actions[0].payload.doc.id)
    );
  }

  // Enables a season while also disabling currently enabled season
  enableSeason(id: string, user: Partial<User>): Observable<void> {
    const batch = this.afs.firestore.batch();

    return this.getEnabledSeason().pipe(
      flatMap((enabledSeasonId: string) => {
        // disable currently enabled season
        batch.update(this.getSeason(enabledSeasonId).ref, {
          enabled: false,
          updated: this.timestamp,
          updated_by: user
        });
        // enable new season
        batch.update(this.getSeason(id).ref, {
          enabled: true,
          updated: this.timestamp,
          updated_by: user
        });
        return batch.commit();
      })
    );
  }

  get timestamp() {
    return firestore.FieldValue.serverTimestamp();
  }
}
