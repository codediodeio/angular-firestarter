interface User {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL?: string;
  team?: Team;
}

interface UserScore {
  id: string;
  username: string;
  photoURL: string;
  teamId: string;
  teamName: string;
  totalScore: number;
  totalTasks: number;
  updated: firebase.firestore.FieldValue;
}
