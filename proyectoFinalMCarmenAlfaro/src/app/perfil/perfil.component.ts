import { Component, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { LoginService } from '../login/login.service';
import { UserProfile } from '../entities/userProfile/userProfile.interface';
import { FieldsetModule } from 'primeng/fieldset';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact/contact.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  datosUser: any;
  datosPagos: any;
  userType=false;
  formClass= false;
  formBarn = false;
  usuario: UserProfile = JSON.parse(window.localStorage.getItem('user'));
  alumno = this.usuario.userType == 'Alumno';
  dueño = this.usuario.userType == 'Dueño';
  admin = this.usuario.userType == 'Admin';
  changeForm = new FormGroup({
    peticion: new FormControl('', Validators.required),
  });
  formularioCambios: any;
  showForm=false;
  messageService: any;
  constructor(
    public perfilService: PerfilService,
    public loginService: LoginService,
    public contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.readUserLocalStorage();
    this.readUserById();
    this.readMoneyMonth();
  }

  readUserLocalStorage() {
    if (this.alumno) {
      this.readUserClass();
      this.formClass = true;
    } else if (this.dueño) {
      this.userType = true;
      this.formBarn = true;
    } else if (this.admin) {
      this.userType = true;
    }
  }
  readUserById() {
    this.usuario = JSON.parse(window.localStorage.getItem('user'));
    console.log(this.usuario);
    this.perfilService.getReadById(this.usuario.userId).subscribe((rs) => {
      this.datosUser = rs;
      console.log(this.datosUser);
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
        console.log(this.datosPagos);
      });
  }
  mostrarFormulario(){
    this.showForm=true;
  }
  insertComent() {
    if (this.alumno) {
      this.formularioCambios = {
        commentType: 'Cambio clase',
        userName: this.usuario.userName,
        emailUser: this.usuario.emailAddress,
        peticion: this.changeForm.value.peticion,
      };
    }else if(this.dueño){
      this.formularioCambios = {
        commentType: 'Cambio cuadra',
        userName: this.usuario.userName,
        emailUser: this.usuario.emailAddress,
        peticion: this.changeForm.value.peticion,
      };
    }
    console.log(this.formularioCambios)
    this.contactService.insertSuggestions(this.formularioCambios).subscribe(rs=>{
      (rs)
        if (rs) {
          console.log('Ok');
          this.showForm=false;
          this.messageService.add({
            severity: 'info',
            summary: 'Insercción correcta',
            detail: 'Caballo creado correctamente.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'Error al intentar insertar el caballo',
          });
        }
      });
  }

}
