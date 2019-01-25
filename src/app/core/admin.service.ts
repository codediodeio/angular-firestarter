import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AdminService {
  constructor(private afs: AngularFirestore) {}

  isAdmin(uid: string): Observable<boolean> {
    return this.afs.doc<Admin>(`admin_users/${uid}`)
    .valueChanges().pipe(
      map((admin: Admin) => admin ? admin.uid === uid : false)
    );
  }
}
