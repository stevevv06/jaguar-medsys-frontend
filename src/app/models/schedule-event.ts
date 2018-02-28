import { Appointment } from "./appointment";

export class ScheduleEvent {

    public title:string;
    public start:string;
    public end: string;
    public color:string;
    public appointment: Appointment

    constructor(
        event: any
    ){
        this.title = event.title;
        this.start = event.start;
        this.end = event.end;
        this.appointment = event.appointment;
    };
}
