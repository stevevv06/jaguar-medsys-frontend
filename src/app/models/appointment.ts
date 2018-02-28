export class Appointment {
    id: string;
    patient_id: string;
    doctor_id: string;
    service_id: string;
    clinic_id: string;
    start: string;
    end: string;
    created: string;
    modified: string;

    constructor(
        appointment: any
    ){
        this.id = appointment.id;
        this.patient_id = appointment.patient_id;
        this.doctor_id = appointment.doctor_id;
        this.service_id = appointment.service_id;
        this.clinic_id = appointment.clinic_id;
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
