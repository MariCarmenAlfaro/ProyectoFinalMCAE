import { Component, OnInit } from '@angular/core';
import { MenuBarService } from './menu-bar.service';
import { PreciosService } from '../precios/precios.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  menus: any;
  priceIdServer: any;
  price: any;
  usuario: any;
  editMenuButton = false;
  newMenu: any;
  updateMenuForm: FormGroup
  showEditMenu = false
  currentMenu
 
  
  constructor(
    public menuService: MenuBarService,
    public priceService: PreciosService,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
   

    this.usuario = JSON.parse(window.localStorage.getItem('user'));
    this.readMenus();
    this.readPrice();
    this.admin();
  }
  readMenus() {
    this.menuService.getAllMenus().subscribe((rs) => {
      this.menus = rs;
    });
  }
  readPrice() {
    this.priceService.readServiceById(6).subscribe((rs) => {
      this.price = rs;
    });
  }
  admin() {
    console.log(this.usuario);
    if( this.usuario?.userType === 'Admin'){
      this.editMenuButton=true
    };
   
      
    }
  
  updateMenu() {
   
    let newMenu = {
      menuId: this.currentMenu.menuId,
      menuDate: this.currentMenu.menuDate,
      menuName:this.updateMenuForm.value['nameMenu'],
      menuPriceId: this.currentMenu.menuPriceId
    };
    this.menuService.updateMenu(newMenu.menuId,newMenu).subscribe((rs) => {
      if(rs){
        console.log(rs)
        this.readMenus();
        this.showEditMenu = false
        this.currentMenu = null
      }
      });
    
  
 
   
  }

  editMenu(menu){
    this.currentMenu = menu
    this.updateMenuForm = new FormGroup({
      nameMenu: new FormControl(this.currentMenu.menuName)
    });
    console.log(this.currentMenu)
    this.showEditMenu = true;
  }
  
}
