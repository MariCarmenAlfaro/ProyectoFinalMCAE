import { Component, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { LoginService } from '../login/login.service';
import { UserProfile } from '../entities/userProfile/userProfile.interface';
import { FieldsetModule } from 'primeng/fieldset';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  usuario: UserProfile;
  datosUser: any;
  datosPagos:any;
  userType: boolean = false;
  constructor(
    public perfilService: PerfilService,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.readUserLocalStorage();
    this.readUserById();
    this.readMoneyMonth();
  }

  readUserLocalStorage() {
    this.usuario = JSON.parse(window.localStorage.getItem('user'));
 
    if (this.usuario.userType == 'Alumno') {
      this.readUserClass();
    } else if (
      this.usuario.userType == 'Dueño' ||
      this.usuario.userType == 'Admin'
    ) {
      this.userType = true;
    }
  }
  readUserById() {
    this.usuario = JSON.parse(window.localStorage.getItem('user'));
    console.log(this.usuario)
    this.perfilService.getReadById(this.usuario.userId).subscribe((rs) => {
      this.datosUser = rs;
      console.log(this.datosUser)
    });
  }
  readUserClass() {
    this.usuario = JSON.parse(window.localStorage.getItem('user'));
    this.perfilService
      .getReadByIdExtendedAlumno(this.usuario.userId)
      .subscribe((rs) => {
        this.datosUser = rs;
      });
  }
  readMoneyMonth() {
    this.usuario = JSON.parse(window.localStorage.getItem('user'));
    this.perfilService
      .getReadMoneyMonthById(this.usuario.userId)
      .subscribe((rs) => {
        this.datosPagos = rs;
        console.log(this.datosPagos)
      });
  }
}
