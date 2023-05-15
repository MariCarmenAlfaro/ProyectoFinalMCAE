import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GestionService } from './gestion.service';
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
  constructor(public gestionService: GestionService) {}
  
  ngOnInit(): void {
    this.createFormUser()
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
  this.showDialog=true;

}

createFormUser(){
  this.form = new FormGroup({
    userName: new FormControl(''),
    userType: new FormControl(''),
    registrationDate: new FormControl(''),
    emailAddress: new FormControl(''),
    psswdUser: new FormControl(''),
  });
}
  postNewUser() {
    
    // var userName = this.newUserForm.get('userName').value;
    // var userType = this.newUserForm.get('userType').value;
    // var registrationDate = this.newUserForm.get('registrationDate').value;
    // var emailAddress = this.newUserForm.get('emailAddress').value;
    // var psswdUser = this.newUserForm.get('psswdUser').value;
    // this.newUser = {
    //   userName,
    //   userType,
    //   registrationDate,
    //   emailAddress,
    //   psswdUser,
    // };
    
    // console.log(this.newUser);
    this.gestionService.postNewUser(this.form.value).subscribe((rs) => {
      this.createUser = rs;
      console.log(rs);
      if (this.createUser) {
        this.messageCreation = true;
      } else {
        this.messageCreation = false;
      }
    });
    
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
