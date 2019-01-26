interface Season {
  id?: string;
  name: string;
  enabled: boolean;
  created: firebase.firestore.FieldValue;
  created_by: Partial<User>;
  updated: firebase.firestore.FieldValue;
  updated_by: Partial<User>;
}
