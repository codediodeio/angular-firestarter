import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { UserLoginComponent } from './users/user-login/user-login.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { UploadsListComponent } from './uploads/uploads-list/uploads-list.component';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  { path: 'login', component: UserLoginComponent, },
  { path: 'items', component: ItemsListComponent, canActivate: [AuthGuard]},
  { path: 'uploads', component: UploadsListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
