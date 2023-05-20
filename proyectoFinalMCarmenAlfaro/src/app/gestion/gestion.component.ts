import { Component, OnInit } from '@angular/core';
import { GestionService } from './gestion.service';
import { CaballosService } from '../caballo/caballos.service';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class GestionComponent implements OnInit {
  psswdUser: string = '';
  newUser: any;
  users: any[];
  newUserId;
  messageCreation: boolean;
  showDialog = false;
  showDialogUser = false;
  form: FormGroup;
  updateUserForm: FormGroup
  showAddHorseToUser = false;
  showCreateUser = false;
  showPaymentForm = false;
  formHorseOwner: FormGroup;
  paymentForm: FormGroup;
  typeServices = [];
  currentUserId;
  currentUser;
  showEditUser = false
  showInfoUserDiv = false
  horsesDisplay = false
  horsesUser = []
  


  userTypes = [{ name: 'Alumno' }, { name: 'Dueño' }, { name: 'Admin' }];

  foodHorseTypes = [
    { name: 'Hierba' },
    { name: 'Forraje' },
    { name: 'Heno' },
    { name: 'Paja' },
  ];

  payMethods = [{ name: 'Efectivo' }, { name: 'Tarjeta' }];
  

  constructor(
    public gestionService: GestionService,
    public caballosService: CaballosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
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
    this.gestionService.readAllUser().subscribe((rs) => {
      this.users = rs;
    });
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
      psswdUser: new FormControl(''),
    });
    this.showPaymentForm = false;
    this.showAddHorseToUser = false;
    this.showCreateUser = true;
    this.showDialog = true;
  }

  postNewUser() {
    let typeUser = this.form.controls.userType.value.name;
    this.form.controls.userType.setValue(typeUser);

    this.gestionService.postNewUser(this.form.value).subscribe((rs) => {
      this.newUserId = rs.insertedId;
      console.log(this.newUserId);
      if (this.newUserId) {
        this.currentUserId = this.newUserId;
        this.correctUserCreated(typeUser);
        // TODO mostrar un mensaje de estos popups diciendo que ha ido bien o mal
        // this.messageCreation = true;
      } else {
        // this.messageCreation = false;
      }
    });
  }

  correctUserCreated(typeUser) {
    if (typeUser === 'Admin') {
    }
    if (typeUser === 'Alumno') {
      alert('Alumno');
      // TODO añadir a clases y luego hacerle pagar
    }
    if (typeUser === 'Dueño') {
      // añadir
      this.showCreateUser = false;
      this.showPaymentForm = false;
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
    }
  }

  savePrivateHorse() {
    console.log(this.formHorseOwner.value);
    this.caballosService.createHorse(this.formHorseOwner.value).subscribe(
      (rs) => {
        if (rs) {
          console.log('Caballo guardado');
          //añadir pago
          this.createPaymentForm();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addPayment(userId){
    this.currentUserId = userId
    this.createPaymentForm()
  }
  createPaymentForm() {
    // obtener tipos de pago
    this.gestionService.getTypesServicesPrice().subscribe(
      (rs) => {
        if (rs) {
          this.typeServices = rs;
          console.log(this.typeServices);

          if (this.currentUserId) {
            this.paymentForm = new FormGroup({
              userId: new FormControl(this.currentUserId),
              payDate: new FormControl(''),
              priceId: new FormControl(''),
              payMethod: new FormControl(''),
              isPaid: new FormControl(false),
            });
            this.showDialog = true
            this.showCreateUser = false;
            this.showAddHorseToUser = false;
            this.showPaymentForm = true;
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  savePayment() {
    // guardar el pago
    console.log(this.paymentForm.value);

    this.gestionService.createNewPayment(this.paymentForm.value).subscribe(
      (rs) => {
        if (rs) {
          console.log('pago realizado');
          console.log(rs);
          //volvemos a hacer la llamada de usuarios para ver el nuevo usuario
          //cerramos los modals/dialogs/forms
          this.readAll();
          this.showCreateUser = false;
          this.showAddHorseToUser = false;
          this.showPaymentForm = false;
          this.showDialog = false;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  deleteUser(userId) {
    this.gestionService.deleteUser(userId).subscribe(
      (response) => {
        if (response === true) {
          this.readAll();
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Usuario eliminado correctamente',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'Error al intentar borrar el usuario',
          });
        }
      },
      (error) => {
        console.error(error);
        //this.errorMessage=true;
      }
    );
  }
  deleteUserDialog(userId) {
    //TODO meter un cargando
    this.confirmationService.confirm({
      message: 'Vas a borrar un usuario, ¿estas seguro?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(userId);
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
s
  showInfoUser(user){
    
    this.currentUser=user;
    this.showInfoUserDiv = true;
    this.showDialogUser=true;
    console.log(this.currentUser)
    
  }
  mostrarEditarUsuario(user){
    this.showInfoUserDiv = false
    this.updateUserForm = new FormGroup({
      userName: new FormControl(user.userName),
      userType: new FormControl(user.userType),
      registrationDate: new FormControl(user.registrationDate),
      emailAddress: new FormControl(user.emailAddress),
      psswdUser: new FormControl(user.psswdUser),
      userId:new FormControl(user.userId),
    });
    this.showEditUser = true
  
  }
  updateUser(){
    console.log(this.updateUserForm.value)
    // llamada al back para actualizar el usuario

    this.gestionService.updateUser(this.updateUserForm.value).subscribe((rs)=> {
    if(rs){
      this.showDialogUser = false
      this.readAll();
      this.messageService.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Usuario actualizado correctamente',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'Error al intentar actualizar el usuario',
      });
    }
    })

    
  }
  showHorsesDisplay(userId){
    this.currentUserId = userId

    // llamada para obtener los caballos del usuario
    
    this.horsesUser = []

    this.gestionService.getHorsesByUserId(userId).subscribe((rs)=>{
      if(rs){
        this.horsesUser= rs;
        console.log(this.horsesUser)
        this.horsesDisplay = true

      }
    })
  }
  addHorseByUser(){
    if(this.currentUserId){
      // mostrar formulario de añadir caballo
      this.horsesDisplay = false
      this.correctUserCreated('Dueño')
     this.showDialog = true
    }
  }

  showClass(userId){
    alert("VER CLASES")
  }
}
