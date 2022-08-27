import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-front-countdown',
  templateUrl: './front-countdown.component.html',
  styleUrls: ['./front-countdown.component.scss']
})
export class FrontCountdownComponent implements OnInit {
  @ViewChild('cd', { static: false })
  private countdown: FrontCountdownComponent;

  public config: CountdownConfig;

  constructor() {
    this.config = {
      leftTime: 24 * 3600,
      stopTime: 1638003600000,
    };
  }

  ngOnInit() {
  }

}
