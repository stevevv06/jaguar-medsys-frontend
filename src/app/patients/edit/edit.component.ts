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
  calculatedAge:string;

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
      this.patientsService.get(id).subscribe((data: any) => {
        if (data) {           
          this.current = data;
          this.current.href = data._links.self.href;
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
    console.log(JSON.stringify(this.current));
    if(this.current){
      this.editForm.patchValue({
        names: this.current.names,
        surnames: this.current.surnames,
        //gender: this.current.gender,
        birthDate: new Date(this.current.birthDate),
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
    this.current.names = formModel.names
    this.current.surnames = formModel.surnames
    this.current.gender = formModel.gender
    this.current.birthDate = formModel.birthDate
    this.current.address = formModel.address
    this.current.workplace = formModel.workplace
    this.current.phone1 = formModel.phone1
    this.current.phone2 = formModel.phone2
    this.current.email = formModel.email
    this.current.desease = formModel.desease
    this.current.allergies = formModel.allergies
    this.current.reasonForConsultation = formModel.reasonForConsultation
    this.current.lastVisitToMedic = formModel.lastVisitToMedic
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
