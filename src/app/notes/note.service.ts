import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Note {
  content: string;
  hearts?: number;
  id?: any;
}

@Injectable()
export class NoteService {

  notesCollection: AngularFirestoreCollection<Note>;
  noteDocument:   AngularFirestoreDocument<Node>

  constructor(private afs: AngularFirestore) {
    this.notesCollection = this.afs.collection('notes', ref => ref.orderBy('hearts') )
    this.noteDocument = this.afs.doc('notes/mtp1Ll6caN4dVrhg8fWD');
  }

  getData(): Observable<Note[]> {
    return this.notesCollection.valueChanges();
  }

  getSnapshot() {
    // ['added', 'modified', 'removed']
    return this.notesCollection.snapshotChanges().map(actions => {
      console.log(actions)
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
      hearts: 0
    }
    return this.notesCollection.add(note);
  }


}
