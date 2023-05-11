import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public loginService: LoginService) { }


  ngOnInit(): void {
    //cada vez que se llama al nav-bar osea siempre, se obtiene el usuario del local storage
    this.loginService.user = JSON.parse(window.localStorage.getItem("user"))
  }
  

    showDialog() {
        this.loginService.showModal = true;
    }

  logout(){
    this.loginService.user = null
    window.localStorage.removeItem("user");
    
  }

}
