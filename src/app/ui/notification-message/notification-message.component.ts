import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../core/notify.service';


@Component({
  selector: 'notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss'],
  providers: [NotifyService]
})
export class NotificationMessageComponent {

  constructor(public notify: NotifyService) { }


}
