import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class DoctorsService {

  constructor(private http: HttpClient) { }

  getDoctors(): Promise<any[]> {
    return this.http.get<any>('assets/services/doctors-service.json')
      .toPromise()
      .then(res => <any[]>res.data);
  }

  getDoctorsPairList(): Promise<any[]> {
    return this.getDoctors()
      .then(data => {
        let ret: any[] = [];
        data.forEach(e => {
          ret.push({
            "label": e.full_name,
            "value": e.id
          })
        });
        return ret;
      });
  }
}
