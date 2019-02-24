import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

import { AdminService } from './admin.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { NotifyService } from './notify.service';

@NgModule({
  imports: [
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    AdminService,
    AuthService,
    AuthGuard,
    NotifyService,
  ]
})
export class CoreModule { }
