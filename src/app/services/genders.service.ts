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

  getAllPairList(): Promise<any[]> {
    return this.getAll().toPromise()
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
