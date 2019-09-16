import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { auth, User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentSnapshot
} from '@angular/fire/firestore';
import { isNullOrUndefined } from 'util';
import { MessagesService } from './messages.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  public user$: Observable<UserModel>;
  public loading: boolean;

  constructor(
    public afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router

  ) {
    this.user$ = this.afAuth.authState.pipe(
      map((u: User) => {
        if (!u) {
          return null;
        }

        return {
          uid: u.uid,
          email: u.email,
          displayName: u.displayName,
          photoURL: u.photoURL
        } as UserModel;
      })
    );
  }

  public isLoggedIn(): boolean {
    return !isNullOrUndefined(this.afAuth.auth.currentUser);
  }

  public fetchUserData(uid): Observable<UserModel> {
    const userRef: AngularFirestoreDocument<UserModel> =
      this.afStore.doc(`users/${uid}`);
    return userRef.get().pipe(
      map((snapshot: DocumentSnapshot<UserModel>) => {
        const userData = snapshot.data();
        if (!userData) {
          return null;
        }
        if (!userData.accepted) {
          userData.accepted = 'PENDENT';
        }
        return snapshot.data();
      })
    );
  }

  public redirectToLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithRedirect(provider);
  }

  public async loginAfterRedirect() {
    return await this.afAuth.auth.getRedirectResult();
  }

  public async googleSignIn(): Promise<auth.UserCredential> {
    try {
      const provider = new auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const creds = await this.afAuth.auth.signInWithPopup(provider);
      return creds;
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

  public async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  public updateUserData(user: UserModel) {
    const userRef: AngularFirestoreDocument<UserModel> =
      this.afStore.doc(`users/${user.uid}`);

    return userRef.set(user, { merge: true });
  }

  public async isRegistered(user: UserModel) {
    const userRef = this.afStore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get().toPromise();
    return snapshot.exists;
  }

  public async mailSignUp(email: string, password: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(function(success){
      this.checkAndRedirect(success.user);
    }).catch(function(error){
      const messageService = new MessagesService()
      return messageService.translateMessage(error.code);
    });
  }

  public async loginWithMailAndPassword(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(function(success){
      this.checkAndRedirect(success.user);
    }).catch(function(error){
      const messageService = new MessagesService();
      return messageService.translateMessage(error.code);
    });
  }

  public async checkAndRedirect(user: UserModel) {
    if (!user) {
      this.loading = false;
      return;
    }
    if (await this.isRegistered(user)) {
      this.router.navigateByUrl('/user');
    } else {
      this.router.navigateByUrl('/user/signup');
    }
  }
}
