import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactComponent} from "./contact/contact.component";
import {MenuBarComponent} from "./menu-bar/menu-bar.component";
import {QuienesSomosComponent} from "./quienes-somos/quienes-somos.component";
import {ServiciosComponent} from "./servicios/servicios.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import { PerfilComponent } from './perfil/perfil.component';
import { ClasesComponent } from './clases/clases.component';
import { PrivadosComponent } from './privados/privados.component';
import { GestionComponent } from './gestion/gestion.component';
import { CaballoComponent } from './caballo/caballo.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'menu-bar', component: MenuBarComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'clases', component: ClasesComponent },
  { path: 'privados', component: PrivadosComponent }, 
   { path: 'gestion', component: GestionComponent },
   { path: 'caballos', component: CaballoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
