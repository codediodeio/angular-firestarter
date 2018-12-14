import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MsalService} from '@azure/msal-angular';
import { firebase } from '@firebase/app';
import { auth, functions } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

import { NotifyService } from './notify.service';


@Injectable()
export class AuthService {
  user: Observable<User | null>;
  microsoftUser = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private afFunctions: AngularFireFunctions,
    private msalService: MsalService,
    private router: Router,
    private notify: NotifyService
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
      // tap(user => localStorage.setItem('user', JSON.stringify(user))),
      // startWith(JSON.parse(localStorage.getItem('user')))
    );
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.notify.update('Welcome to LeaderBoard!!!', 'success');
        return this.setUserDoc(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {
        this.notify.update('Welcome to LeaderBoard!!!', 'success');
        return this.setUserDoc(credential.user); // if using firestore
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome new user!', 'success');
        return this.setUserDoc(credential.user); // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome back!', 'success');
        return this.setUserDoc(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }

  signOut() {
    if (this.microsoftUser) {
      this.microsoftSignOut();
    }

    this.afAuth.auth.signOut().then(() => {

      this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private setUserDoc(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    return userRef.set(user, { merge: true });
  }

  microsoftSignIn = async() => {
    await this.msalService.loginPopup(['user.read mail.send']);
    const user = this.msalService.getUser();
    const createFirebaseToken = this.afFunctions.httpsCallable('createFirebaseToken');
    const result = await createFirebaseToken({
      uid: user.userIdentifier,
      email: user.displayableId,
      displayName: user.name
    }).toPromise();
    this.microsoftUser = true;

    return this.afAuth.auth.signInWithCustomToken(result.token);
  }

  microsoftSignOut() {
    this.msalService.logout();
  }
}
