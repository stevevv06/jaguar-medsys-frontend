import { Component, OnInit } from '@angular/core';
import { GendersService } from '../../services/genders.service';
import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  genders: any[];
  cols: any[];
  page: any;
  loading: boolean = false;

  constructor(private gendersService: GendersService) { }

  ngOnInit() {
    this.genders = [];

    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'gender', header: 'Gender'},
      {field: 'created', header: 'Created'},
      {field: 'modified', header: 'Modified'}];
  }

  
  loadLazy(event: LazyLoadEvent) {  

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    this.loading = true;
    let pageCalc = event.first/event.rows;
    let sortStr = event.sortField?
      event.sortField+','+ (event.sortOrder == 1?'asc':'desc') : 
      '';    
    this.gendersService.getAllLazy(pageCalc, event.rows, sortStr).subscribe(
      data => {        
        this.loading = false;
        this.genders = data._embedded.genders;      
        this.page = data.page;        
      }
    );
}

}
