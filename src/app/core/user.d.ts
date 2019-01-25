interface Admin {
  uid: string;
}

interface User {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL?: string;
  team?: Team;
  isMicrosoft?: boolean;
  isAdmin?: boolean;
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
