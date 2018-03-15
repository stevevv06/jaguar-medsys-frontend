import 'jquery';
import 'moment';
import 'fullcalendar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
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
import {AutoCompleteModule} from 'primeng/components/autocomplete/autocomplete';
import {MatButtonModule,MatDividerModule,MatIconModule,MatListModule,MatMenuModule,MatRippleModule,MatSidenavModule,MatToolbarModule} from '@angular/material';

import {AppRoutingModule} from './modules/app-routing/app-routing.module';
import {AppComponent} from './app.component';
import {AgendaComponent} from './components/agenda/agenda.component';
import {AppointmentComponent} from './components/appointment/appointment.component';
import {SidenavmenuComponent} from './components/sidenavmenu/sidenavmenu.component';

import {GenderModule} from './gender/gender.module';



@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    AppointmentComponent,
    SidenavmenuComponent
  ],
  imports: [    
    GenderModule,
    AppRoutingModule,    
    BrowserModule,
    BrowserAnimationsModule,    
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
    ToolbarModule,
    AutoCompleteModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
