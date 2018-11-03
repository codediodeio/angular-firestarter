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

  getUser(uid: string): AngularFirestoreDocument<User> {
    return this.afs.doc<User>(`users/${uid}`);
  }

  get timestamp() {
    return firestore.FieldValue.serverTimestamp();
  }

  addUserTask(user: User, task: Task) {
    return this.userTasksCollection.doc(user.uid + task.id).set({
      ...task,
      id: user.uid + task.id,
      tid: user.team.id,
      uid: user.uid,
      username: user.displayName,
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

  approveTask(task: UserTask) {
    const userRef = this.getUser(task.uid).ref;
    const taskRef = this.getTask(task.id).ref;

    return this.afs.firestore.runTransaction((transaction) => {
      return transaction.get(userRef).then(user => {
        transaction.update(taskRef, {
          status: 'approved',
          updated: this.timestamp
        });

        let totalScore = <number>(user.data().totalScore || 0);
        totalScore += task.points;

        transaction.update(userRef, {
          totalScore,
          updatedScore: this.timestamp
        });
      });
    });
  }
}
