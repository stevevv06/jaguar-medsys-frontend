import * as moment from 'moment';
import * as jquery from 'jquery';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  title = 'app';
  appointments: any[];
  headerConfig: any;
  scrollTime: any;
  businessHours: any;
  display: boolean = false;
  paciente: string;
  servicio: string;
  startDate: Date;
  endDate: Date;
  test: string;

  constructor() { }

  ngOnInit() {
    this.headerConfig = {
      left: 'prev,next today,listDay',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
    this.scrollTime = '08:00';
    this.businessHours = [ // specify an array instead
      {
        dow: [1, 2, 3, 4, 5], // Monday, Tuesday, Wednesday
        start: '08:00', // 8am
        end: '17:00' // 6pm
      },
      {
        dow: [6], // Thursday, Friday
        start: '08:00', // 10am
        end: '12:00' // 4pm
      }
    ];

    this.appointments = [
      /*{
          "title": "All Day Event",
          "start": "2018-02-01"
      },*/
      {
        "title": "Luis Lopez",
        "start": "2018-02-07T08:00",
        "end": "2018-02-07T09:00",
        "service": "Limpieza"
      },
      {
        "title": "Pedro Perez",
        "start": "2018-02-07T08:00",
        "end": "2018-02-07T09:00",
        "color": "red",
        "service": "Colocacion"
      },
      {
        "title": "Juana Perez",
        "start": "2018-02-09T15:00:00",
        "end": "2018-02-09T16:00:00",
        "service": "Colocacion"
      },
      {
        "title": "Petrona Rodriguez",
        "start": "2018-02-09T16:00:00",
        "end": "2018-02-09T17:00:00",
        "service": "Colocacion"
      },
      {
        "title": "ABC 1",
        "start": "2018-02-15T08:00:00",
        "end": "2018-02-15T08:45:00",
        "service": "Extraccion"
      },
      {
        "title": "ABC2",
        "start": "2018-02-15T08:00:00",
        "end": "2018-02-15T09:30:00",
        "service": "Colocacion",
        "color": "red"
      },
    ];
  }

  handleEventClick(e) {
    //e.calEvent = Selected event
    //e.jsEvent = Browser click event
    //e.view = Current view object
    this.display = true;
    this.test = e.calEvent.title + ' ' + e.calEvent.start + ' ' + e.calEvent.end + ' ' + moment(e.calEvent.start).format() + ' ' + moment.utc(e.calEvent.end).toDate();
    this.paciente = e.calEvent.title;
    this.servicio = e.calEvent.service;
    this.startDate = new Date(moment(e.calEvent.start).format());
    this.endDate = new Date(moment(e.calEvent.end).format());
  }

  addAppointment():void{

  }
  editAppointment():void{
    
  }
  updateAppointment():void{
    
  }

  deleteAppointment():void{
    
  }


}
