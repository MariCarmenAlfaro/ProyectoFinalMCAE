import { Component, Injector } from '@angular/core';
import { PreciosService } from './precios.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonComponent } from '../common/common.component';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss'],
})
export class PreciosComponent extends CommonComponent {
  totalPrice = [];
  addPriceButtonDisabled = false;
  editPrice = false;
  currentPrice;
  loading: boolean;
  priceFormChange: FormGroup;
  newServiceForm = new FormGroup({
    typeService: new FormControl(''),
    price: new FormControl(''),
  });

  constructor(
    public priceService: PreciosService,
    protected injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loading = true;
    this.readAll();
    this.priceFormChange = new FormGroup({
      priceId: new FormControl(''),
      typeService: new FormControl(''),
      price: new FormControl(''),
    });
    this.verifyFormPrice()
  }

  readAll() {
    this.priceService.getReadAllPrices().subscribe(
      (rs) => {
        if (rs) {
          this.totalPrice = rs;
          this.loading = false;
        } else {
          this.showMessage('error', 'Error al obtener los precios');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }

  verifyFormPrice(){
    if(this.newServiceForm.value.price != '' && this.newServiceForm.value.typeService != ''){
      return false
    }else{
      return true
    }
  }

  insertNewService() {
    this.addPriceButtonDisabled = true;
    let service = {
      typeService: this.newServiceForm.value.typeService,
      price: this.newServiceForm.value.price,
    };
    this.priceService.postInsertNewService(service).subscribe(
      (rs) => {
        if (rs) {
          this.readAll();
          this.newServiceForm.controls.price.setValue('');
          this.newServiceForm.controls.typeService.setValue('');
          this.addPriceButtonDisabled = false;
          this.showMessage('info','Servicio agregado correctamente')
        } else {
          this.showMessage('error', 'Error al insertar el nuevo servicio');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }
  
  editPrices(price) {
    this.currentPrice = price;
    this.priceFormChange = new FormGroup({
      priceId: new FormControl(this.currentPrice.priceId),
      typeService: new FormControl(this.currentPrice.typeService),
      price: new FormControl(this.currentPrice.price),
    });
    this.editPrice = true;
  }

  updatePrices() {
    this.priceService.updatePrice(this.priceFormChange.value).subscribe(
      (rs) => {
        if (rs) {
          this.readAll();
          this.editPrice = false;
          this.showMessage('info','Servicio modificado correctamente')
        } else {
          this.showMessage('error', 'Error al modificar el servicio');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }

  deletePriceDialog(priceId) {
    this.confirmationService.confirm({
      message: 'Vas a eliminar un precio. ¿Estás seguro/a?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletePrice(priceId);
      },
    });
  }
  deletePrice(priceId) {
    this.priceService.deleteService(priceId).subscribe((rs) => {
      if (rs) {
        this.readAll();
        this.showMessage('info','Servicio eliminado correctamente')
      }else{
        this.showMessage('error','Error al eliminar el servicio')
      }
    },
    (error) => {
      this.showMessage('error',error.error)
    });
  }
}
