import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class PlayerQuestService {

  playerQuestsCollection: AngularFirestoreCollection<PlayerQuest>;

  constructor(private afs: AngularFirestore) {
    this.playerQuestsCollection = this.afs.collection('playerQuests');
  }

  /**
   * Create a quest for player
   * @param {PlayerQuest} quest all quest info
   */
  assignPlayerQuest(quest: PlayerQuest) {
    return this.playerQuestsCollection.add({
      ...quest,
      created: Timestamp.now()
    });
  }

  /**
   * Get Quest info from given id
   * @param  {string}                                id quest id
   * @return {AngularFirestoreDocument<PlayerQuest>}    observable quest info
   */
  getQuest(id: string): AngularFirestoreDocument<PlayerQuest> {
    return this.afs.doc<PlayerQuest>(`playerQuests/${id}`);
  }

  /**
   * Submit quest for team lead approval
   * @param {string} id              quest id
   * @param {Date}   completed       date completed
   * @param {string} completionProof link to completion proof
   */
  submitQuest(id: string, completed: Date, completionProof: string) {
    return this.getQuest(id).update({
      status: QuestStatus.PENDING_APPROVAL,
      submitted: Timestamp.now(),
      completed: Timestamp.fromDate(completed),
      completionProof
    });
  }

  private mapPlayerQuestData(actions: any[]): PlayerQuest[] {
    return actions.map((a) => {
      const data = a.payload.doc.data();
      return <PlayerQuest>{ id: a.payload.doc.id, ...data };
    });
  }

  /**
   * Get all quests of a team member
   * @param  {string}                    seasonId season's id
   * @param  {string}                    teamId   team's id
   * @param  {string}                    playerId player's user id
   * @return {Observable<PlayerQuest[]>}          observable array of player quests
   */
  getMemberQuests(seasonId: string, teamId: string, playerId: string): Observable<PlayerQuest[]> {
    this.playerQuestsCollection =
      this.afs.collection('playerQuests', ref => ref
        .where('seasonId', '==', seasonId)
        .where('teamId', '==', teamId)
        .where('playerId', '==', playerId));

    return this.playerQuestsCollection.snapshotChanges().pipe(
      map((actions) => this.mapPlayerQuestData(actions))
    );
  }

  /**
   * Gets all quests awaiting approval from team members
   * @param  {string}                    seasonId season's id
   * @param  {string}                    teamId team's id
   * @return {Observable<PlayerQuest[]>}        observable array of player quests
   */
  getAllMemberSubmittedQuests(seasonId: string, teamId: string): Observable<PlayerQuest[]> {
    this.playerQuestsCollection =
      this.afs.collection('playerQuests', ref => ref
        .where('seasonId', '==', seasonId)
        .where('teamId', '==', teamId)
        .where('status', '==', QuestStatus.PENDING_APPROVAL));

    return this.playerQuestsCollection.snapshotChanges().pipe(
      map((actions) => this.mapPlayerQuestData(actions))
    );
  }

  /**
   * Revert quest's status back to todo
   * @param {Partial<PlayerQuest>} quest all quest info
   */
  rejectQuest(quest: Partial<PlayerQuest>) {
    return from(this.getQuest(quest.id).update({
      status: QuestStatus.TODO
    }));
  }

  /**
   * Returns a playerPoints firestore document reference
   * @param  {string}                                 id playerpoints id (season id + player id)
   * @return {AngularFirestoreDocument<PlayerPoints>}    player points info reference
   */
  getPlayerPoints(id: string): AngularFirestoreDocument<PlayerPoints> {
    return this.afs.doc<PlayerPoints>(`playerPoints/${id}`);
  }

  /**
   * Change quest's status to completed and update player's total points
   * @param {Partial<PlayerQuest>} quest all quest info
   */
  approveQuest(quest: Partial<PlayerQuest>) {
    const playerPointsRef = this.getPlayerPoints(quest.seasonId + quest.playerId).ref;
    const questRef = this.getQuest(quest.id).ref;

    const trans = this.afs.firestore.runTransaction((transaction) => {
      return transaction.get(playerPointsRef).then(playerPoints => {
        const updated = Timestamp.now();

        transaction.update(questRef, {
          status: QuestStatus.COMPLETED,
          updated
        });

        let totalPoints = 0;
        let totalQuests = 0;
        let initialData: Partial<PlayerPoints>;

        if (playerPoints.exists) {
          totalPoints = Number(playerPoints.data().totalPoints);
          totalQuests = Number(playerPoints.data().totalQuests);
        } else {
          initialData = {
            seasonId: quest.seasonId,
            playerId: quest.playerId,
            playerName: quest.playerName,
            teamId: quest.teamId
          };
        }

        totalQuests += 1;
        // Fixed points where required quest is 10 else 5
        totalPoints += quest.required ? 10 : 5;

        transaction.set(playerPointsRef, {
          ...initialData,
          totalPoints,
          totalQuests,
          updated
        }, { merge: true });
      });
    });

    return from(trans);
  }
}
