import { Component, Injector, OnInit,  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends CommonComponent implements OnInit {
 
userProfiles: any;
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
    this.loginService.authenticateLogin(emailAddress, password).subscribe((rs) => {
         if (rs) {
          this.showLoading()
          this.userProfiles = rs;
          window.localStorage.setItem("user", JSON.stringify(this.userProfiles));
          this.loginService.user = JSON.parse(window.localStorage.getItem("user"))
          this.loginService.showModal  = false;
          this.loginForm.controls.emailAddress.setValue('');
          this.loginForm.controls.psswdUser.setValue('');
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