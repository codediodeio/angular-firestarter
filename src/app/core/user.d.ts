interface User {
  uid: string;
  email: string | null;
  photoURL: string;
  displayName: string;
  team?: Team;
}
