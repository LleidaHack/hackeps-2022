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
      web: 'https://eurecat.org/es/',
      img: 'assets/eurecat.png',
      alt: 'Eurecat',
      level: 1
    },
    {
      web: 'https://www.invelon.com/',
      img: 'assets/invelon.png',
      alt: 'Invelon logo',
      level: 1
    },
    {
      web: 'https://intech3d.es/',
      img: 'assets/intech3d.png',
      alt: 'Intech3d logo',
      level: 1
    },
    {
      web: 'https://origen.studio/',
      img: 'assets/origenstudio.png',
      alt: 'Intech3d logo',
      level: 1
    },
    {
      web: 'https://www.lleida.net/es',
      img: 'assets/lleidanet.png',
      alt: 'Lleidanet logo',
      level: 1
    },
    {
      web: 'https://groupsalto.com/',
      img: 'assets/salto.jpg',
      alt: 'Saltó logo',
      level: 1
    },
    {
      web: 'https://www.insdosl.com/',
      img: 'assets/insdo.png',
      alt: 'INSDO logo',
      level: 1
    },
    {
      web: 'https://www.vallcompanys.es/',
      img: 'assets/vallcompanys.png',
      alt: 'Vall Companys logo',
      level: 1
    },
    {
      web: 'https://www.gft.com/es/es',
      img: 'assets/gft.png',
      alt: 'GFT Logo',
      level: 2
    },
    {
      web: 'https://altersoftware.es/',
      img: 'assets/altersoft.png',
      alt: 'Alter Software Logo',
      level: 2
    },
    {
      web: 'https://www.grupandreuvending.com/',
      img: 'assets/gavending.png',
      alt: 'Gavending Logo',
      level: 2
    },
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
    },
    {
      web: 'https://www.blueplanet.cat/',
      img: 'assets/blueplanet.png',
      alt: 'Logo BluePlanet',
      level: 2
    },
    {
      web: 'https://www.bonpreuesclat.cat/',
      img: 'assets/bonpreu.png',
      alt: 'Logo Bonpreu Esclat',
      level: 2
    },
    {
      web: 'https://lamaletacreativa.com/',
      img: 'assets/maleta.png',
      alt: 'Logo Maleta Creativa',
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
