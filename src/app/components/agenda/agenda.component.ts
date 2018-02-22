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
  options: any;
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
    this.options = {
      height: '250'
    };
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
    this.selectedAppointment = null;
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
  
    this.selectedAppointment = {
      "id": "",
      "patient_id": "",
      "doctor_id": "",
      "service_id": "",
      "clinic_id": "",
      "start": sStartDate,
      "end": sEndDate,
      "created": "",
      "modified": ""
    };

    this.dialogVisible = true;
  }

  updateAppointment(): void {

  }

  deleteAppointment(): void {

  }


}
