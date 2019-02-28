import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerQuestService } from '../../player-quest/player-quest.service';
import { DocumentReference } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { NotifyService } from '../../../core/notify.service';
import { EmailService } from '../../../core/email.service';

const CategoryList = [
  'Core  - Infor Specific',
  'Core  - Soft Skill',
  'Product Specific Technical',
  'Product Specific Functional',
  'Certification ' 
]

@Component({
  selector: 'add-quest-dialog',
  templateUrl: './add-quest-dialog.component.html',
  styleUrls: ['./add-quest-dialog.component.scss']
})
export class AddQuestDialogComponent implements OnInit {
  private categoryList: Array<String>;
  private categories: QuestCategories;
  private playerQuest: PlayerQuest;
  private user: User;
  private season: Season;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private playerQuestService: PlayerQuestService,
    private dialogRef: MatDialogRef<AddQuestDialogComponent>,
    private notifyService: NotifyService,
    private emailService: EmailService) {
    this.categoryList = CategoryList;
    this.season = data.season;
    this.user = data.user;
    this.playerQuest = {
      playerId: this.user.uid,
      required: true,
      playerName: this.user.displayName,
      teamId: this.user.team.id,
      status: 'todo',
      seasonId: this.season.id,
      xp: 10,
      playerEmail: this.user.email
    } as PlayerQuest;
  }

  adjustQuestType(required: boolean) {
    this.playerQuest.required = required;
    this.playerQuest.xp = required? 10: 5;
  }

  assignQuest() {
    this.dialogRef.close();
    this.playerQuestService.assignPlayerQuest(this.playerQuest).then((docRef: DocumentReference) => {
      docRef.get().then((data) => {
        if(data.exists) {
          this.emailService.sendEmail(this.user.email, 'Leader Board: New Quest Assigned', 
            'Quest Name: ' + this.playerQuest.questName + '\n' +
            'Quest Category: ' + this.playerQuest.category + '\n' +
            'Quest Source: ' + this.playerQuest.source + '\n' +
            'Quest Type: ' + this.playerQuest.required? 'Required': 'Additional');
          this.notifyService.update('Assign quest successful!', 'success');
        } else {
          this.notifyService.update('Assign quest failed!', 'error');
        }
      });
    });
  }

  ngOnInit() {}
}