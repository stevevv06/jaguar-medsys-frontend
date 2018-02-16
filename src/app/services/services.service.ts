import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class ServicesService {

  constructor(private http:HttpClient) { }

  getServices(): Promise<any[]> {
    return this.http.get<any>('assets/services/services-service.json')
                .toPromise()
                .then(res => <any[]>res.data);
                //.then(data => { return data; });
  }
}
