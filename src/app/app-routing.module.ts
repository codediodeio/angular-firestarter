import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { UserLoginComponent } from './ui/user-login/user-login.component';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { UploadsListComponent } from './uploads/uploads-list/uploads-list.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'notes', component: NotesListComponent,  canActivate: [AuthGuard] },
  { path: 'uploads',  component: UploadsListComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
