import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {EditComponent} from './edit/edit.component';
import {ViewComponent} from './view/view.component';


const routes: Routes = [
  { path: 'genders',          component: ListComponent },
  { path: 'genders/list',     component: ListComponent },
  { path: 'genders/create',   component: EditComponent },
  { path: 'genders/edit/:id', component: EditComponent },
  { path: 'genders/view/:id', component: ViewComponent }

   
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
export class GenderRoutingModule { }
