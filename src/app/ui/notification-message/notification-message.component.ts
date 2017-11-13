import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotifyService } from '../../core/notify.service';

@Component({
  selector: 'notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationMessageComponent implements OnInit {

  constructor(public notify: NotifyService) { }

  ngOnInit() { }

}
