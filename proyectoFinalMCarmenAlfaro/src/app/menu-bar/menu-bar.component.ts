import { Component, Injector, OnInit } from '@angular/core';
import { MenuBarService } from './menu-bar.service';
import { PreciosService } from '../precios/precios.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { CommonComponent } from '../common/common.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent extends CommonComponent implements OnInit {
  menus: any;
  priceIdServer: any;
  price: any;
  usuario: any;
  editMenuButton = false;
  newMenu: any;
  updateMenuForm: FormGroup;
  showEditMenu = false;
  currentMenu;

  constructor(
    public menuService: MenuBarService,
    public priceService: PreciosService,
    public loginService: LoginService,
    protected injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(window.localStorage.getItem('user'));
    this.readMenus();
    this.readPrice();
    this.admin();
  }
  readMenus() {
    this.menuService.getAllMenus().subscribe(
      (rs) => {
        if (rs) {
          this.menus = rs;
        } else {
          this.showMessage('error', 'Error al obtener los menús');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }
  readPrice() {
    this.priceService.readServiceById(6).subscribe(
      (rs) => {
        if (rs) {
          this.price = rs;
        }else{
          this.showMessage('error', 'Error al obtener los precios');
        }
        
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }
  admin() {
    if (this.usuario?.userType === 'Admin') {
      this.editMenuButton = true;
    }
  }

  updateMenu() {
    let newMenu = {
      menuId: this.currentMenu.menuId,
      menuDate: this.currentMenu.menuDate,
      menuName: this.updateMenuForm.value['nameMenu'],
      menuPriceId: this.currentMenu.menuPriceId,
    };
    this.menuService.updateMenu(newMenu.menuId, newMenu).subscribe((rs) => {
      if (rs) {
        this.readMenus();
        this.showEditMenu = false;
        this.currentMenu = null;
      }else{
        this.showMessage('error','Error al actualizar el menu')
      }
    },
    (error) => {
      this.showMessage('error',error.error)
    });
  }

  editMenu(menu) {
    this.currentMenu = menu;
    this.updateMenuForm = new FormGroup({
      nameMenu: new FormControl(this.currentMenu.menuName),
    });
    this.showEditMenu = true;
  }
}
