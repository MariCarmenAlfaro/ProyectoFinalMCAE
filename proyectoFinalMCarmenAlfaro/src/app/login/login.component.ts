import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfile } from '../entities/userProfile/userProfile.interface';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends CommonComponent implements OnInit {

  
userProfiles: UserProfile;
userId: number;
closeModal= true;
loginForm = new FormGroup({
  emailAddress: new FormControl('', Validators.required),
    psswdUser: new FormControl('', Validators.required),

  });

  constructor(
    public loginService: LoginService,
    readonly ro: Router,
    readonly injector: Injector) {
    super(injector)
  }



  ngOnInit(): void {}

  loginBack() {
  
    var emailAddress = this.loginForm.get('emailAddress').value;
    var password = this.loginForm.get('psswdUser').value;
    this.loginService.authenticateLogin(emailAddress, password).subscribe((response: UserProfile) => {
         if (response) {
          this.showLoading()
          this.userProfiles = response;
          window.localStorage.setItem("user", JSON.stringify(this.userProfiles));
          this.loginService.user = JSON.parse(window.localStorage.getItem("user"))
          this.loginService.showModal  = false;
          setTimeout(()=> {
            this.closeLoading();
            this.ro.navigateByUrl('/home')
            }, 3000);
         } else {
          this.closeLoading();
          this.showMessage('error', 'Error al intentar iniciar sesión')
         }
       },
       (error) => {
        this.closeLoading();
         this.showMessage('error', error.error)
       });
    
    

  }


}