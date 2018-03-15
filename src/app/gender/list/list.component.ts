import { Component, OnInit } from '@angular/core';
import { GendersService } from '../../services/genders.service';
import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  data: any[];
  cols: any[];
  page: any;
  loading: boolean = false;

  constructor(private service: GendersService) { }

  ngOnInit() {
    this.data = [];

    this.cols = [      
      {field: 'gender', header: 'Genero'},
      {field: 'created', header: 'Creado'},
      {field: 'modified', header: 'Modificado'}];
  }

  
  loadLazy(event: LazyLoadEvent) {  

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    //this.loading = true;
    let pageCalc = event.first/event.rows;
    let sortStr = event.sortField?
      event.sortField+','+ (event.sortOrder == 1?'asc':'desc') : 
      '';    
    this.service.getAllLazy(pageCalc, event.rows, sortStr).subscribe(
      data => {        
        //this.loading = false;
        this.data = data._embedded.genders;      
        this.page = data.page;
                
      }
    );
}

}
