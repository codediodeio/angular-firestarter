import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainNavComponent } from './main-nav/main-nav.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserLoginComponent, HomePageComponent, MainNavComponent],
  exports: [MainNavComponent]
})
export class UiModule { }
