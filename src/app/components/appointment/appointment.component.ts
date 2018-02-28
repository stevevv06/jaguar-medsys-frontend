import * as moment from 'moment';
//import * as jquery from 'jquery';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message, SelectItem } from 'primeng/components/common/api';
import { ServicesService } from '../../services/services.service';
import { ClinicsService } from '../../services/clinics.service';
import { DoctorsService } from '../../services/doctors.service';
import { PatientsService } from '../../services/patients.service';
import {Appointment} from '../../models/appointment';


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
  private _appointment: Appointment;
  optionDelete: boolean = false;
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
    //this.patientsService.getPatientsPairList().then(data => this.patientsList = data);

    this.appointmentForm = this.fb.group({
      'patient_id': new FormControl('', Validators.required),
      'service_id': new FormControl('', Validators.required),
      'clinic_id': new FormControl('', Validators.required),
      'doctor_id': new FormControl('', Validators.required),
      'start': new FormControl('', Validators.required),
      'end': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  @Input()
  set appointment(appointment: Appointment) {
    this._appointment = appointment;
    this.updateFormGroup();    
  }
  get appointment(): Appointment { return this._appointment; }

  @Output() onCancel = new EventEmitter<void>();
  cancel(){
    this.onCancel.emit();
  }
  
  @Output() onSave = new EventEmitter<Appointment>();
  save(){
    this.appointment.patient_id = this.appointmentForm.get('patient_id').value;
    this.appointment.service_id = this.appointmentForm.get('service_id').value;
    this.appointment.clinic_id = this.appointmentForm.get('clinic_id').value;
    this.appointment.doctor_id = this.appointmentForm.get('doctor_id').value;
    this.appointment.start = this.appointmentForm.get('start').value;
    this.appointment.end = this.appointmentForm.get('end').value;
    this.onSave.emit(this.appointment);
  }

  @Output() onDelete = new EventEmitter<Appointment>();
  delete(): void{
    this.onDelete.emit();
  }

  updateFormGroup() {
    this.appointmentForm.reset();
    if(this.appointment != null && this.appointment != undefined){
      this.optionDelete = !this.appointment.isNew;
      this.appointmentForm.get('patient_id').setValue(this.appointment.patient_id);
      this.appointmentForm.get('service_id').setValue(this.appointment.service_id);
      this.appointmentForm.get('clinic_id').setValue(this.appointment.clinic_id);
      this.appointmentForm.get('doctor_id').setValue(this.appointment.doctor_id);
      this.appointmentForm.get('start').setValue(new Date(moment(this.appointment.start).format()));
      this.appointmentForm.get('end').setValue(new Date(moment(this.appointment.end).format()));
    }
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
  }

  get diagnostic() { return JSON.stringify(this.appointmentForm.value); }

  searchPatients(event){
      this.patientsService.queryPatients(event.query).then(data => this.patientsList = data);
  }
}