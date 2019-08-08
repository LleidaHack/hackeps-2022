import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, of} from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import {auth, User} from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user$: Observable<UserModel>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      map(({ uid, email, displayName, photoURL }: User) => {
        return { uid, email, displayName, photoURL };
      })
    );
    // .pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.afStore.doc<UserModel>(`users/${user.uid}`).valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   })
    // );
  }

  public isLoggedIn(): boolean {
    return this.afAuth.auth.currentUser != null;
  }

  public redirectToLogin() {
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider);
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

  public updateUserData({ uid, email, displayName, photoURL }: User) {
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data as User, { merge: true });
  }

  public async isRegistered(user: UserModel) {
    const userRef = this.afStore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get().toPromise();
    console.log(snapshot.data);
    return snapshot.exists;
  }
}
