import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

// Firestarter App Modules
import { CoreModule } from './core/core.module';
import { UploadsModule } from './uploads/uploads.module';
import { UiModule } from './ui/ui.module';
import { NotesModule } from './notes/notes.module';
import { TasksModule } from './tasks/tasks.module';

// @angular/fire Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions';
import { MsalModule } from '@azure/msal-angular';

import { functions } from 'firebase';

// IMPORTANT
// Add your own project credentials to environments/*.ts

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    CoreModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MsalModule.forRoot({ clientID: '9fc78166-b1bb-4cc6-bb92-a2425705410a' }),
    NotesModule,
    TasksModule,
    UiModule,
    UploadsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: FunctionsRegionToken, useValue: 'us-central1' }
  ]
})
export class AppModule {}
