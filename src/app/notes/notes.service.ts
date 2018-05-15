import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NotesService {

  notesCollection: AngularFirestoreCollection<any>;
  noteDocument:   AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) {
    this.notesCollection = this.afs.collection('notes', (ref) => ref.orderBy('time', 'desc').limit(5));
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.notesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getNote(id: string) {
    return this.afs.doc<any>(`notes/${id}`);
  }

  createNote(content: string) {
    const note = {
      content,
      hearts: 0,
      time: new Date().getTime(),
    };
    return this.notesCollection.add(note);
  }

  updateNote(id: string, data: any) {
    return this.getNote(id).update(data);
  }

  deleteNote(id: string) {
    return this.getNote(id).delete();
  }
}
