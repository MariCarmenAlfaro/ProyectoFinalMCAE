import { Component, Injectable, Injector, OnInit } from '@angular/core';
import { GestionService } from './gestion.service';
import { CaballosService } from '../caballo/caballos.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PerfilService } from '../perfil/perfil.service';
import { ClasesService } from '../clases/clases.service';
import { CommonComponent } from '../common/common.component';
import { SugerenciasService } from '../sugerencias-reservas/sugerencias.service';
import { PagosService } from '../pagos/pagos.service';
import { PreciosService } from '../precios/precios.service';
@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss'],
})
export class GestionComponent extends CommonComponent implements OnInit {
  psswdUser: string = '';
  newUser: any;
  users: any[];
  newUserId;
  messageCreation: boolean;
  showDialog = false;
  showDialogUser = false;
  form: FormGroup;
  updateUserForm: FormGroup;
  showAddHorseToUser = false;
  showCreateUser = false;
  showPaymentForm = false;
  formHorseOwner: FormGroup;
  paymentForm: FormGroup;
  typeServices = [];
  currentUserId;
  currentUser;
  showEditUser = false;
  showInfoUserDiv = false;
  horsesDisplay = false;
  clasesDisplay = false;
  horsesUser = [];
  currentUserClases = [];
  classesDayHour = [];
  selectedUser = null;
  selectedClass = null;
  showDialogAddUser = false;
  selectedLevel = null;
  newClassUser: any;
  insertButtonDisabled = false;
  loading: boolean;
  constructor(
    public gestionService: GestionService,
    public caballosService: CaballosService,
    public perfilService: PerfilService,
    public clasesService: ClasesService,
    public sugerenciasService: SugerenciasService,
    public pagosService: PagosService,
    public preciosService: PreciosService,
    protected injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loading = true;
    this.readAll();
  }

  generatePassword() {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const passwordLength = 8;

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      this.psswdUser += chars[randomIndex];
    }

