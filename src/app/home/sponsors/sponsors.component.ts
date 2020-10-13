import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {

  public sponsors: any[] = [
    {
      web: 'http://www.eps.udl.cat/',
      img: 'assets/eps.png',
      level: 0
    },
    {
      web: 'http://www.udl.es/ca/',
      img: 'assets/logo_udl.jpg',
      level: 0
    },
    // {
    //   web: 'https://www.bonarea.com/',
    //   img: 'assets/bon-area.png',
    //   level: 1
    // },
    {
      web: 'https://www.invelon.com/',
      img: 'assets/invelon.png',
      level: 1
    },
    // {
    //   web: 'https://eurecat.org/es/',
    //   img: 'assets/eurecat.png',
    //   level: 1
    // },
  ];

  constructor() { }

  ngOnInit() {
  }

  public getSponsorsByLevel(level: number): any[] {
    return this.sponsors.filter(s => s.level === level);
  }
}
