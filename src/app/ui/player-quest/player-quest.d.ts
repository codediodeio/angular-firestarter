declare const enum QuestStatus {
  TODO = 'todo',
  PENDING_APPROVAL = 'pending',
  COMPLETED = 'completed'
}

declare const enum QuestCategories {
  INFOR_SPECIFIC = 'Core - Infor Specific',
  SOFT_SKILL = 'Core - Soft Skill',
  TECHNICAL = 'Product Specific - Technical',
  FUNCTIONAL = 'Product Specific - Functional',
  CERTIFICATION = 'Certification'
}

interface PlayerQuest {
  id?: string;
  seasonId: string;
  playerId: string;
  playerName: string;
  playerEmail: string;
  teamId: string;
  status: QuestStatus;
  created?: firebase.firestore.Timestamp;
  updated?: firebase.firestore.Timestamp;
  submitted?: firebase.firestore.Timestamp;
  completed?: firebase.firestore.Timestamp;
  completionProof?: string; // link to screenshot?
  questName: string;
  source: string;  // e.g. LMS
  required: boolean; // true = 10 points granted, else 5 points
  category: QuestCategories;
}
