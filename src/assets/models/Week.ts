import { CalendarDate } from './../../app/calendar/calendar.component';
export var weekdays = new Array(
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
);

export function sameWeekPeriod(date: CalendarDate) {
  return insideWeek(date.mDate.toDate());
  // return getNumberOfWeek(date.mDate.toDate()) == getNumberOfWeek(new Date());
}

function getNumberOfWeek(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function insideWeek(date: Date): boolean {
  var today: Date = new Date();
  return today.getTime() >= date.getTime() && today.getTime() < date.getTime() + 86400000*7;
}