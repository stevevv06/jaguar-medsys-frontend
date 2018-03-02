import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class PatientsService {

  constructor(private http: HttpClient) { }

  getPatients(): Promise<any[]> {
    return this.http.get<any>('assets/services/patients-service.json')
      .toPromise()
      .then(res => <any[]>res.data);
  }

  getPatientsPairList(): Promise<any[]> {
    return this.getPatients()
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

  queryPatients(query: string): Promise<any[]> {
    console.log("queryPatientsPairList with query: " + query);
    let querylc: string = query.toLowerCase();
    return this.getPatients()
      .then(data => {
        let ret: any[] = [];
        ret = data.filter(e => {
         return e.full_name.toLowerCase().indexOf(querylc) >= 0;
        });
        console.log(JSON.stringify(ret));
        return ret;
      });      
  }

}
