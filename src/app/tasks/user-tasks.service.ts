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
      tid: user.team.id,
      uid: user.uid,
      username: user.displayName,
      photoURL: user.photoURL,
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

  getUserScore(uid: string): AngularFirestoreDocument<UserScore> {
    return this.afs.doc<UserScore>(`userScores/${uid}`);
  }

  approveTask(task: UserTask, team: Team) {
    const userScoreRef = this.getUserScore(task.uid).ref;
    const taskRef = this.getTask(task.id).ref;

    return this.afs.firestore.runTransaction((transaction) => {
      return transaction.get(userScoreRef).then(userScore => {
        const updated = this.timestamp;

        transaction.update(taskRef, {
          status: 'approved',
          updated
        });

        let totalScore = 0;
        let totalTasks = 0;
        let initialData: Partial<UserScore>;

        if (userScore.exists) {
          totalScore = Number(userScore.data().totalScore);
          totalTasks = Number(userScore.data().totalTasks);
        } else {
          initialData = {
            username: task.username,
            photoURL: task.photoURL,
            teamName: team.name,
            teamId: team.id
          };
        }

        totalTasks += 1;
        totalScore += Number(task.points);

        transaction.set(userScoreRef, {
          ...initialData,
          totalScore,
          totalTasks,
          updated
        });
      });
    });
  }
}
