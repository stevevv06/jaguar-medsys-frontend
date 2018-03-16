import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PatientsService {
  private API_HOST: string = 'http://localhost:8080';
  private API: string = this.API_HOST + '/patients';

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

  getAllLazy(filter: any, page: any, size: any, sort: any): Observable<any> {
    let search = this.API+'/search/findByTitle';
    let filterStr: string = 'title=' + (filter != null? filter : '');
    let sortStr: string;
    if(page != null || size != null || sort != null){
      sortStr = 'page=' + page + '&size=' + size + '&sort=' + sort;
    }
    search += '?' + filterStr + '&' + sortStr;
    return this.http.get<any>(search);
  } 

  getPatientsPairList(): Promise<any[]> {
    return this.getPatients()
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

  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(patient: any): Observable<any> {
    let result: Observable<Object>;
    if (patient['href']) {
      result = this.http.put(patient.href, patient);
    } else {
      result = this.http.post(this.API, patient);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }

}
