import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../services/perfil.service';
import { LoginService } from '../services/login.service';
import { UserProfile } from '../entities/userProfile/userProfile.interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
   usuario : UserProfile;
   datosUser: UserProfile;
  constructor(public perfilService: PerfilService, public loginService: LoginService) { }

  ngOnInit(): void {
    this.readUserById();
  }
readUserById(){

  this.usuario = JSON.parse(window.localStorage.getItem("user"));

  this.perfilService.getReadById(this.usuario.userId).subscribe(rs=>{
this.datosUser= rs;
  })

}
}
