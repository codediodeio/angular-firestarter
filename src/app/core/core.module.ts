import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  providers: [AuthService],
  imports: [AngularFireAuthModule]
})
export class CoreModule { }
