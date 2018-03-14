import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Appointment } from '../models/appointment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppointmentsService {
  private API_HOST: string = 'http://localhost:8080';
  private API_SERVICE: string = this.API_HOST+'/api/appointments-service.json';

  constructor(private http: HttpClient) { }

  getAppointments(): Promise<any[]> {
    return this.http.get<any>(this.API_SERVICE)
      .toPromise()
      .then(res => <any[]>res);
  }

  getAppointmentsSchedule(): Promise<any[]> {
    return this.http.get<any>(this.API_HOST+'/api/appointments-schedule-service.json')
      .toPromise()
      .then(res => <any[]>res);
  }

  createAppointment(a:Appointment): void{
    console.log("Create appointment on Service: " + JSON.stringify(a));
    let result: Observable<Object>;
    result = this.http.put(this.API_HOST+'/appointments', a);
    console.log(JSON.stringify(result));
  }

  readAppointment(id: String): void{
    console.log("Read appointment on Service: " + id);
  }

  updateAppointment(a:Appointment): void{
    console.log("Update appointment on Service: " + JSON.stringify(a));
    this.http.post(this.API_SERVICE, a);
  }

  deleteAppointment(a:Appointment): void{
    console.log("Delete appointment on Service: " + JSON.stringify(a));
  }


}
