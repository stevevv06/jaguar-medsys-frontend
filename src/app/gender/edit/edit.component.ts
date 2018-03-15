import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { GendersService } from '../../services/genders.service';


@Component({
  selector: 'gender-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  gender: any = {};
  sub: Subscription;
  isNew:boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private gendersService: GendersService,) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
    const id = params['id'];
    this.isNew = true; 
    if (id) {
      this.isNew = false; 
      this.gendersService.get(id).subscribe((gender: any) => {
        if (gender) {            
          this.gender = gender;
          this.gender.href = gender._links.self.href;            
        } else {
          console.log(`Gender with id '${id}' not found, returning to list`);
          this.gotoList();
        }
      });
    }
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe(); 
  }

  gotoList() {
    this.router.navigate(['/genders/list']);
  }

  save(form: NgForm) {
    this.gendersService.save(this.gender).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.gendersService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}
