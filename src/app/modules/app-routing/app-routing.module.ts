import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AgendaComponent} from '../../components/agenda/agenda.component';
import {AppointmentComponent} from '../../components/appointment/appointment.component';

const appRoutes: Routes = [
  { path: 'agenda', component: AgendaComponent},
  { path: 'appointment', component: AppointmentComponent},
  { path: '',   redirectTo: '/agenda', pathMatch: 'full' },
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
