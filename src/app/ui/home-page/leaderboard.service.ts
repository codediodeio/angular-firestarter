import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';

@Injectable()
export class LeaderboardService {

  userCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection('users', ref =>
      ref.orderBy('totalScore', 'desc').orderBy('updatedScore', 'asc').limit(10));
  }

  getTopUsers() {
    return this.userCollection.snapshotChanges().pipe(
      map((actions) => actions.map((a) => a.payload.doc.data()))
    );
  }
}
