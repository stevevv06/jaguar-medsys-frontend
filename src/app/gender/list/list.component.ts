import 'rxjs/add/operator/finally';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LazyLoadEvent} from 'primeng/components/common/api';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {GendersService} from '../../services/genders.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  mPath:string = '/genders';
  data: any[];
  cols: any[];
  page: any;
  loading: boolean = true;

  constructor(
    private service: GendersService,
    private messageService: MessageService) {}

  ngOnInit() {
    this.data = [];

    this.cols = [      
      {field: 'title',    header: 'Genero',     type: 'string'},
      {field: 'created',  header: 'Creado',     type: 'date'},
      {field: 'modified', header: 'Modificado', type: 'date'}];
 }

  
  loadLazy(event: LazyLoadEvent) { 
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    this.loading = true;
    console.log(JSON.stringify(event));
    let pageCalc = event.first/event.rows;
    let sortStr = event.sortField?
      event.sortField+','+ (event.sortOrder == 1?'asc':'desc') : 
      '';    
    let filterStr = event.globalFilter;
    this.service.getAllLazy(filterStr, pageCalc, event.rows, sortStr)
    .finally(() => this.loading = false)
    .subscribe(
      data => {
        this.data = data._embedded.genders;      
        this.page = data.page;                
     },
     error => this.messageService.add({severity:'error', summary:'Error al obtener datos', detail:JSON.stringify(error)})
    );
}

}
