import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TasksService {

  tasksCollection: AngularFirestoreCollection<Task>;

  constructor(private afs: AngularFirestore) {
    this.tasksCollection = this.afs.collection('tasks');
  }

  searchTasks(keyword: string): Observable<Task[]> {
    this.tasksCollection = this.afs.collection('tasks', ref =>
      ref.orderBy('name')
        .limit(5)
        .startAt(keyword.toUpperCase())
        .endAt(`${keyword.toLowerCase()}\uf8ff`));

    return this.tasksCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getTask(id: string): AngularFirestoreDocument<Task> {
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
