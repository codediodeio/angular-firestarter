import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';

@Injectable()
export class UserTasksService {

  userTasksCollection: AngularFirestoreCollection<UserTask>;

  constructor(private afs: AngularFirestore) {
    this.userTasksCollection = this.afs.collection('userTasks');
  }

  getUserTasks(uid: string): Observable<UserTask[]> {
    this.userTasksCollection = this.afs.collection('userTasks', ref => ref.where('uid', '==', uid));
    return this.userTasksCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getMemberTasks(tid: string): Observable<UserTask[]> {
    this.userTasksCollection = this.afs.collection('userTasks', ref =>
      ref.where('tid', '==', tid).where('status', '==', 'pending'));
    return this.userTasksCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getTask(id: string): AngularFirestoreDocument<UserTask> {
    return this.afs.doc<UserTask>(`userTasks/${id}`);
  }

  get timestamp() {
    return firestore.FieldValue.serverTimestamp();
  }

  addUserTask(user: User, task: Task) {
    return this.userTasksCollection.doc(user.uid + task.id).set({
      ...task,
      id: user.uid + task.id,
      uid: user.uid,
      tid: user.team.id,
      status: 'ongoing',
      created: this.timestamp,
      updated: this.timestamp
    });
  }

  finishTask(id: string) {
    return this.getTask(id).update({
      status: 'pending',
      updated: this.timestamp
    });
  }

  approveTask(uid: string, taskId: string) {
    return this.getTask(uid + taskId).update({
      status: 'approved',
      updated: this.timestamp
    });
  }
}
