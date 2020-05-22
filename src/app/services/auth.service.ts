import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  authUser() {
    return this.user;
  }

  doLogin(user) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  doGoogleLogin() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  doFacebookLogin() {
    return this.afAuth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }
  doGitHubLogin() {
    return this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  doRegister(user) {
    return this.afAuth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  logOut() {
    return this.afAuth.signOut();
  }
}
