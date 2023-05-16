import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GestionService } from './gestion.service';
import { CaballosService } from '../caballo/caballos.service';
@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss'],
})
export class GestionComponent implements OnInit {
  psswdUser: string = '';
  newUser: any;
  users: any[];
  createUser: boolean;
  messageCreation: boolean;
  showDialog= false;
  form: FormGroup;
  showAddHorseToUser = false;
  showCreateUser = false;
  showPaymentForm = false
  formHorseOwner: FormGroup;
  paymentForm: FormGroup;
  typeServices = []
  currentUserId
  

  userTypes = [
    { name: 'Alumno' },
    { name: 'Dueño' },
    { name: 'Admin' }  
];

  foodHorseTypes = [
    { name: 'Hierba' },
    { name: 'Forraje' },
    { name: 'Heno' },
    { name: 'Paja' }
  ]

  payMethods = [
    { name: 'Efectivo' },
    { name: 'Tarjeta' },
  ]


  constructor(
    public gestionService: GestionService,
    public caballosService: CaballosService,) {}
  
  ngOnInit(): void {
    this.readAll()
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
showCreateForm(){

  this.form = new FormGroup({
    userName: new FormControl(''),
    userType: new FormControl(''),
    registrationDate: new FormControl(''),
    emailAddress: new FormControl(''),
    psswdUser: new FormControl(''),
  });
  this.showPaymentForm = false
  this.showAddHorseToUser = false;
  this.showCreateUser = true;
  this.showDialog=true;

}


  postNewUser() {
    
    let typeUser = this.form.controls.userType.value.name
    this.form.controls.userType.setValue(typeUser)
   
    this.gestionService.postNewUser(this.form.value).subscribe((rs) => {
      this.createUser = rs;
      console.log(rs);
      if (this.createUser) {
        //TODO obtener el userId real del back
        this.currentUserId = 17
        this.correctUserCreated(typeUser)
        this.messageCreation = true;
      } else {
        this.messageCreation = false;
      }
    });
    
  }

  correctUserCreated(typeUser){
    if(typeUser === "Admin"){

    }
    if(typeUser === "Alumno"){
      alert("Alumno")
    }
    if(typeUser === "Dueño"){
     // añadir 
     this.showCreateUser = false
     this.showPaymentForm = false
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
     this.showAddHorseToUser = true
    }
  }

  savePrivateHorse(){
    console.log(this.formHorseOwner.value)
    this.caballosService.createHorse(this.formHorseOwner.value).subscribe(
      (rs) => {
        if (rs) {     
          console.log("Caballo guardado")  
          //añadir pago
          this.createPaymentForm()
        } 
      },
      (error) => {
        console.error(error);
       
      }
    );
  }

  createPaymentForm(){
// obtener tipos de pago
this.gestionService.getTypesServicesPrice().subscribe(
  (rs) => {
    if (rs) {    
      
     this.typeServices = rs
     console.log(this.typeServices) 

     if(this.currentUserId){
      this.paymentForm = new FormGroup({
        userId: new FormControl(this.currentUserId),
        payDate: new FormControl(''),
        priceId: new FormControl(''),
        payMethod: new FormControl(''),
        isPaid: new FormControl(false),
      });
      this.showCreateUser = false
      this.showAddHorseToUser = false
      this.showPaymentForm = true
      
      
     }
     
     
    } 
  },
  (error) => {
    console.error(error);
   
  }
);

  }


  savePayment(){
  // guardar el pago
  console.log(this.paymentForm.value)

  this.gestionService.createNewPayment(this.paymentForm.value).subscribe(
    (rs) => {
      if (rs) {    
        console.log("pago realizado")
        console.log(rs)
        //volvemos a hacer la llamada de usuarios para ver el nuevo usuario
        //cerramos los modals/dialogs/forms
        this.readAll()
        this.showCreateUser = false
        this.showAddHorseToUser = false
        this.showPaymentForm = false
        this.showDialog = false
      } 
    },
    (error) => {
      console.error(error);
     
    }
  );
  }
}



// ...
//Esto es para que si a la hora de insertar se viola la resticcion del correo devuelva un fallo y q muestre mensajito
// createUserProfile(userProfile: UserProfile): Observable<boolean> {
//   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//   const options = { headers: headers };
//   return this.http.post<boolean>(`${this.apiUrl}/create`, userProfile, options).pipe(
//     catchError(error => {
//       if (error.status === 422) {
//         const errorMessage = error.error.message;
//         if (errorMessage.includes("ck_emailAddress")) {
//           // El error se debe a la restricción de verificación ck_emailAddress
//           return of(false); // Devuelve un observable de "false" para indicar que la creación falló
//         }
//       }
//       // Si no es un error de restricción de verificación ck_emailAddress, propaga el error
//       throw error;
//     })
//   );
// }
