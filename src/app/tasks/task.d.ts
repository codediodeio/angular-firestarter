type TaskStatus = 'ongoing' | 'pending' | 'approved';

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
  photoURL: string;
  teamName: string;
  status: TaskStatus;
  created: firebase.firestore.FieldValue;
  updated: firebase.firestore.FieldValue;
}
