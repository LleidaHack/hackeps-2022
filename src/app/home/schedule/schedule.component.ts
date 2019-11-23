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
      date: '8:30 - 23 NOV',
      name: 'Check-in'
    },
    {
      icon: 'fas fa-play',
      date: '10:00 - 23 NOV',
      name: 'Finaliza check-in y empieza la ceremonia'
    },
    {
      icon: 'fas fa-laptop-code',
      date: '11:00 - 23 NOV',
      name: 'Start hacking'
    },
    {
      icon: 'fas fa-utensils',
      date: '14:00 - 23 NOV',
      name: 'Comida',
    },
    {
      icon: 'fas fa-pizza-slice',
      date: '20:30 - 23 NOV',
      name: 'Cena',
    },
    {
      icon: 'fas fa-cookie-bite',
      date: '3:00 - 24 NOV',
      name: 'Snack Time',
    },
    {
      icon: 'fas fa-flag-checkered',
      date: '11:00 - 24 NOV',
      name: 'Finaliza el timepo de hack',
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      date: '11:30 - 24 NOV',
      name: 'Presentación de las soluciones',
    },
    {
      icon: 'fas fa-trophy',
      date: '13:00 - 24 NOV',
      name: 'Ceremonia de clausura y entrega de premios',
    },
    {
      icon: 'fas fa-drumstick-bite',
      date: '15:00 - 24 NOV',
      name: 'Comida y despedida',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
