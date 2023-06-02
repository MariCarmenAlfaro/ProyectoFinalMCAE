import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(public loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.user = JSON.parse(window.localStorage.getItem('user'));
  }

  showDialog() {
    this.loginService.showModal = true;
  }

  logout() {
    this.loginService.user = null;
    window.localStorage.removeItem('user');
  }
}
