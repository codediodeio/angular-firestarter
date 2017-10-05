import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Note {
  content: string;
  hearts?: number;
  id?: any;
  time?: number;
}

@Injectable()
export class NoteService {

  notesCollection: AngularFirestoreCollection<Note>;
  noteDocument:   AngularFirestoreDocument<Node>

  constructor(private afs: AngularFirestore) {
    this.notesCollection = this.afs.collection('notes', ref => ref.orderBy('time', 'desc').limit(5) )
    // this.noteDocument = this.afs.doc('notes/mtp1Ll6caN4dVrhg8fWD');
  }

  getData(): Observable<Note[]> {
    return this.notesCollection.valueChanges();
  }

  getSnapshot() {
    // ['added', 'modified', 'removed']
    return this.notesCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        return { id: a.payload.doc.id, ...a.payload.doc.data() }
      })
    })
  }

  getNote(id) {
    return this.afs.doc<Note>('notes/' + id);
  }

  create(content: string) {
    const note: Note = {
      content: content,
      hearts: 0,
      time: new Date().getTime()
    }
    return this.notesCollection.add(note);
  }

  updateNote(id, data) {
    return this.getNote(id).update(data)
  }

  deleteNote(id) {
    return this.getNote(id).delete()
  }


}
