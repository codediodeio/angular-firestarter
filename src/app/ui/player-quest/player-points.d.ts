interface PlayerPoints {
  seasonId: string;
  playerId: string;
  playerName: string;
  teamId: string;
  totalPoints: number;
  totalQuests: number;
  updated: firebase.firestore.FieldValue;
}
