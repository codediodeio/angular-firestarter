import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TasksService {

  tasksCollection: AngularFirestoreCollection<Task>;
  taskDocument:   AngularFirestoreDocument<Task>;

  constructor(private afs: AngularFirestore) {
    this.tasksCollection = this.afs.collection('tasks');
  }

  getData(): Observable<Task[]> {
    // ['added', 'modified', 'removed']
    return this.tasksCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getTask(id: string) {
    return this.afs.doc<Task>(`tasks/${id}`);
  }

  createTask(task: Task) {
    return this.tasksCollection.add(task);
  }

  updatetask(id: string, data: Task) {
    return this.getTask(id).update(data);
  }

  deletetask(id: string) {
    return this.getTask(id).delete();
  }
}
