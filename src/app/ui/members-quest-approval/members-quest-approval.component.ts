import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PlayerQuestService } from '../player-quest/player-quest.service';
import { NotifyService } from '../../core/notify.service';
import { SeasonService } from '../../core/season.service';

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
    private notify: NotifyService,
    private playerQuest: PlayerQuestService,
    private season: SeasonService) {}

  async ngOnInit() {
    const seasonId = await this.season.getEnabledSeasonId().toPromise();
    // todo: replace with fetching the id from teams service
    const teamId = 'puNEPCHmYcPCHjObMg6H';
    this.memberSubmittedQuests$ = this.playerQuest.getAllMemberSubmittedQuests(seasonId, teamId);
  }

  selectRow(quest: PlayerQuest) {
    console.log(quest);
    this.notify.update(quest.playerName, 'success');
  }
}
