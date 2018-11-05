interface User {
  uid: string;
  email: string | null;
  photoURL: string;
  displayName: string;
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
