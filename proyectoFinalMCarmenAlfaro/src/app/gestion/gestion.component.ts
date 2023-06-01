import { Component, Injectable, Injector, OnInit } from '@angular/core';
import { GestionService } from './gestion.service';
import { CaballosService } from '../caballo/caballos.service';
import { FormControl, FormGroup } from '@angular/forms';

import { PerfilService } from '../perfil/perfil.service';
import { ClasesService } from '../clases/clases.service';
import { CommonComponent } from '../common/common.component';
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
  clasesDisplay = false
  horsesUser = []
  currentUserClases=[]
  classesDayHour = [];
  selectedUser = null;
  selectedClass = null;
  showDialogAddUser = false;
  selectedLevel = null;
  newClassUser: any;
  insertButtonDisabled = false;


  

  constructor(
    public gestionService: GestionService,
    public caballosService: CaballosService,
    public perfilService: PerfilService,
    public clasesService: ClasesService,
    protected injector: Injector
  ) {
    super(injector)
  }

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


    this.gestionService.postNewUser(this.form.value).subscribe((rs) => {
      this.newUserId = rs.insertedId;
      console.log(this.newUserId);

    this.showDialog=false
    if(rs){
      this.showDialogUser = false
      this.readAll();
      this.showMessage('info','Usuario creado correctamente')
      
    } else {
      this.showMessage('error','Error al intentar crear el usuario')
    }
     
    });
  }

  correctUserCreated(typeUser, userId) {
    if (typeUser != 'Admin') {
     this.addPayment(userId)
    }
    
  }


  savePrivateHorse() {
    console.log(this.formHorseOwner.value);
    this.caballosService.createHorse(this.formHorseOwner.value).subscribe(
      (rs) => {
        if (rs) {
          console.log('Caballo guardado');
          //añadir pago
          this.addPayment(this.formHorseOwner.value.ownerId)
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
              payMethod: new FormControl('')
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
    if(this.paymentForm.value.payMethod == ""){
      this.paymentForm.value.payMethod = null
    }

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
  deleteUser(user) {
   

//delete horses
this.gestionService.getHorsesByUserId(user.userId).subscribe((rs)=>{
  if(rs){
    let horses = rs
    console.log("caballos a eliminar")
    console.log(horses)

    horses.forEach(horse => {
      this.caballosService.deleteHorse(horse.horseId).subscribe((rs)=>{
        if(rs){
          console.log("caballo " + horse.horseId + " eliminado")
        }
      })
    });

  }
})
//delete clases
this.perfilService
      .getReadByIdExtendedAlumno(user.userId)
      .subscribe((rs) => {
       if(rs){
        let clases = rs
        console.log("clases a borrar")
        console.log(clases)
        clases.forEach((clase)=> {
          this.clasesService.deleteClassUser(clase.id).subscribe((rs)=> {
            if(rs){
              console.log("Clase " + clase.id + " borrada.")
            }
          })
        })
       }
        }
      );
//

//invalid user
    user.userType = 'Inactivo'
    this.gestionService.updateUser(user).subscribe(
      (response) => {
        if (response === true) {
          this.readAll();
          this.showMessage('info','Usuario eliminado correctamente')
        } else {
          this.showMessage('error','Error al intentar borrar el usuario')
        }
      },
      (error) => {
        console.error(error);
        
      }
    );
  }
  deleteUserDialog(user) {
    //TODO meter un cargando
    this.confirmationService.confirm({
      message: 'Vas a borrar un usuario, ¿estas seguro?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(user);
      }
    });
  }

  showInfoUser(user){
    this.currentUser=user;
    this.showEditUser = false
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
      this.showMessage('info','Usuario actualizado correctamente')
    } else {
      this.showMessage('error','Error al intentar actualizar el usuario')
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
      // mostrar formulario de añadir caballo
      
      // this.correctUserCreated('Dueño', this.currentUserId)
     this.showDialog = true
     this.showAddHorseToUser = true
     this.showCreateUser = false
     this.horsesDisplay = false
     this.showPaymentForm = false
     
    }
  }

  showClass(userId){
    
    this.currentUserClases = null
    this.perfilService
      .getReadByIdExtendedAlumno(userId)
      .subscribe((rs) => {
        // if(rs.classDay != null){
          this.currentUserClases = rs;
            console.log(this.currentUserClases)
        }
        
      // }
      ); this.clasesDisplay = true
      
  }
}
