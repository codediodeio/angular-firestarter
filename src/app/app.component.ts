import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { NotifyService } from './core/notify.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public notify: NotifyService) { }


}
