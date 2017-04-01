import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

///// Start FireStarter
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';

// FireStarter Users
import { AuthService } from './core/auth.service';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

// FireStarter Items
import { ItemService } from './items/shared/item.service';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemFormComponent } from './items/item-form/item-form.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';

// FireStarter Uploads
import { UploadService } from './uploads/shared/upload.service';
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';
import { UploadsListComponent } from './uploads/uploads-list/uploads-list.component';
import { UploadDetailComponent } from './uploads/upload-detail/upload-detail.component';

export const firebaseConfig = environment.firebaseConfig;

///// End FireStarter


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    ItemsListComponent,
    ItemFormComponent,
    ItemDetailComponent,
    UploadFormComponent,
    UploadsListComponent,
    UploadDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AuthService,
    ItemService,
    UploadService,

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
