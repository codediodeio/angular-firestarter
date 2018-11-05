import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';

@Injectable()
export class LeaderboardService {

  userCollection: AngularFirestoreCollection<UserScore>;

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection('userScores', ref =>
      ref.orderBy('totalScore', 'desc').orderBy('updated', 'asc').limit(10));
  }

  getTopUsers(): Observable<UserScore[]> {
    return this.userCollection.snapshotChanges().pipe(
      map((actions) => actions.map((a) => a.payload.doc.data()))
    );
  }
}
