import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { NotifyService } from './notify.service';

@NgModule({
  providers: [AuthService, AuthGuard, NotifyService]
})
export class CoreModule { }
