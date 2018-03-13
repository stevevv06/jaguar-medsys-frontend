import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class PatientsService {
  private API_HOST: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getPatient(id: string): Promise<any> {
    console.log("getPatient id " + id)
    return this.getPatients()
      .then(data => {
        let ret: any = null;
        ret = data.filter(e => {
         return e.id === id;
        });        
        console.log(JSON.stringify(ret));
        return ret[0];
      });
  }

  getPatients(): Promise<any[]> {
    return this.http.get<any>(this.API_HOST+'/api/patients-service.json')
      .toPromise()
      .then(res => <any[]>res);
  }

  getPatientsPairList(): Promise<any[]> {
    return this.getPatients()
      .then(data => {
        let ret: any[] = [];
        data.forEach(e => {
          ret.push({
            "label": e.fullName,
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
         return e.fullName.toLowerCase().indexOf(querylc) >= 0;
        });
        console.log(JSON.stringify(ret));
        return ret;
      });      
  }

}
