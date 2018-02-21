import 'jquery';
import 'moment';
import 'fullcalendar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PanelModule} from 'primeng/components/panel/panel';
import {ScheduleModule} from 'primeng/components/schedule/schedule';
import {DialogModule} from 'primeng/components/dialog/dialog';
import {ButtonModule} from 'primeng/components/button/button';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {CalendarModule} from 'primeng/components/calendar/calendar';
import {GrowlModule} from 'primeng/components/growl/growl';
import {DropdownModule} from 'primeng/components/dropdown/dropdown';
import {MessageModule} from 'primeng/components/message/message';
import {ToolbarModule} from 'primeng/components/toolbar/toolbar';

import {AppComponent} from './app.component';
import {AgendaComponent} from './components/agenda/agenda.component';
import {AppointmentComponent} from './components/appointment/appointment.component';

//import {EventService} from "./services/event.service"


@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    AppointmentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PanelModule,
    ScheduleModule,    
    DialogModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    CalendarModule,
    GrowlModule,
    DropdownModule,
    MessageModule,
    ToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
