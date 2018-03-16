import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {PatientsService} from '../../services/patients.service';


@Component({
  selector: 'patients-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  mPath:string = '/patients';
  current: any = {};
  editForm: FormGroup;
  sub: Subscription;
  isNew:boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientsService: PatientsService,
    private messageService: MessageService) {
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
      title: ['', Validators.required ],
   });
 }

  updateForm(){
    if(this.current){
      this.editForm.setValue({
        title: this.current.title
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
