import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from '../ui/loading-spinner/loading-spinner.component';
import { NotificationMessageComponent } from '../ui/notification-message/notification-message.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LoadingSpinnerComponent,
    NotificationMessageComponent,
  ],
  exports: [
    LoadingSpinnerComponent,
    NotificationMessageComponent,
  ]
})
export class SharedModule { }
