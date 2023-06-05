import { Component, Injector, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { LoginService } from '../login/login.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactService } from '../contact/contact.service';
import { PagosService } from '../pagos/pagos.service';
import { CommonComponent } from '../common/common.component';
import { SugerenciasService } from '../sugerencias-reservas/sugerencias.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent extends CommonComponent implements OnInit {
  datosUser: any;
  datosClases;
  datosPagos = [];
  userType = false;
  formClass = false;
  formBarn = false;
  tablaMensualidades=false
  btnSolicitud = false;
  paymentForm: FormGroup;
  usuario = JSON.parse(window.localStorage.getItem('user'));
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
    private formBuilder: FormBuilder,
    public sugerenciaService: SugerenciasService,
    protected injector: Injector
  ) {
    super(injector);
  }

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
      this.tablaMensualidades=true
    } else if (this.dueño) {
      this.btnSolicitud = true;
      this.userType = true;
      this.formBarn = true;
      this.tablaMensualidades=true
    } else if (this.admin) {
      this.userType = true;
    }
  }
  readUserById() {
    this.usuario = JSON.parse(window.localStorage.getItem('user'));
    this.perfilService.getReadById(this.usuario.userId).subscribe(
      (rs) => {
        if (rs) {
          this.datosUser = rs;
        } else {
          this.showMessage('error', 'Error al obtener los usuarios');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }
  readUserClass() {
    this.usuario = JSON.parse(window.localStorage.getItem('user'));
    this.perfilService.getReadByIdExtendedAlumno(this.usuario.userId).subscribe(
      (rs) => {
        if (rs) {
          this.datosClases = rs;
        } else {
          this.showMessage('error', 'Error al obtener las clases');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }
  readMoneyMonth() {
    this.usuario = JSON.parse(window.localStorage.getItem('user'));
    this.perfilService.getReadMoneyMonthById(this.usuario.userId).subscribe(
      (rs) => {
        if (rs) {
          this.datosPagos = rs;
        } else {
          this.showMessage('error', 'Error al obtener las mensualidades');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
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

    this.sugerenciaService.insertSuggestions(this.formularioCambios).subscribe(
      (rs) => {
        if (rs) {
          this.showForm = false;
          this.showMessage('info', 'Sugerencia enviada con éxito');
        } else {
          this.showMessage('error', 'Error al enviar la sugerencia');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
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
    if (this.paymentForm.valid) {
      this.pagosService.updatePayment(this.updatePay).subscribe((rs) => {
        this.pagarPagos = false;
        this.readUserLocalStorage();
        this.readUserById();
        this.readMoneyMonth();
        this.showMessage('info', '¡Pago realizado con éxito!');
      });
    } else {
      this.paymentForm.markAllAsTouched();
      this.showMessage('error', 'Error al realizar el pago');
    }
  }
}
