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
      alt: 'Escuela Politécnica Superior de la Universidad de Lleida',
      level: 0
    },
    {
      web: 'http://www.udl.es/ca/',
      img: 'assets/logo_udl.jpg',
      alt: 'Universidad de Lleida',
      level: 0
    },
    {
      web: 'https://www.bonarea.com/',
      img: 'assets/bon-area.png',
      level: 1
    },
    {
      web: 'https://www.invelon.com/',
      img: 'assets/intech3d.png',
      level: 1
    },
    {
      web: 'https://intech3d.es/',
      img: 'assets/invelon.png',
      level: 1
    },
    {
      web: 'https://origen.studio/',
      img: 'assets/origenstudio.png',
      level: 1
    },
    {
      web: 'https://eurecat.org/es/',
      img: 'assets/eurecat.png',
      level: 1
    },
    {
      web: 'https://www.vunkers.com/',
      img: 'assets/vunkers_logo.png',
      level: 1
    },
    {
      web: 'https://cosantex.com/',
      img: 'assets/cosantex.png',
      level: 2
    },
    {
      web: 'https://0xword.com/',
      img: 'assets/oxword.jpeg',
      level: 2
    },
    {
      web: 'https://mypublicinbox.com/',
      img: 'assets/mypublicinbox.jpeg',
      level: 2
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  public getSponsorsByLevel(level: number): any[] {
    return this.sponsors.filter(s => s.level === level);
  }
}
