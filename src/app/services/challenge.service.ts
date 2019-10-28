import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { Challenge } from './../../assets/models/Challenge';
import { CalendarDate } from './../../assets/models/CalendarDate';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(
    public afs: AngularFirestore
  ) { }

  formatChallenge(challengeData: firebase.firestore.DocumentData) {
    return new Challenge(
      challengeData.date,
      challengeData.description,
      challengeData.example,
      challengeData.link,
      challengeData.title
    );
  }

  checkChallenges(date: CalendarDate): Subject<firebase.firestore.DocumentData> {
    var result: Subject<Challenge> = new Subject<Challenge>();

    this.afs.collection('challenges').ref.get()
      .then(snapshot => this.findChallenge(snapshot, date, result))
      .catch(_ => {
        console.error('Error retrieving the events data, no events published')
      });
    return result;
  }

  findChallenge(snapshot:firebase.firestore.QuerySnapshot , date: CalendarDate, 
    result: Subject<firebase.firestore.DocumentData>) {
    snapshot.forEach(doc => {
      (doc.data().date.seconds == date.mDate.toDate().getTime() / 1000) && result.next(doc.data())
    });
  }

  getChallenges(): BehaviorSubject<Challenge[]> {
    var result: BehaviorSubject<Challenge[]> = new BehaviorSubject<Challenge[]>([]);

    this.afs.collection('challenges').ref.get()
    .then(snapshot => this.insertChallenges(snapshot, result))
    .catch(_ => {
      console.error('Error retrieving the events data, no events published')
    });
    return result;
  }

  insertChallenges(snapshot:firebase.firestore.QuerySnapshot, 
    result: BehaviorSubject<firebase.firestore.DocumentData[]>) {
    snapshot.forEach(doc => {
      result.getValue().push(doc.data());
      result.next(result.getValue());
    });
  }
}


// import { Timestamp } from 'rxjs/internal/operators/timestamp';
// import { firestore } from 'firebase';

// export class Challenge {
//   date: firebase.firestore.FieldValue;
//   desciption: string;
//   example: string;
//   title: string;
// }