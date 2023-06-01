import { Component, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { LoginService } from '../login/login.service';
import { UserProfile } from '../entities/userProfile/userProfile.interface';
import { FieldsetModule } from 'primeng/fieldset';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactService } from '../contact/contact.service';
import { PagosService } from '../pagos/pagos.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  datosUser: any;
  datosClases
  datosPagos = [];
  userType = false;
  formClass = false;
  formBarn = false;
  btnSolicitud = false;
  paymentForm: FormGroup;
  usuario: UserProfile = JSON.parse(window.localStorage.getItem('user'));
  alumno = this.usuario.userType == 'Alumno';
  dueño = this.usuario.userType == 'Dueño';
  admin = this.usuario.userType == 'Admin';
  changeForm = new FormGroup({
    peticion: new FormControl('', Validators.required),
  });
  updatePay;
  formularioCambios: any;
  showForm = false;
  pagarPagos = false;
  messageService: any;
  constructor(
    public perfilService: PerfilService,
    public loginService: LoginService,
    public contactService: ContactService,
    public pagosService: PagosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.readUserLocalStorage();
    this.readUserById();
    this.readMoneyMonth();
    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      cardExpiry: [
        '',
        [Validators.required, Validators.pattern('(0[1-9]|1[0-2])/[0-9]{2}')],
      ],
      cardCvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
    });
  }

  readUserLocalStorage() {
    if (this.alumno) {
      this.readUserClass();
      this.btnSolicitud = true;
      this.formClass = true;
    } else if (this.dueño) {
      this.btnSolicitud = true;
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
        this.datosClases = rs;
        console.log(this.datosClases)
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
  mostrarFormulario() {
    this.showForm = true;
  }
  insertComent() {
    if (this.alumno) {
      this.formularioCambios = {
        commentType: 'Cambio clase',
        userName: this.usuario.userName,
        emailUser: this.usuario.emailAddress,
        peticion: this.changeForm.value.peticion,
      };
    } else if (this.dueño) {
      this.formularioCambios = {
        commentType: 'Cambio cuadra',
        userName: this.usuario.userName,
        emailUser: this.usuario.emailAddress,
        peticion: this.changeForm.value.peticion,
      };
    }
    console.log(this.formularioCambios);
    this.contactService
      .insertSuggestions(this.formularioCambios)
      .subscribe((rs) => {
        rs;
        if (rs) {
          console.log('Ok');
          this.showForm = false;
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
  pagarPago(pago) {
    this.pagarPagos = true;

    this.updatePay = {
      payId: pago.payId,
      userId: this.datosUser.userId,
      payDate: pago.payDate,
      priceId: pago.priceId,
      payMethod: 'Tarjeta',
    };
  }
  pagarDeuda() {
    console.log(this.updatePay)
    if (this.paymentForm.valid) {
      this.pagosService.updatePayment(this.updatePay).subscribe((rs) => {
        rs;
        console.log(rs);
        this.pagarPagos = false;
        this.readUserLocalStorage();
        this.readUserById();
        this.readMoneyMonth();
        //TODO poner toast
      });
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }
}
