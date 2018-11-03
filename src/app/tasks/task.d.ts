interface Task {
  id?: string;
  name: string;
  points: number;
  description?: string;
}

interface UserTask extends Task {
  tid: string;
  uid: string;
  username: string;
  status: TaskStatus;
  created: firebase.firestore.FieldValue;
  updated: firebase.firestore.FieldValue;
}

type TaskStatus = 'ongoing' | 'pending' | 'approved';
