import { Challenge } from './../../shared/models/challenge';
import { CalendarChallengesService } from './../../shared/services/calendar-challeges.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserModel } from './../../shared/models/user.model';

@Component({
  selector: 'app-calendar-uploader',
  templateUrl: './calendar-uploader.component.html',
  styleUrls: ['./calendar-uploader.component.scss']
})
export class CalendarUploaderComponent implements OnInit {

  @ViewChild('challenge1', {static: false}) costChallenge;
  @ViewChild('challenge2', {static: false}) pokemonChallenge;
  @ViewChild('challenge3', {static: false}) mlChallenge;
  public msg = '';

  @Input() user: UserModel;

  constructor(private calendarService: CalendarChallengesService) {
  }

  ngOnInit() {
    this.calendarService.getUserSubmissions(this.user.uid)
      .subscribe(res => {
        this.costChallenge.nativeElement.value = (res[0] && res[0].solution) || '';
        this.pokemonChallenge.nativeElement.value = (res[1] && res[1].solution) || '';
        this.mlChallenge.nativeElement.value = (res[2] && res[2].solution) || '';
      });
  }

  private postProcessRequest(res: boolean, that: any) {
    if (res) {
      // Submission uploaded ok
      that.msg = 'Tu solución se ha subido correctamente.';
    } else {
      // Fail when upload submission
      that.msg = 'Error al enviar tu solución. Intentalo de nuevo más tarde';
    }

    setTimeout(() => {
      that.msg = '';
    }, 5000);
  }

  private setMessage(msg: string) {
    this.msg = msg;
    setTimeout(() => {
      this.msg = '';
    }, 5000);
  }

  private isGitHubUrl(url: string) {
    return /^https:\/\/github.com\/(:?[a-zA-z0-9\-\_]+)\/(:?[a-zA-z0-9\-\_]+)$/
      .test(url);
  }

  public submitCostChallenge(input: HTMLInputElement) {
    const url = input.value;
    if (!this.isGitHubUrl(url)) {
      this.setMessage('Error: El texto introducido no es un repositorio de GitHub');
      return;
    }

    const challengeUid = CalendarChallengesService.CHALLENGES_UIDS.cost;
    this.calendarService.uploadSubmission(challengeUid, this.user, url)
      .subscribe(r => this.postProcessRequest(r, this));
  }

  public submitPokemonChallenge(input: HTMLInputElement) {
    const url = input.value;
    if (!this.isGitHubUrl(url)) {
      this.setMessage('Error: El texto introducido no es un repositorio de GitHub');
      return;
    }
    const challengeUid = CalendarChallengesService.CHALLENGES_UIDS.pokemon;
    this.calendarService.uploadSubmission(challengeUid, this.user, url)
      .subscribe(r => this.postProcessRequest(r, this));
  }

  public submitMLChallenge(input: HTMLInputElement) {
    const url = input.value;
    if (!this.isGitHubUrl(url)) {
      this.setMessage('Error: El texto introducido no es un repositorio de GitHub');
      return;
    }
    const challengeUid = CalendarChallengesService.CHALLENGES_UIDS.ml;
    this.calendarService.uploadSubmission(challengeUid, this.user, url)
    .subscribe(r => this.postProcessRequest(r, this));
  }
}
