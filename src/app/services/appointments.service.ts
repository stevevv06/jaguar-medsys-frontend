import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Appointment } from '../models/appointment';

@Injectable()
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  getAppointments(): Promise<any[]> {
    return this.http.get<any>('assets/services/appointments-service.json')
      .toPromise()
      .then(res => <any[]>res.data);
  }

  createAppointment(a:Appointment): void{
    console.log("Create appointment on Service: " + JSON.stringify(a));
  }

  readAppointment(id: String): void{
    console.log("Read appointment on Service: " + id);
  }

  updateAppointment(a:Appointment): void{
    console.log("Update appointment on Service: " + JSON.stringify(a));
  }

  deleteAppointment(a:Appointment): void{
    console.log("Delete appointment on Service: " + JSON.stringify(a));
  }


}
