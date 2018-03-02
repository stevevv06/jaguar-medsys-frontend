import * as moment from 'moment';
import * as jquery from 'jquery';
import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import {Appointment} from '../../models/appointment';
import {ScheduleEvent} from '../../models/schedule-event';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  providers: [
    AppointmentsService
  ]
})
export class AgendaComponent implements OnInit {
  appointments: ScheduleEvent[];
  selectedAppointment: Appointment = null;
  scheduleViewStart: any;
  scheduleViewEnd: any;
  headerConfig: any;
  scrollTime: string;
  minTime: string;
  maxTime: string;
  heightp: any;
  businessHours: any;
  dialogVisible: boolean = false;

  constructor(
    private appointmentsService: AppointmentsService) { }

  ngOnInit() {
    this.headerConfig = {
      left: 'prev,next today,listDay',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
    this.scrollTime = '08:00';
    this.minTime = '06:00';
    this.maxTime = '19:00';
    this.heightp = 'parent';
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
  }

  loadEvents(params): void{
    if(params != null){
      this.scheduleViewStart = params.view.start;
      this.scheduleViewEnd = params.view.end;
    }
    //TODO: should filter by date time range
    this.appointmentsService.getAppointments().then(data => this.appointments = data);
    console.log("Events reloaded with range " + this.scheduleViewStart.format() + " - " + this.scheduleViewEnd.format());
  }

  clearEvents(): void{
    this.appointments = [];
  }

  showDialog(visible: boolean){
    this.dialogVisible = visible;
  }

  editAppointment(e) {
    //e.calEvent = Selected event
    //e.jsEvent = Browser click event
    //e.view = Current view object
    this.selectedAppointment = e.calEvent.appointment;
    this.showDialog(true);
    /*
    this.test = e.calEvent.title + ' ' + e.calEvent.start + ' ' + e.calEvent.end + ' ' + moment(e.calEvent.start).format() + ' ' + moment.utc(e.calEvent.end).toDate();
    this.paciente = e.calEvent.title;
    this.servicio = e.calEvent.service;
    this.startDate = new Date(moment(e.calEvent.start).format());
    this.endDate = new Date(moment(e.calEvent.end).format());
    */
  }

  addAppointment(): void {
    this.selectedAppointment = new Appointment({     
      "id": "",
      "patient_id": "",
      "doctor_id": "",
      "service_id": "",
      "clinic_id": "",
      "start": "",
      "end": "",
      "created": "",
      "modified": ""      
  });
    this.showDialog(true);
  }

  addAppointmentOnDate(e): void {
    //e.date = Selected date slot
    //e.jsEvent = Browser click event
    //e.view = Current view object
    let mo: moment.Moment = moment(e.date);
    let sStartDate: string = moment(e.date).format();
    let sEndDate: string = moment(e.date).add(30, 'minutes').format(); 
    if (!mo.hasTime()){
      sStartDate += "T08:00";
      sEndDate += "T08:30";
    }
  
    this.selectedAppointment = new Appointment({     
        "id": "",
        "patient_id": "",
        "doctor_id": "",
        "service_id": "",
        "clinic_id": "",
        "start": sStartDate,
        "end": sEndDate,
        "created": "",
        "modified": ""      
    });

    this.dialogVisible = true;
  }

  saveAppointment(): void {
    //  console.log("Appointment saved " + JSON.stringify(this.selectedAppointment));
    if(this.selectedAppointment.isNew){
      console.log("Its new!")
      this.appointments.push(new ScheduleEvent(
        {
        "title": "New!",
        "start":this.selectedAppointment.start,
        "end": this.selectedAppointment.end,
        "appointment":this.selectedAppointment
        })
      );
      this.appointmentsService.createAppointment(this.selectedAppointment);      
    }
    else{
      let index : number = this.appointments.findIndex(x => x.appointment.id === this.selectedAppointment.id);
      //console.log("Editing id: " +this.selectedAppointment.id + ", index: " + index);
      //console.log(JSON.stringify(this.appointments));
      this.appointments[index].appointment = this.selectedAppointment;
      this.appointmentsService.updateAppointment(this.selectedAppointment);
      //console.log(JSON.stringify(this.appointments));
    }
    this.showDialog(false);
    this.loadEvents(null);
  }

  deleteAppointment(): void {
    this.appointmentsService.deleteAppointment(this.selectedAppointment);
    this.showDialog(false);
    this.loadEvents(null);
  }


}
