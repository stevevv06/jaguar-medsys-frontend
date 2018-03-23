import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {PatientsService} from '../../services/patients.service';

@Component({
  selector: 'patients-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  mPath:string = '/patients';
  current: any = {};
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientsService: PatientsService,
    private messageService: MessageService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];      
      if (id) {       
        this.patientsService.get(id).subscribe(
          (data: any) => {
            if (data) {           
              this.current = data;
              this.current.href = data._links.self.href;            
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
    this.patientsService.remove(href).subscribe(result => {
      this.messageService.add({severity:'success', summary:'Registro borrado'});
      this.gotoList();
   }, error => this.messageService.add({severity:'error', summary:'Error al borrar'}));
 }

}
