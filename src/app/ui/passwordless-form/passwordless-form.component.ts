import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'passwordless-form',
  templateUrl: './passwordless-form.component.html',
  styleUrls: ['./passwordless-form.component.scss']
})
export class PasswordlessFormComponent implements OnInit {

  email: string;
  emailSent = false;

  errorMessage: string;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {

    const url = this.router.url;

    if (url.includes('signIn')) {
      this.auth.confirmSignIn(url).then(
        r => {
          if ( r instanceof String) {
            this.errorMessage = r;
          } else {
            this.router.navigate(['notes']);
          }
        }
      );
    }
  }

  sendEmailLink() {
    const result = this.auth.sendEmailLink(this.email);
    result.then(
      r => {
        console.log('sendEmailLink', r);
        if ( r === true ) {
          this.emailSent = true;
        } else {
          this.errorMessage = r;
        }
      }
    );
  }

}
