interface Team {
  id: string;
  name: string;
  lead?: string;
  memberCount: number;
}

interface TeamApplication {
  id: string;
  uid: string;
  teamId: string;
}
