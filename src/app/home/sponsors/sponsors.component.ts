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
    {
      web: 'https://www.bonarea.com/',
      img: 'assets/bon-area.png',
      level: 1
    },
    {
      web: 'https://www.invelon.com/',
      img: 'assets/invelon.png',
      level: 1
    },
    {
      web: 'https://eurecat.org/es/',
      img: 'assets/eurecat.png',
      level: 1
    },
    {
      web: 'http://www.actiumdigital.es/es',
      img: 'assets/actium.png',
      level: 1
    },
    {
      web: 'https://origen.studio/',
      img: 'assets/origenstudio.png',
      level: 1
    },
    {
      web: 'https://www.dominospizza.es',
      img: 'assets/dominos_pizza.png',
      level: 2
    },
    {
      web: 'https://www.intech3d.es/',
      img: 'assets/intech3d.png',
      level: 2
    },
    {
      web: 'https://enginyeriainformatica.cat/',
      img: 'assets/coinf.png',
      level: 2
    },
    {
      web: 'https://alumni.udl.cat/alumni/',
      img: 'assets/alumni.jpg',
      level: 2
    },
    {
      web: 'http://www.cosantex.com/',
      img: 'assets/cosantex.png',
      level: 2
    },
    {
      web: 'https://www.jetbrains.com/',
      img: 'assets/jetbrains.svg',
      level: 3
    },
    {
      web: 'http://www.consell-eps.udl.cat/',
      img: 'assets/consell.jpg',
      level: 3
    },
    {
      web: 'https://linktr.ee/labicicleta.ads',
      img: 'assets/bicicleta.png',
      level: 3
	},
	{
	  web: 'http://www.delsamscafes.com/',
	  img: 'assets/delsams.png',
	  level: 3
	},
	{
	  web: 'http://arfonfruits.com/',
	  img: 'assets/arfon.png',
	  level: 3
	},
	{
	  web: 'https://es-es.facebook.com/pages/category/Event-Planner/Planeta-Gastro-Eventos-216982095712423/',
	  img: 'assets/planetagastro.jpeg',
	  level: 3
	}
  ];

  constructor() { }

  ngOnInit() {
  }

  public getSponsorsByLevel(level: number): any[] {
    return this.sponsors.filter(s => s.level === level);
  }
}
