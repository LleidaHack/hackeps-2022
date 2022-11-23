import { environment } from 'src/environments/environment';
import { Challenge } from './../models/challenge';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/firestore';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarChallengesService {
  public static CHALLENGES_UIDS = {
    cost: 'w3b6eXvKt4vnkn5dLv6F',     // Conway's Game of Life challenge
    pokemon: 'fpq63uqepoxAEB1GKBzF',  // HackersGotHacket challenge,
    ml: 'CDaKdVeog0SbRW9VIxco',        // Logo Identifier Challenge
  };

  private challengesCollection: AngularFirestoreCollection<Challenge>;

  constructor(private afs: AngularFirestore) {
    this.challengesCollection = afs.collection('challenges');
  }

  public getUserSubmissions(userUid: string) {
    const challengesUids = Object.values(CalendarChallengesService.CHALLENGES_UIDS);
    const docs$ = challengesUids.map(id => this.afs.doc(`challenges-2022/${id}/submissions/${userUid}`).get());
    return forkJoin(docs$).pipe(map(res => res.map(r => r.data())));
  }

  public all(): Observable<Challenge[]> {
    return this.challengesCollection.get().pipe(
      map(value =>  value.docs.map(d => d.data()) as Challenge[])
    );
  }

  private submissionCollection(challengeUid: string): AngularFirestoreCollection<any> {
    return this.afs.collection(`challenges-2022/${challengeUid}/submissions`);
  }

  public uploadSubmission(challengeUid: string,
                          user: UserModel,
                          solution: string): Observable<boolean> {
    const userRef = `${environment.baseCollection}/users/${user.uid}`;
    const collection = this.submissionCollection(challengeUid);
    return new Observable(obs => {
      collection.doc(user.uid).set({
        user: userRef,
        solution
      }).then(() => {
        obs.next(true);
        obs.complete();
      }).catch(() => {
        obs.next(false);
        obs.complete();
      });
    });
  }
}
