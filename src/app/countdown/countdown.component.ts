import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  @ViewChild('cd', { static: false })
  private countdown: CountdownComponent;

  public config: CountdownConfig;

  constructor() {
    this.config = {
      leftTime: 24 * 3600,
      stopTime: 1638003600000
    };
  }

  ngOnInit() {
  }

}
