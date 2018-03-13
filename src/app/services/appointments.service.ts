import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Appointment } from '../models/appointment';

@Injectable()
export class AppointmentsService {
  private API_HOST: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAppointments(): Promise<any[]> {
    return this.http.get<any>(this.API_HOST+'/api/appointments-service.json')
      .toPromise()
      .then(res => <any[]>res);
  }

  getAppointmentsAsSchedule(): Promise<any[]> {
    return this.getAppointments()
      .then(data => {
        let ret: any[] = [];
        data.forEach(a => {
          ret.push({
            "title": a.patient.fullName,
            "start": a.start,
            "end": a.end,
            "color": a.doctor.color,
            "appointment": {
              "id": a.id,
              "patient_id": a.patient.id,
              "doctor_id": a.doctor.id,
              "service_id": a.service.id,
              "clinic_id": a.clinic.id,
              "start": a.start,
              "end": a.end,
              "created": a.created,
              "modified": a.modified
            }
          })
        });
        return ret;
      });
  }

  createAppointment(a:Appointment): void{
    console.log("Create appointment on Service: " + JSON.stringify(a));
  }

  readAppointment(id: String): void{
    console.log("Read appointment on Service: " + id);
  }

  updateAppointment(a:Appointment): void{
    console.log("Update appointment on Service: " + JSON.stringify(a));
    this.http.post(this.API_HOST+'/api/appointments-service.json', a);
  }

  deleteAppointment(a:Appointment): void{
    console.log("Delete appointment on Service: " + JSON.stringify(a));
  }


}
