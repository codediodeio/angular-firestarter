import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';

@Injectable()
export class TasksService {

  tasksCollection: AngularFirestoreCollection<Task>;
  tasksDoneCollection: AngularFirestoreCollection<TaskDone>;

  constructor(private afs: AngularFirestore) {
    this.tasksCollection = this.afs.collection('tasks');
    this.tasksDoneCollection = this.afs.collection('tasksDone');
  }

  getAllTasks(): Observable<Task[]> {
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

  get timestamp() {
    return firestore.FieldValue.serverTimestamp();
  }

  finishTask(uid: string, task: Task) {
    return this.tasksDoneCollection.add({
      uid,
      task,
      status: 'pending',
      createdAt: this.timestamp,
      updatedAt: this.timestamp
    });
  }

  getTasksDone(uid: string) {
    this.tasksDoneCollection = this.afs.collection('tasksDone', ref => ref.where('uid', '==', uid));
    return this.tasksDoneCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  approveTask(user: AngularFirestoreDocument<User>, taskDone: TaskDone) {
    return this.afs.firestore.runTransaction(transaction => {
      return transaction.get(user.ref).then((res) => {
        if (!res.exists) {
          throw new Error('Document does not exist!');
        }

        const userData = <User>{
          uid: res.id,
          ...res.data()
        };
        const totalScore = userData.totalScore + taskDone.task.points;
        const totalTasksDone = userData.totalTasksDone + 1;

        // Update user score, etc.
        transaction.update(user.ref, {
          totalScore,
          totalTasksDone,
          updatedScore: this.timestamp
        });
        // Update task's status
        transaction.update(this.getTask(taskDone.id).ref, { status: 'approved' });
      });
    });
  }
}
