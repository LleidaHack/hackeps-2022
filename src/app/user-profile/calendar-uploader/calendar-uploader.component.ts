import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from './../../shared/models/user.model';

@Component({
  selector: 'app-calendar-uploader',
  templateUrl: './calendar-uploader.component.html',
  styleUrls: ['./calendar-uploader.component.scss']
})
export class CalendarUploaderComponent implements OnInit {

  @Input() user: UserModel;

  constructor() {
  }

  ngOnInit() {
  }

  public submitCostChallenge(input: HTMLInputElement) {
    const url = input.value;
  }

  public submitMLChallenge(input: HTMLInputElement) {
    const url = input.value;
  }

  public submitPokemonChallenge(input: HTMLInputElement) {
    const url = input.value;
  }
}
