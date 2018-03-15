import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AgendaComponent} from '../../components/agenda/agenda.component';
import {AppointmentComponent} from '../../components/appointment/appointment.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/agenda', pathMatch: 'full' },
  { path: 'agenda', component: AgendaComponent},
  { path: '**', component: AgendaComponent }, //always last
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
