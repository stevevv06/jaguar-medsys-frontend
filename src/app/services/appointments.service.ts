import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  getAppointments(): Promise<any[]> {
    return this.http.get<any>('assets/services/appointments-service.json')
      .toPromise()
      .then(res => <any[]>res.data);
  }

}
