import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/core/notify.service';

@Component({
  selector: 'notification-toaster',
  templateUrl: './notification-toaster.component.html',
  styleUrls: ['./notification-toaster.component.scss'],
  providers: [NotifyService]
})
export class NotificationToasterComponent implements OnInit {

  constructor(public notify: NotifyService) { }

  ngOnInit() {
  }

  onConfirm(){
    this.notify.onConfirm();
  }
  onReject(){
    this.notify.onReject();
  }

}
