import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { empty, from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { PlayerQuestService } from '../player-quest/player-quest.service';
import { EmailService } from '../../core/email.service';
import { NotifyService } from '../../core/notify.service';
import { SeasonService } from '../../core/season.service';
import { QuestApprovalDialogComponent } from './quest-approval-dialog.component';

@Component({
  selector: 'members-quest-approval',
  templateUrl: './members-quest-approval.component.html',
  styleUrls: ['./members-quest-approval.component.scss']
})
export class MembersQuestApprovalComponent implements OnInit {

  memberSubmittedQuests$: Observable<PlayerQuest[]>;

  readonly displayedColumns = [
    'name',
    'submitted_by',
    'completed',
    'required',
  ];

  constructor(
    private email: EmailService,
    private dialog: MatDialog,
    private notify: NotifyService,
    private playerQuest: PlayerQuestService,
    private season: SeasonService) {}

  async ngOnInit() {
    const seasonId = await this.season.getEnabledSeasonId().toPromise();
    // todo: replace with fetching the id from teams service
    const teamId = 'puNEPCHmYcPCHjObMg6H';
    this.memberSubmittedQuests$ = this.playerQuest.getAllMemberSubmittedQuests(seasonId, teamId);
  }

  openDialog(quest: PlayerQuest) {
    const dialogRef = this.dialog.open(QuestApprovalDialogComponent, { data: quest });
    let action;

    dialogRef.afterClosed().pipe(
      flatMap(result => {
        action = result;
        if (result === 'approved') {
          return this.playerQuest.approveQuest(quest);
        }

        if (result === 'rejected') {
          return this.playerQuest.rejectQuest(quest);
        }

        return empty();
      }),
      flatMap(() => {
        const status = action === 'approved' ? 'success' : 'error';
        this.notify.update(`${quest.questName} by ${quest.playerName} is ${action}!`, status);
        return this.email.sendEmail(
          quest.playerEmail,
          `Your quest: ${quest.questName} is ${action}!`,
          `Your quest: ${quest.questName} is ${action}!`);
      })
    ).subscribe((res) => console.log(res));
  }
}
