import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './users/user-login/user-login.component';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  { path: 'login', component: UserLoginComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
