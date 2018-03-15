import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {PanelModule} from 'primeng/components/panel/panel';
import {ButtonModule} from 'primeng/components/button/button';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
import {TableModule} from 'primeng/components/table/table';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {GrowlModule} from 'primeng/components/growl/growl';
import {DropdownModule} from 'primeng/components/dropdown/dropdown';
import {MessageModule} from 'primeng/components/message/message';
import {ToolbarModule} from 'primeng/components/toolbar/toolbar';

import {GenderRoutingModule} from './gender-routing.module';
import {GendersService} from '../services/genders.service';
import {EditComponent} from './edit/edit.component';
import {ListComponent} from './list/list.component';
import {ViewComponent} from './view/view.component';


@NgModule({
  imports: [    
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PanelModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    InputTextModule,
    GrowlModule,
    DropdownModule,
    MessageModule,
    ToolbarModule,
    GenderRoutingModule
  ],
  declarations: [    
    EditComponent,
    ListComponent,
    ViewComponent
  ],
  providers: [ GendersService ]
})
export class GenderModule { }
