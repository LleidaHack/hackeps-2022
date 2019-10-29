import { ChallengeService } from './challenge.service';
import { CalendarDate } from 'src/assets/models/CalendarDate';
import { Subscription, BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeekService {
  constructor(
    public challengeService: ChallengeService,
    public http: HttpClient
  ) { }

  sameWeekPeriod(date: CalendarDate): Subject<boolean> {
    var response = new Subject<boolean>();
    this.insideWeek(date.mDate.toDate()).subscribe(value => {
      response.next(value);
    });
    return response;
  }

  insideWeek(date: Date): Subject<boolean> {
    var response = new Subject<boolean>();

    this.getToday().subscribe(today => {
      var insideWeekValue = (today.getTime() >= date.getTime() &&
        today.getTime() < date.getTime() + 86400000 * 7) ||
        this.isHackEPS(date);
      response.next(insideWeekValue);
    });
    return response;
  }

  isHackEPS(date: Date): boolean {
    return date.getTime() >= 1574463600000 && date.getTime() <= 1574550000000;
  }

  getToday(): Subject<Date> {
    var response = new Subject<Date>();
    this.http.get("https://worldtimeapi.org/api/timezone/Europe/Madrid").subscribe(
      today => {
        response.next(new Date(today["datetime"]));
      }, err => {
        console.error("Failed to retrieve the local Date, try again later, " + err);
        return null;
      }
    );
    return response;
  }

  isTryingToExploit(date: Date): Subject<boolean> {
    var response = new Subject<boolean>();
    this.getToday().subscribe(today =>
      response.next(today.getTime() + 86400000 <= date.getTime()));
    return response;
  }
}