    return this.psswdUser;
  }

  readAll() {
    this.gestionService.readAllUser().subscribe(
      (rs) => {
        if (rs) {
          this.users = rs;
          this.loading = false;
        } else {
          this.showMessage('error', 'Error al intentar leer los usuarios');
        }
      },
      (error) => {
        this.closeLoading();
        this.showMessage('error', error.error);
      }
    );
  }

  clear(table) {
    table.clear();
  }
  showCreateForm() {
    this.form = new FormGroup({
      userName: new FormControl(''),
      userType: new FormControl(''),
      registrationDate: new FormControl(''),
      emailAddress: new FormControl(''),
      psswdUser: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ]),
    });
    this.showPaymentForm = false;
    this.showAddHorseToUser = false;
    this.showCreateUser = true;
    this.showDialog = true;
  }

  postNewUser() {
    this.gestionService.postNewUser(this.form.value).subscribe(
      (rs) => {
        this.newUserId = rs.insertedId;
     
        this.showDialog = false;
        if (rs) {
          this.showDialogUser = false;
          this.readAll();
          this.showMessage('info', 'Usuario creado con éxito');
        } else {
          this.showMessage('error', 'Error al intentar crear el usuario');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }

  correctUserCreated(typeUser, userId) {
    if (typeUser != 'Admin') {
      this.addPayment(userId);
    }
  }
  addPayment(userId) {
    this.currentUserId = userId;
    this.createPaymentForm();
  }
  savePrivateHorse() {
    console.log(this.formHorseOwner.value);
    this.caballosService.createHorse(this.formHorseOwner.value).subscribe(
      (rs) => {
        if (rs) {
          this.addPayment(this.formHorseOwner.value.ownerId);
          this.showMessage('info', 'Caballo añadido con éxito');
        } else {
          this.showMessage('error', 'Error al crear el caballo');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }

  createPaymentForm() {
    this.preciosService.getReadAllPrices().subscribe(
      (rs) => {
        if (rs) {
          this.typeServices = rs;
          if (this.currentUserId) {
            this.paymentForm = new FormGroup({
              userId: new FormControl(this.currentUserId),
              payDate: new FormControl(''),
              priceId: new FormControl(''),
              payMethod: new FormControl(''),
            });
            this.showDialog = true;
            this.showCreateUser = false;
            this.showAddHorseToUser = false;
            this.showPaymentForm = true;
          }
        } else {
          this.showMessage('error', 'Error al crear formulario de pagos');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }

  savePayment() {
    if (this.paymentForm.value.payMethod == '') {
      this.paymentForm.value.payMethod = null;
    }

    this.pagosService.createNewPayment(this.paymentForm.value).subscribe(
      (rs) => {
        if (rs) {
          this.readAll();
          this.showCreateUser = false;
          this.showAddHorseToUser = false;
          this.showPaymentForm = false;
          this.showDialog = false;
          this.showMessage('info', 'Pago registrado con éxito');
        } else {
          this.showMessage('error', 'Error al intentar crear el pago');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }
  deleteUser(user) {
    user.userType = 'Inactivo';
    this.gestionService.updateUser(user).subscribe(
      (rs) => {
        if (rs === true) {
          this.readAll();
          this.showMessage('info', 'Usuario eliminado correctamente');
        } else {
          this.showMessage('error', 'Error al intentar borrar el usuario');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
    this.caballosService.getHorseByOnwerId(user.userId).subscribe(
      (rs) => {
        if (rs) {
          let horses = rs;
          horses.forEach((horse) => {
            horse.ownerId = null
            console.log(horse)
            this.caballosService.updateHorse(horse).subscribe((rs) => {
              if (rs) {
     
              }
            });
          });
        } else {
          this.showMessage('error', 'Error al intentar eliminar el usuario');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
    this.perfilService.getReadByIdExtendedAlumno(user.userId).subscribe(
      (rs) => {
        if (rs) {
          let clases = rs;
          clases.forEach((clase) => {
            this.clasesService.deleteClassUser(clase.id).subscribe((rs) => {
              if (rs) {
                this.showMessage('info', 'Clase del usuario eliminada con éxito');
              }
            });
          });
        } else {
          this.showMessage('error', 'Error al intentar crear el usuario');
        }
      },
      (error) => {
        this.closeLoading();
        this.showMessage('error', error.error);
      }
    );


  }
  deleteUserDialog(user) {
    this.confirmationService.confirm({
      message: 'Vas a borrar un usuario, ¿estas seguro/a?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(user);
      },
    });
  }

  showInfoUser(user) {
    this.currentUser = user;
    this.showEditUser = false;
    this.showInfoUserDiv = true;
    this.showDialogUser = true;
    console.log(this.currentUser);
  }
  mostrarEditarUsuario(user) {
    this.showInfoUserDiv = false;
    this.updateUserForm = new FormGroup({
      userName: new FormControl(user.userName),
      userType: new FormControl(user.userType),
      registrationDate: new FormControl(user.registrationDate),
      emailAddress: new FormControl(user.emailAddress),
      psswdUser: new FormControl(user.psswdUser),
      userId: new FormControl(user.userId),
    });
    this.showEditUser = true;
  }
  updateUser() {
    this.gestionService.updateUser(this.updateUserForm.value).subscribe(
      (rs) => {
        if (rs) {
          this.showDialogUser = false;
          this.readAll();
          this.showMessage('info', 'Usuario actualizado correctamente');
        } else {
          this.showMessage('error', 'Error al intentar actualizar el usuario');
        }
      },
      (error) => {
        this.closeLoading();
        this.showMessage('error', error.error);
      }
    );
  }
  showHorsesDisplay(userId) {
    this.currentUserId = userId;

    this.horsesUser = [];

    this.caballosService.getHorseByOnwerId(userId).subscribe(
      (rs) => {
        if (rs) {
          this.horsesUser = rs;

          this.horsesDisplay = true;
        } else {
          this.showMessage('error', 'Error al encontrar tu caballo');
        }
      },
      (error) => {
        this.closeLoading();
        this.showMessage('error', error.error);
      }
    );
  }
  addHorseByUser() {
    if (this.currentUserId) {
      this.formHorseOwner = new FormGroup({
        horseName: new FormControl(''),
        barnNum: new FormControl(''),
        foodType: new FormControl(''),
        horseType: new FormControl('Privado'),
        observation: new FormControl(''),
        cameraUrl: new FormControl(''),
        registrationDate: new FormControl(''),
        ownerId: new FormControl(this.currentUserId),
      });
      this.showAddHorseToUser = true;
      this.showDialog = true;
      this.showAddHorseToUser = true;
      this.showCreateUser = false;
      this.horsesDisplay = false;
      this.showPaymentForm = false;
    }
  }

  showClass(userId) {
    this.currentUserClases = [];
    this.perfilService.getReadByIdExtendedAlumno(userId).subscribe(
      (rs) => {
        if (rs) 
        {
          rs.forEach(clase => {
            if(clase.classDay!=null){
              this.currentUserClases.push(clase)
            }
          });
         
        
        }else{
          this.showMessage('error', 'Error al intentar ver tus clases');
        }
      },
      (error) => {
       this.closeLoading();
        this.showMessage('error', error.error)
      });

    this.clasesDisplay = true;
  }
}
