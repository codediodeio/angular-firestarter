import { Component } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { NotifyService } from 'src/app/core/notify.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {

  constructor(public auth: AuthService, public notifyService: NotifyService) { }

  logout() {
    this.auth.signOut();

    this.notifyService.add({ summary: "Logged out", detail: "You had been logged out", severity: 'info' });
  }
}
