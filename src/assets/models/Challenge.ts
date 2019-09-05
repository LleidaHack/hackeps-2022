export class Challenge {
  date: FirebaseDate;
  description: string;
  example: string;
  link: string;
  title: string;

  constructor(date: firebase.firestore.DocumentData, description: string, example: string, link: string, title: string) {
    this.date = new FirebaseDate(
      date.nanoseconds,
      date.seconds
    );
    this.description = description;
    this.example = example;
    this.link = link;
    this.title = title;
  }
}

class FirebaseDate {
  nanoseconds: number;
  seconds: number;

  constructor(nanoseconds: number, seconds: number) {
    this.nanoseconds = nanoseconds;
    this.seconds = seconds;
  }
}

export var dummyChallenge: Challenge = new Challenge(
  new FirebaseDate(0,0),
  '',
  '',
  '',
  ''
);