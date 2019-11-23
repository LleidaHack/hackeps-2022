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
      date: '8:30 - 23 OCT',
      name: 'Check-in'
    },
    {
      icon: 'fas fa-play',
      date: '10:00 - 23 OCT',
      name: 'Finaliza check-in y empieza la ceremonia'
    },
    {
      icon: 'fas fa-laptop-code',
      date: '11:30 - 23 OCT',
      name: 'Start hacking'
    },
    {
      icon: 'fas fa-utensils',
      date: '14:00 - 23 OCT',
      name: 'Comida',
    },
    {
      icon: 'fas fa-pizza-slice',
      date: '20:30 - 23 OCT',
      name: 'Cena',
    },
    {
      icon: 'fas fa-cookie-bite',
      date: '3:00 - 24 OCT',
      name: 'Snack Time',
    },
    {
      icon: 'fas fa-flag-checkered',
      date: '11:30 - 24 OCT',
      name: 'End hacking',
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      date: '12:00 - 24 OCT',
      name: 'Presentación de las soluciones',
    },
    {
      icon: 'fas fa-trophy',
      date: '13:30 - 24 OCT',
      name: 'Ceremonia de clausura y entrega de premios',
    },
    {
      icon: 'fas fa-drumstick-bite',
      date: '14:30 - 24 OCT',
      name: 'Comida y despedida',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
