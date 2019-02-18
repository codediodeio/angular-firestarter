import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { AdminPageComponent } from './ui/admin-page/admin-page.component';
import { PlayerQuestComponent } from './ui/player-quest/player-quest.component';
import { UserLoginComponent } from './ui/user-login/user-login.component';
import { UserProfileComponent } from './ui/user-profile/user-profile.component';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { TasksPageComponent } from './tasks/tasks-page.component';
import { UploadPageComponent } from './uploads/upload-page/upload-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksPageComponent, canActivate: [AuthGuard] },
  { path: 'quests', component: PlayerQuestComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
