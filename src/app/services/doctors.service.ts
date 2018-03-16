import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class DoctorsService {
  private API_HOST: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getDoctors(): Promise<any[]> {
    return this.http.get<any>(this.API_HOST+'/api/doctors-service.json')
      .toPromise()
      .then(res => <any[]>res);
  }

  getDoctorsPairList(): Promise<any[]> {
    return this.getDoctors()
      .then(data => {
        let ret: any[] = [];
        data.forEach(e => {
          ret.push({
            "label": e.title,
            "value": e.id
          })
        });
        return ret;
      });
  }
}
