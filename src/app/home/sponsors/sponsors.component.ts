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
      alt: 'Bon Àrea',
      level: 1
    },
    {
      web: 'https://www.invelon.com/',
      img: 'assets/invetech.png',
      alt: 'Invelon e Intech3d',
      level: 1
    },
    {
      web: 'https://origen.studio/',
      img: 'assets/origenstudio.png',
      alt: 'Origen Studio',
      level: 1
    },
    {
      web: 'https://eurecat.org/es/',
      img: 'assets/eurecat.png',
      alt: 'Eurecat',
      level: 1
    },
    {
      web: 'https://www.vunkers.com/',
      img: 'assets/vunkers_logo.png',
      alt: 'Vunkers',
      level: 1
    },
    // {
    //   web: 'https://enginyeriainformatica.cat/',
    //   img: 'assets/coinf.png',
    //   alt: 'COEINF',
    //   level: 2
    // },
    {
      web: 'https://alumni.udl.cat/',
      img: 'assets/alumni.jpg',
      alt: 'Alumni UdL',
      level: 2
    },
    {
      web: 'https://cosantex.com/',
      img: 'assets/cosantex.png',
      alt: 'Cosantex',
      level: 2
    },
    {
      web: 'https://www.dominospizza.es/',
      img: 'https://www.dominospizza.es/Content/img/dominos-logo.svg',
      alt: 'Domino\'s Pizza',
      level: 2
    },
    {
      web: 'https://0xword.com/',
      img: 'assets/oxword.png',
      alt: '0xWORD',
      level: 2
    },
    {
      web: 'https://mypublicinbox.com/',
      img: 'assets/mypublicinbox.jpeg',
      alt: 'My Public Inbox',
      level: 2
    },
    {
      web: 'https://singularity-hackers.com/',
      img: 'assets/singularityHackers.png',
      alt: 'Singularity Hackers',
      level: 2
    },
    {
      web: 'https://www.fruilar.com/es/',
      img: 'assets/fruilar.jpeg',
      alt: 'Fruilar',
      level: 2
    },
    {
      web: 'https://www.plusfresc.cat/',
      img: 'assets/plusfresc.svg',
      alt: 'Plusfresc',
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
