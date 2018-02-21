import * as moment from 'moment';
import * as jquery from 'jquery';
import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  providers: [
    AppointmentsService
  ]
})
export class AgendaComponent implements OnInit {
  appointments: any[];
  selectedAppointment: any = null;
  headerConfig: any;
  scrollTime: any;
  businessHours: any;
  display: boolean = false;  

  constructor(
    private appointmentsService: AppointmentsService) { }

  ngOnInit() {
    this.headerConfig = {
      left: 'prev,next today,listDay',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
    this.scrollTime = '08:00';
    this.businessHours = [
      {
        dow: [1, 2, 3, 4, 5], // Monday - friday
        start: '08:00', // 8am
        end: '17:00' // 5pm
      },
      {
        dow: [6], // Saturday, Sunday
        start: '08:00', // 8am
        end: '12:00' // 12pm
      }
    ];

    this.appointmentsService.getAppointments().then(data => this.appointments = data);
   
  }

  editAppointment(e) {
    //e.calEvent = Selected event
    //e.jsEvent = Browser click event
    //e.view = Current view object
    this.selectedAppointment = e.calEvent.appointment;
    this.display = true;    
    /*
    this.test = e.calEvent.title + ' ' + e.calEvent.start + ' ' + e.calEvent.end + ' ' + moment(e.calEvent.start).format() + ' ' + moment.utc(e.calEvent.end).toDate();
    this.paciente = e.calEvent.title;
    this.servicio = e.calEvent.service;
    this.startDate = new Date(moment(e.calEvent.start).format());
    this.endDate = new Date(moment(e.calEvent.end).format());
    */
  }

  addAppointment():void{
    this.selectedAppointment = null;
    this.display = true;    
  }

  updateAppointment():void{
    
  }

  deleteAppointment():void{
    
  }


}
