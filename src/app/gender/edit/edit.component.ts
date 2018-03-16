import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { GendersService } from '../../services/genders.service';


@Component({
  selector: 'gender-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  current: any = {};
  editForm: FormGroup;
  sub: Subscription;
  isNew:boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gendersService: GendersService) {
      this.createForm();
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
    const id = params['id'];
    this.isNew = true; 
    if (id) {
      this.isNew = false; 
      this.gendersService.get(id).subscribe((gender: any) => {
        if (gender) {            
          this.current = gender;
          this.current.href = gender._links.self.href;
          this.updateForm();            
        } else {
          console.log(`Gender with id '${id}' not found, returning to list`);
          this.gotoList();
        }
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
    this.router.navigate(['/genders/list']);
  }

  save() {
    this.prepareSave();
    this.gendersService.save(this.current).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.gendersService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}
