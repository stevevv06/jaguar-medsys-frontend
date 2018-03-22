import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {PanelModule} from 'primeng/components/panel/panel';
import {ButtonModule} from 'primeng/components/button/button';
import {CalendarModule} from 'primeng/components/calendar/calendar';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
import {TableModule} from 'primeng/components/table/table';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {GrowlModule} from 'primeng/components/growl/growl';
import {MessageModule} from 'primeng/components/message/message';
import {MessageService} from 'primeng/components/common/messageservice';
import {DropdownModule} from 'primeng/components/dropdown/dropdown';

import {PatientsRoutingModule} from './patients-routing.module';
import {PatientsService} from '../services/patients.service';
import {EditComponent} from './edit/edit.component';
import {ListComponent} from './list/list.component';
import {ViewComponent} from './view/view.component';


@NgModule({
  imports: [    
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    PanelModule,
    ButtonModule,
    CalendarModule,
    TooltipModule,
    TableModule,
    InputTextModule,
    GrowlModule,
    DropdownModule,
    MessageModule,
    PatientsRoutingModule
  ],
  declarations: [    
    EditComponent,
    ListComponent,
    ViewComponent
  ],
  providers: [
    PatientsService,
    MessageService
  ]
})
export class PatientsModule { }
