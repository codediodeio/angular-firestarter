import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'quest-approval-dialog',
  templateUrl: 'quest-approval-dialog.component.html',
  styleUrls: ['./quest-approval-dialog.component.scss']
})
export class QuestApprovalDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<QuestApprovalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlayerQuest
  ) {}
}
