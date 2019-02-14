import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TeamsService {

  teamsCollection: AngularFirestoreCollection<Team>;
  teamApplicationsCollection: AngularFirestoreCollection<TeamApplication>;
  teamDocument:   AngularFirestoreDocument<Team>;

  constructor(private afs: AngularFirestore) {
    this.teamsCollection = this.afs.collection('teams');
    this.teamApplicationsCollection = this.afs.collection('teamApplications');
  }

  getData(): Observable<Team[]> {
    return this.teamsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }


  // Team
  getTeam(id: string) {
    return this.afs.doc<Team>(`teams/${id}`);
  }

  updateteam(id: string, data: any) {
    return this.getTeam(id).update(data);
  }

  deleteteam(id: string) {
    return this.getTeam(id).delete();
  }

  getTeamLead(team: Team): Observable<User> {
    return this.afs.doc<User>(`users/${team.lead}`).valueChanges();
  }

  getUser(uid: string): AngularFirestoreDocument<User> {
    return this.afs.doc<User>(`users/${uid}`);
  }

  setUserTeam(uid: string, team: Team) {
    return this.getUser(uid).update({ team });
  }

  // Team Applications
  getTeamApplication(id: string) {
    return this.afs.doc<TeamApplication>(`teamApplications/${id}`);
  }

  addTeamApplication(uid: string, teamId: string) {
    return this.teamApplicationsCollection.doc(uid).set({
      id: uid,
      teamId: teamId
    });
  }

  removeTeamApplication(uid: string) {
    return this.getTeamApplication(uid).delete();
  }
}
