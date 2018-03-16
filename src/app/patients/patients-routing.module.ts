import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {EditComponent} from './edit/edit.component';
import {ViewComponent} from './view/view.component';


const routes: Routes = [
  { path: 'patients',          component: ListComponent },
  { path: 'patients/list',     component: ListComponent },
  { path: 'patients/create',   component: EditComponent },
  { path: 'patients/edit/:id', component: EditComponent },
  { path: 'patients/view/:id', component: ViewComponent }

   
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(
      routes
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class PatientsRoutingModule { }
