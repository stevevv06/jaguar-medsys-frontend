import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class ClinicsService {
  private API_HOST: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getClinics(): Promise<any[]> {
    return this.http.get<any>(this.API_HOST+'/api/clinics-service.json')
      .toPromise()
      .then(res => <any[]>res);
    //.then(data => { return data; });
  }

  getClinicsPairList(): Promise<any[]> {
    return this.getClinics()
      .then(data => {
        let ret: any[] = [];
        data.forEach(e => {
          ret.push({
            "label": e.clinic,
            "value": e.id
          })
        });
        return ret;
      });
  }
}
