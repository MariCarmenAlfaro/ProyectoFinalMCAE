import { Component } from '@angular/core';
import { PreciosService } from './precios.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class PreciosComponent {
  totalPrice = [];
  addPriceButtonDisabled = false
  
  newServiceForm = new FormGroup({
    typeService: new FormControl(''),
    price: new FormControl('')})

  constructor(
    public priceService: PreciosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {}
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
    this.addPriceButtonDisabled = true
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
        this.addPriceButtonDisabled = false;
      }
    console.log(rs)
    });
    
  }

  deletePriceDialog(priceId){
    
      //TODO meter un cargando
      this.confirmationService.confirm({
        message: 'Vas a eliminar un precio. ¿Estás seguro?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deletePrice(priceId)
        },
        reject: (type) => {
          switch (type) {
          // TODO decidir si mensaje al darle al esc o  al darle a cerrar?
            case ConfirmEventType.CANCEL:
              this.messageService.add({
                severity: 'warn',
                summary: 'Cancelado',
                detail: 'You have cancelled',
              });
              break;
          }
        },
      });
    
  }
  deletePrice(priceId){
    //TODO spinner cargando
    this.priceService.deleteService(priceId).subscribe((rs)=> {
      if(rs){
        this.readAll()
      }
    })
  }
}
