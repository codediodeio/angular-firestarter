import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
  MatDialogModule
} from '@angular/material';

import { DialogModule } from './dialog/dialog.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SsrPageComponent } from './ssr-page/ssr-page.component';

import { FirestoreDatePipe } from './firestore-date.pipe';
import { LeaderboardService } from './home-page/leaderboard.service';
import { PlayerQuestComponent } from './player-quest/player-quest.component';
import { MembersQuestApprovalComponent } from './members-quest-approval/members-quest-approval.component';
import { QuestApprovalDialogComponent } from './members-quest-approval/quest-approval-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    MatDialogModule,
    DialogModule,
  ],
  declarations: [
    UserLoginComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    UserProfileComponent,
    UserFormComponent,
    SsrPageComponent,
    FirestoreDatePipe,
    AdminPageComponent,
    PlayerQuestComponent,
    MembersQuestApprovalComponent,
    QuestApprovalDialogComponent,
  ],
  entryComponents: [
    QuestApprovalDialogComponent
  ],
  exports: [
    LoadingSpinnerComponent,
    UserProfileComponent,
    UserFormComponent
  ],
  providers: [
    LeaderboardService,
  ]
})
export class UiModule {}
