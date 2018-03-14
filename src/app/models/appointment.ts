export class Appointment {
    id: string;
    patientId: string;
    doctorId: string;
    serviceId: string;
    clinicId: string;
    start: string;
    end: string;
    created: string;
    modified: string;

    constructor(
        appointment: any
    ){
        this.id = appointment.id;
        this.patientId = appointment.patientId;
        this.doctorId = appointment.doctorId;
        this.serviceId = appointment.serviceId;
        this.clinicId = appointment.clinicId;
        this.start = appointment.start;
        this.end = appointment.end;
        this.created = appointment.created;
        this.modified = appointment.modified;
    };

    public isNew() : boolean{
        let ret: boolean = true;
        if(this.id != null && this.id.length > 0){
            ret = false;
        }
        return ret;
    };
}
