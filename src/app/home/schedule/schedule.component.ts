import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  events = [
    {
      icon: 'fas fa-money-check',
      date: '8:30 - 28 NOV',
      name: 'Check-in'
    },
    {
      icon: 'fas fa-play',
      date: '10:00 - 28 NOV',
      name: 'Finaliza check-in y empieza la ceremonia'
    },
    {
      icon: 'fas fa-laptop-code',
      date: 'Si quieres, tampoco te vamos a obligar... 🙆',
      name: 'Start hacking'
    },
    {
      icon: 'fas fa-utensils',
      date: 'Tú verás cuando coméis en tu casa🤷',
      name: 'Comida',
    },
    {
      icon: 'fas fa-pizza-slice',
      date: 'Pues lo mismo que en la comida chacho💁',
      name: 'Cena',
    },
    {
      icon: 'fas fa-cookie-bite',
      date: 'Reminder de que hay que beber awa UwU',
      name: 'Snack Time',
    },
    {
      icon: 'fas fa-flag-checkered',
      date: '11:30 - 29 NOV',
      name: 'Finaliza el tiempo de hack',
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      date: '12:00 - 29 NOV',
      name: 'Presentación de las soluciones',
    },
    {
      icon: 'fas fa-trophy',
      date: '13:00 - 29 NOV',
      name: 'Ceremonia de clausura y entrega de premios',
    },
    {
      icon: 'fas fa-drumstick-bite',
      date: 'Que no sé cuando coméis en tu casa... 😒',
      name: 'Comida y despedida',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
