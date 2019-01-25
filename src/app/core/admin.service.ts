import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AdminService {
  constructor(private afs: AngularFirestore) {}

  getAdmin(uid: string): Observable<Admin> {
    return this.afs.doc<Admin>(`admin_users/${uid}`).valueChanges();
  }
}
