import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { StyleManager } from './style-manager/style-manager';
import { HomeComponent } from '../home/home.component';
import { ServicesComponent } from '../services/services.component';
import { ProductsComponent } from '../products/products.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { WebSpeechComponent } from '../web-speech/web-speech.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  declarations: [
    HomeComponent,
    ServicesComponent,
    ProductsComponent,
    AboutusComponent,
    NavbarComponent,
    WebSpeechComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  exports: [
    MaterialModule,
    HomeComponent,
    ServicesComponent,
    ProductsComponent,
    AboutusComponent,
    NavbarComponent,
    WebSpeechComponent
  ],
  providers: [
    StyleManager
  ]
})
export class SharedModule { }
