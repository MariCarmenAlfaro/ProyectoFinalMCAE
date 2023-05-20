import { Component } from '@angular/core';
import { PreciosService } from './precios.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss'],
})
export class PreciosComponent {
  totalPrice = [];
  
  newServiceForm = new FormGroup({
    typeService: new FormControl(''),
    price: new FormControl('')})

  constructor(public priceService: PreciosService) {}
  ngOnInit(): void {
    this.readAll();
  }
  readAll() {
    this.priceService.getReadAllPrices().subscribe((rs) => {
      this.totalPrice = rs;
      console.log(this.totalPrice);
    });
  }
  insertNewService() {
    let service={
     typeService: this.newServiceForm.value.typeService,
     price: this.newServiceForm.value.price

    }
    console.log(service)
    this.priceService.postInsertNewService(service).subscribe((rs) => {
      rs
      if(rs){
        this.readAll();
        this.newServiceForm.controls.price.setValue("");
        this.newServiceForm.controls.typeService.setValue("");
      }
    console.log(rs)
    });
    
  }
  deleteService(){
   // this.priceService.deleteService()
  }
}
