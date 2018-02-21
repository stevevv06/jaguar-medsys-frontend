import * as moment from 'moment';
//import * as jquery from 'jquery';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message, SelectItem } from 'primeng/components/common/api';
import { ServicesService } from '../../services/services.service';
import { ClinicsService } from '../../services/clinics.service';
import { DoctorsService } from '../../services/doctors.service';
import { PatientsService } from '../../services/patients.service';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  providers: [
    ServicesService,
    ClinicsService,
    DoctorsService,
    PatientsService
  ]
})
export class AppointmentComponent implements OnInit {
  private _appointment: any;
  msgs: Message[] = [];
  appointmentForm: FormGroup;
  submitted: boolean;
  genders: SelectItem[];
  servicesList: SelectItem[];
  clinicsList: SelectItem[];
  doctorsList: SelectItem[];
  patientsList: SelectItem[];

  constructor(private fb: FormBuilder,
    private servicesService: ServicesService,
    private clinicsService: ClinicsService,
    private doctorsService: DoctorsService,
    private patientsService: PatientsService) {
    this.servicesService.getServicesPairList().then(data => this.servicesList = data);
    this.clinicsService.getClinicsPairList().then(data => this.clinicsList = data);
    this.doctorsService.getDoctorsPairList().then(data => this.doctorsList = data);
    this.patientsService.getPatientsPairList().then(data => this.patientsList = data);

    this.appointmentForm = this.fb.group({
      'patient': new FormControl('', Validators.required),
      'service': new FormControl('', Validators.required),
      'clinic': new FormControl('', Validators.required),
      'doctor': new FormControl('', Validators.required),
      'start': new FormControl('', Validators.required),
      'end': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {

  }

  @Input()
  set appointment(appointment: any) {
    this._appointment = appointment;
    
      this.updateFormGroup();
    
  }
  get appointment(): any { return this._appointment; }

  updateFormGroup() {
    if(this._appointment != null && this._appointment != undefined){
      this.appointmentForm.get('patient').setValue(this.appointment.patient_id);
      this.appointmentForm.get('service').setValue(this.appointment.service_id);
      this.appointmentForm.get('clinic').setValue(this.appointment.clinic_id);
      this.appointmentForm.get('doctor').setValue(this.appointment.doctor_id);
      this.appointmentForm.get('start').setValue(new Date(moment(this.appointment.start).format()));
      this.appointmentForm.get('end').setValue(new Date(moment(this.appointment.end).format()));
    }else{
      this.appointmentForm.reset();
    }
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
  }

  get diagnostic() { return JSON.stringify(this.appointmentForm.value); }

}