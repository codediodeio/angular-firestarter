import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../core/notify.service';

@Component({
  selector: 'notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss']
})
export class NotificationMessageComponent {

  constructor(public notify: NotifyService) { }

  getColor(style: 'error' | 'info' | 'success'): string {
    switch (style) {
      case 'success': return 'primary'; break;
      case 'error': return 'warn'; break;
      case 'info': return 'accent'; break;
    }
  }
}
