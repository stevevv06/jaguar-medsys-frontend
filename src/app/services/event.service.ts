import { Injectable } from '@angular/core';
import { ScheduleEvent } from '../models/schedule-event';

@Injectable()
export class EventService {
  events:any[] = null;

  constructor() { }

  getEvents():ScheduleEvent[]{
    if(this.events == null){
      this.events = [
        {"id":"001","title":"Luis Lopez","start":"2018-02-15T08:00","end":"2018-02-07T09:00","color":""},
        {"id":"002","title":"Pedro Perez","start":"2018-02-15T08:00","end":"2018-02-07T09:00","color":"red"},
        {"id":"003","title":"Maria Martinez","start":"2018-02-13T08:00","end":"2018-02-13T08:30","color":""},
        {"id":"004","title":"Beto Beltran","start":"2018-02-13T09:30","end":"2018-02-13T10:00","color":""}
      ];
    }
    return this.events;
  }

}
