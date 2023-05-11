import { Component, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { LoginService } from '../services/login.service';
import { UserProfile } from '../entities/userProfile/userProfile.interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  usuario: UserProfile;
  datosUser: any;
  userType: boolean=false;
  constructor(
    public perfilService: PerfilService,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.readUserLocalStorage();
    this.usuario = JSON.parse(window.localStorage.getItem('user'));
  }
  readUserLocalStorage() {
    
    console.log();
    if(this.usuario.userType=="Alumno"){
      this.readUserClass();
    }else if(this.usuario.userType=="Dueño"){

    }
  }
  readUserClass() {
    this.perfilService.getReadByIdExtendedAlumno(this.usuario.userId).subscribe((rs) => {
      this.datosUser = rs;
    });
  }
  readUserById(){
    this.perfilService.getReadById(this.usuario.userId).subscribe((rs) => {
      this.datosUser = rs;
    });
    this.userType=true;
  }
}
