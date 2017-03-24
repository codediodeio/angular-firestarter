import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// FireStarter
import { environment } from '../environments/environment';
import { AuthService } from './core/auth.service';
import { UserLoginComponent } from './users/user-login/user-login.component';


import { AngularFireModule } from 'angularfire2';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
export const firebaseConfig = environment.firebaseConfig;


// End FireStarter


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
