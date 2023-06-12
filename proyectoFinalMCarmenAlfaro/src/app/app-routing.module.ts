import { NgModule } from '@angular/core';
import {ContactComponent} from "./contact/contact.component";
import {MenuBarComponent} from "./menu-bar/menu-bar.component";
import {QuienesSomosComponent} from "./quienes-somos/quienes-somos.component";
import {ServiciosComponent} from "./servicios/servicios.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import { PerfilComponent } from './perfil/perfil.component';
import { ClasesComponent } from './clases/clases.component';
import { GestionComponent } from './gestion/gestion.component';
import { CaballoComponent } from './caballo/caballo.component';
import { PagosComponent } from './pagos/pagos.component';
import { RouterModule, Routes } from '@angular/router';
import { SugerenciasReservasComponent } from './sugerencias-reservas/sugerencias-reservas.component';
import { PreciosComponent } from './precios/precios.component';


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
   { path: 'gestion', component: GestionComponent },
   { path: 'caballos', component: CaballoComponent },
   { path: 'pagos', component: PagosComponent },
   { path: 'precios', component: PreciosComponent },
   { path: 'sugerencias-reservas', component: SugerenciasReservasComponent },
   { path: 'clases', component: ClasesComponent },
   {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
