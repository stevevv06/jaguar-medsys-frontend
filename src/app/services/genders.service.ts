import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GendersService {
  private API_HOST: string = 'http://localhost:8080';
  private API: string = this.API_HOST + '/genders';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  getAllLazy(page: any, size: any, sort: any): Observable<any> {
    let bu = this.API;
    if(page != null || size != null || sort != null){
      bu = bu + '?page=' + page + '&size=' + size + '&sort=' + sort;
    }
    return this.http.get<any>(bu);
  }

  getAllPairList(): Promise<any[]> {
    return this.getAll().toPromise()
      .then(data => {
        let ret: any[] = [];
        data.forEach(e => {
          ret.push({
            "label": e.gender,
            "value": e.id
          })
        });
        return ret;
    });
  }

  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(gender: any): Observable<any> {
    let result: Observable<Object>;
    if (gender['href']) {
      result = this.http.put(gender.href, gender);
    } else {
      result = this.http.post(this.API, gender);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
