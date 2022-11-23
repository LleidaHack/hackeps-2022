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
      date: '8:30 - 26 NOV',
      name: 'Check-in'
    },
    {
      icon: 'fas fa-play',
      date: '10:00 - 26 NOV',
      name: 'Empieza la ceremonia'
    },
    {
      icon: 'fas fa-laptop-code',
      date: '11:30 - 26 NOV',
      name: 'Start hacking, si quieres vamos... 🙆'
    },
    {
      icon: 'fas fa-utensils',
      date: '14:00 - 26 NOV',
      name: 'Comida',
    },
    {
      icon: 'fas fa-times-circle',
      date: '15:00 - 26 NOV',
      name: 'Finaliza el check-in y cierre de registros'
    },
    {
      icon: 'fas fa-pizza-slice',
      date: '21:00 - 26 NOV',
      name: 'Cena',
    },
    {
      icon: 'fas fa-cookie-bite',
      date: 'Reminder de que hay que beber awa UwU',
      name: 'Snack Time',
    },
    {
      icon: 'fas fa-flag-checkered',
      date: '11:30 - 27 NOV',
      name: 'Finaliza el tiempo de hack',
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      date: '12:00 - 27 NOV',
      name: 'Presentación de las soluciones',
    },
    {
      icon: 'fas fa-trophy',
      date: '15:00 - 27 NOV',
      name: 'Ceremonia de clausura y entrega de premios',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
