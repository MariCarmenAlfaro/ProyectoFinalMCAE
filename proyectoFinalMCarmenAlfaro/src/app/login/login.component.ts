import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfile } from '../entities/userProfile/userProfile.interface';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
// import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
userProfiles: UserProfile;
userId: number;
closeModal= true;
errorMessage: boolean=false;
loginForm = new FormGroup({
  emailAddress: new FormControl('', Validators.required),
    psswdUser: new FormControl('', Validators.required),

  });

  constructor(public loginService: LoginService,
    readonly ro: Router,
    public commonService: CommonService) { }

  ngOnInit(): void {

  }

login(){
    // TODO obtener el objeto usuario del back.
    let name = 'mari';
    let role = 'admin'
  let user= {name: name, role: role}
 
  //guardamos el usuario en local storage
  window.localStorage.setItem("user", JSON.stringify(user));
  console.log(JSON.parse(window.localStorage.getItem("user")));
  // guardamos el usuario en el loginService para tener un acceso más rapido a el
  this.loginService.user = JSON.parse(window.localStorage.getItem("user"))
}

loginBack() {
 
  var emailAddress = this.loginForm.get('emailAddress').value;
  var password = this.loginForm.get('psswdUser').value;
  
  this.loginService.authenticateLogin(emailAddress, password)
.toPromise()
.then((response: UserProfile) => {
  
  this.commonService.showLoading();  
  this.userProfiles = response;
  window.localStorage.setItem("user", JSON.stringify(this.userProfiles));
  this.loginService.user = JSON.parse(window.localStorage.getItem("user"))
  this.loginService.showModal  = false;
  setTimeout(()=> {
    this.commonService.closeLoading();
    this.ro.navigateByUrl('/home')
    }, 3000);
  
})
.catch(error => {
  this.commonService.closeLoading();
  this.commonService.showMessage('error', error.error)
})
.finally(() => {
})

 
}


}


