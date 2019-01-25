import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SsrPageComponent } from './ssr-page/ssr-page.component';

import { FirestoreDatePipe } from './firestore-date.pipe';
import { LeaderboardService } from './home-page/leaderboard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
  ],
  declarations: [
    UserLoginComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    NotificationMessageComponent,
    UserProfileComponent,
    UserFormComponent,
    SsrPageComponent,
    FirestoreDatePipe,
    AdminPageComponent,
  ],
  exports: [
    LoadingSpinnerComponent,
    NotificationMessageComponent,
    UserProfileComponent,
    UserFormComponent
  ],
  providers: [
    LeaderboardService,
  ]
})
export class UiModule {}
