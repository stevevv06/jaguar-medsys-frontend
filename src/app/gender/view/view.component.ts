import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {GendersService} from '../../services/genders.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  mPath:string = '/genders';
  current: any = {};
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gendersService: GendersService,
    private messageService: MessageService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];      
      if (id) {       
        this.gendersService.get(id).subscribe(
          (gender: any) => {
            if (gender) {           
              this.current = gender;
              this.current.href = gender._links.self.href;            
            } else {            
              this.messageService.add({severity:'warn', summary:'Registro no encontrado', detail:'Registro no encontrado'});
              this.gotoList();
            }
          },
          error => {
            this.messageService.add({severity:'warn', summary:'Registro no encontrado', detail:'Registro no encontrado'});
            this.gotoList();
          }
        );
       }
     });   
 }

  ngOnDestroy(){
    this.sub.unsubscribe(); 
 }

  gotoList() {
    this.router.navigate([this.mPath+'/list']);
 }

  remove(href) {
    this.gendersService.remove(href).subscribe(result => {
      this.messageService.add({severity:'success', summary:'Registro borrado'});
      this.gotoList();
   }, error => this.messageService.add({severity:'error', summary:'Error al borrar', detail:error}));
 }

}
