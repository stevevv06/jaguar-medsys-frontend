import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {PatientsService} from '../../services/patients.service';
import {GendersService} from '../../services/genders.service';


@Component({
  selector: 'patients-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [
    GendersService
  ]
})
export class EditComponent implements OnInit, OnDestroy {
  mPath:string = '/patients';
  current: any = {};
  editForm: FormGroup;
  sub: Subscription;
  isNew:boolean = false;

  gendersList:any[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientsService: PatientsService,
    private gendersService: GendersService,
    private messageService: MessageService) {
      this.gendersService.getAllPairList().then(data => this.gendersList = data);
      this.createForm();
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
    const id = params['id'];
    this.isNew = true; 
    if (id) {
      this.isNew = false; 
      this.patientsService.get(id).subscribe((gender: any) => {
        if (gender) {           
          this.current = gender;
          this.current.href = gender._links.self.href;
          this.updateForm();            
       } else {
        this.messageService.add({severity:'warn', summary:'Registro no encontrado', detail:'Registro no encontrado'});
          this.gotoList();
       }
     },
     error => {
       this.messageService.add({severity:'warn', summary:'Registro no encontrado', detail:'Registro no encontrado'});
       this.gotoList();
     });
   }
   });
 }

  createForm() {
    this.editForm = this.fb.group({
      names: ['', Validators.required ],
      surnames: ['', Validators.required ],
      gender: ['', Validators.required ],
      birthDate: ['', Validators.required ],
      address: ['', Validators.required ],
      workplace: ['', Validators.required ],
      phone1: ['', Validators.required ],
      phone2: ['', Validators.required ],
      email: ['', Validators.required ],
      desease: ['', Validators.required ],
      allergies: ['', Validators.required ],
      reasonForConsultation: ['', Validators.required ],
      lastVisitToMedic: ['', Validators.required ]
   });
 }

  updateForm(){
    if(this.current){
      this.editForm.setValue({
        names: this.current.names,
        surnames: this.current.surnames,
        gender: this.current.gender,
        birthDate: this.current.birthDate,
        address: this.current.address,
        workplace: this.current.workplace,
        phone1: this.current.phone1,
        phone2: this.current.phone2,
        email: this.current.email,
        desease: this.current.desease,
        allergies: this.current.allergies,
        reasonForConsultation: this.current.reasonForConsultation,
        lastVisitToMedic: this.current.lastVisitToMedic
     });
   }
 }

  prepareSave(){
    const formModel = this.editForm.value;
    this.current.title = formModel.title;
 }

  ngOnDestroy(){
    this.sub.unsubscribe(); 
 }

  gotoList() {
    this.router.navigate([this.mPath+'/list']);
 }

  save() {
    this.prepareSave();
    this.patientsService.save(this.current).subscribe(result => {
      this.messageService.add({severity:'success', summary:'Registro guardado exitosamente', detail: this.current.title});
      this.gotoList();
   }, error => {
    this.messageService.add({severity:'error', summary:'Error al guardar Registro', detail: this.current.title});    
   });
 }

  remove(href) {
    this.patientsService.remove(href).subscribe(result => {
      this.messageService.add({severity:'success', summary:'Registro borrado'});
      this.gotoList();
   }, error => this.messageService.add({severity:'error', summary:'Error al borrar'}));
 }
}
