import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../core/auth.service";


@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private _auth: AuthService,
              private router: Router) { }


  ngOnInit() {

  }

  /// Social Login

  signInWithGithub(): void {
    this._auth.githubLogin()
    .then(() => this.postSignIn());
  }

  signInWithGoogle(): void {
    this._auth.googleLogin()
      .then(() => this.postSignIn());
  }

  signInWithFacebook(): void {
    this._auth.facebookLogin()
      .then(() => this.postSignIn());
  }

  signInWithTwitter(): void {
    this._auth.twitterLogin()
      .then(() => this.postSignIn());
  }

  /// Anonymous Sign In

  // signInAnonymously() {
  //   this._auth.anonymousLogin()
  //     .then(() => this.postSignIn());
  // }


  //// Email Login

  /// See Tutorial...

  /// Shared

  private postSignIn(): void {
    // Do after login stuff here, such router redirects, toast messages, etc.
    this.router.navigate(['/']);
  }

}
