import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireDatabase, FirebaseAuthState, AuthProviders, AuthMethods, AngularFire } from "angularfire2";
import { Router } from "@angular/router";
import * as firebase from 'firebase';

export class EmailPasswordCredentials {
  email: string;
  password: string;
}


@Injectable()
export class AuthService {

  authState: FirebaseAuthState = null;

  constructor(private af: AngularFire,
              private db: AngularFireDatabase,
              private router:Router) {

            af.auth.subscribe((auth) => {
              this.authState = auth;
            });
          }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user
  get currentUser(): any {
    return this.authenticated ? this.authState.auth : null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.anonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authenticated) { return 'Guest' }

    else if (this.currentUserAnonymous) { return 'Anonymous' }

    else { return this.authState.auth.displayName || 'User without a Name' }

  }

  //// Social Auth ////

  githubLogin(): firebase.Promise<FirebaseAuthState> {
    return this.socialSignIn(AuthProviders.Github);
  }

  googleLogin(): firebase.Promise<FirebaseAuthState> {
    return this.socialSignIn(AuthProviders.Google);
  }

  facebookLogin(): firebase.Promise<FirebaseAuthState> {
    return this.socialSignIn(AuthProviders.Facebook);
  }

  twitterLogin(): firebase.Promise<FirebaseAuthState> {
    return this.socialSignIn(AuthProviders.Twitter);
  }

  private socialSignIn(provider: number): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login({provider, method: AuthMethods.Popup})
      .then(() => this.updateUserData() )
      .catch(error => console.log(error));
  }


  //// Anonymous Auth ////

  anonymousLogin() {
    return this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    })
    .then(() => this.updateUserData())
    .catch(error => console.log(error));
  }

  // anonymousUpgrade(): firebase.Promise<FirebaseAuthState> {
  //
  //   let anonId = this.currentUserId
  //
  //   // Login with google
  //   return this.googleLogin().then( () => {
  //     // get the data snapshot from anonymous account account
  //     this.db.object(anonId).subscribe(snapshot => {
  //       // map the anonymous user data to the new account.
  //       this.db.object(this.currentUserId).update(snapshot)
  //     })
  //   });
  // }

  //// Email/Password Auth ////

  emailSignUp(credentials: EmailPasswordCredentials): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.createUser(credentials)
      .then(() => this.updateUserData())
      .catch(error => console.log(error));
  }

  emailLogin(credentials: EmailPasswordCredentials): firebase.Promise<FirebaseAuthState> {
     return this.af.auth.login(credentials,
       { provider: AuthProviders.Password,
         method: AuthMethods.Password
        })
       .then(() => this.updateUserData())
       .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////

  signOut(): void {
    this.af.auth.logout();
    this.router.navigate(['/'])
  }


  //// Helpers ////

  private updateUserData(): void {
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features

    let path = `users/${this.currentUserId}`; // Endpoint on firebase
    let data = {
                 name: this.currentUser.displayName,
                 email: this.currentUser.email,
               }

    this.db.object(path).update(data)
    .catch(error => console.log(error));

  }




}
