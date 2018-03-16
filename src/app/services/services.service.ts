import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class ServicesService {
  private API_HOST: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getServices(): Promise<any[]> {
    return this.http.get<any>(this.API_HOST+'/api/services-service.json')
      .toPromise()
      .then(res => <any[]>res);
    //.then(data => { return data; });
  }

  getServicesPairList(): Promise<any[]> {
    return this.getServices()
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
