import { Component, Injector } from '@angular/core';
import { PreciosService } from './precios.service';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ConfirmEventType,
} from 'primeng/api';
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
  priceFormChange: FormGroup
  newServiceForm = new FormGroup({
    typeService: new FormControl(''),
    price: new FormControl(''),
  });

  constructor(
    public priceService: PreciosService,
    protected injector: Injector
    ) {
      super(injector)
    }

  ngOnInit(): void {
    this.readAll();
    this.priceFormChange = new FormGroup({
      priceId: new FormControl(''),
      typeService: new FormControl(''),
      price: new FormControl('')
    });
  }
  readAll() {
    this.priceService.getReadAllPrices().subscribe((rs) => {
      this.totalPrice = rs;
    });
  }
  insertNewService() {
    this.addPriceButtonDisabled = true;
    let service = {
      typeService: this.newServiceForm.value.typeService,
      price: this.newServiceForm.value.price,
    };
    console.log(service);
    this.priceService.postInsertNewService(service).subscribe((rs) => {
      rs;
      if (rs) {
        this.readAll();
        this.newServiceForm.controls.price.setValue('');
        this.newServiceForm.controls.typeService.setValue('');
        this.addPriceButtonDisabled = false;
      }
      console.log(rs);
    });
  }
  editPrices(price) {
    this.currentPrice = price;
    
 
    this.priceFormChange = new FormGroup({
      priceId: new FormControl(this.currentPrice.priceId),
      typeService: new FormControl(this.currentPrice.typeService),
      price: new FormControl(this.currentPrice.price)
    });
   
this.editPrice = true;

  }
  savePrices() {
    
    this.priceService.updatePrice(this.priceFormChange.value).subscribe((rs) => {
      if(rs){
        this.readAll()
        this.editPrice = false;
      }
    });
  }
  deletePriceDialog(priceId) {
    //TODO meter un cargando
    this.confirmationService.confirm({
      message: 'Vas a eliminar un precio. ¿Estás seguro?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletePrice(priceId);
      }
    });
  }
  deletePrice(priceId) {
    //TODO spinner cargando
    this.priceService.deleteService(priceId).subscribe((rs) => {
      if (rs) {
        this.readAll();
      }
    });
  }
}
