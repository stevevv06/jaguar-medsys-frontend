import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class ServicesService {

  constructor(private http: HttpClient) { }

  getServices(): Promise<any[]> {
    return this.http.get<any>('assets/services/services-service.json')
      .toPromise()
      .then(res => <any[]>res.data);
    //.then(data => { return data; });
  }

  getServicesPairList(): Promise<any[]> {
    return this.getServices()
      .then(data => {
        let ret: any[] = [];
        data.forEach(e => {
          ret.push({
            "label": e.service,
            "value": e.id
          })
        });
        return ret;
      });
  }
}