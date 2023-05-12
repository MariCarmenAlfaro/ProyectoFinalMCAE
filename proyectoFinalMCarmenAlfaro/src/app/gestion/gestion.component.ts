import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {
  password: string='';
  newUser: any;
  createUser: boolean
  constructor(public gestionService: GestionService) { }
  newUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)

})
  ngOnInit(): void {
  }

  generatePassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const passwordLength = 8;
  
  
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      this.password += chars[randomIndex];
    }
  
    return this.password;
  }

   postNewUser(){
   
    var name = this.newUserForm.get('name').value;
    var type = this.newUserForm.get('type').value;
    var date = this.newUserForm.get('date').value;
    var email = this.newUserForm.get('email').value;
    var password = this.password;
    this.newUser={name, type, date, email,password}
    console.log(this.newUser)
    this.gestionService.postNewUser(this.newUser).subscribe(
      rs=> {
      this.createUser= rs;
      console.log(this.createUser)
     
  }) 

  }
}
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GestionService } from './gestion.service';





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

