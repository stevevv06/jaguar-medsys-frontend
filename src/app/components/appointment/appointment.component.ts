import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message, SelectItem } from 'primeng/components/common/api';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  msgs: Message[] = [];

  appointmentForm: FormGroup;

  submitted: boolean;

  genders: SelectItem[];

  description: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      'patient': new FormControl('', Validators.required),
      'service': new FormControl('', Validators.required),
      'start': new FormControl('',  Validators.required),
      'end': new FormControl('', Validators.required)
    });

 
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
  }

  get diagnostic() { return JSON.stringify(this.appointmentForm.value); }

}