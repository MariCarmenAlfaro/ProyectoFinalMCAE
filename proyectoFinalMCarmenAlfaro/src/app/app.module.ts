import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContactComponent } from './contact/contact.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { PerfilComponent } from './perfil/perfil.component';
import { CaballoComponent } from './caballo/caballo.component';
import { ClasesComponent } from './clases/clases.component';
import { GestionComponent } from './gestion/gestion.component';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FieldsetModule } from 'primeng/fieldset';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { PagosComponent } from './pagos/pagos.component';
import { SugerenciasReservasComponent } from './sugerencias-reservas/sugerencias-reservas.component';
import { PreciosComponent } from './precios/precios.component';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { LoadingHorseComponent } from './loading-horse/loading-horse.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CommonService } from './common.service';

import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ContactComponent,
    MenuBarComponent,
    QuienesSomosComponent,
    ServiciosComponent,
    HomeComponent,
    LoginComponent,
    PerfilComponent,
    CaballoComponent,
    ClasesComponent,
    GestionComponent,
    PagosComponent,
    SugerenciasReservasComponent,
    PreciosComponent,
    LoadingHorseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule, 
    DialogModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    ProgressSpinnerModule,
    FieldsetModule,
    SidebarModule,
    DropdownModule,
    CheckboxModule,
    PanelModule,
    FormsModule,
    TabViewModule,
    AccordionModule 
  

    
  ],

  providers: [
    DialogService,
  CommonService,
  ConfirmationService,
   MessageService
],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
