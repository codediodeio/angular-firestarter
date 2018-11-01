interface Task {
  id?: string;
  name: string;
  points: number;
  description?: string;
  status?: 'pending' | 'approved';
}

interface TaskDone {
  id?: string;
  uid: string;
  task: Task;
  status: 'pending' | 'approved';
  createdAt: firebase.firestore.FieldValue;
  updatedAt: firebase.firestore.FieldValue;
}
