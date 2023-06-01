import { Component, Injector, OnInit } from '@angular/core';
import { PagosService } from './pagos.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonComponent } from '../common/common.component';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
})
export class PagosComponent extends CommonComponent implements OnInit {

  typeServices = [];
  showPaymentForm = false;
  paymentForm: FormGroup;
  nombresPagos=[];

  constructor(
    public pagosService: PagosService,
    protected injector: Injector
    ) {
      super(injector)
    }

  ngOnInit(): void {

    this.getTypesServicesPrice();
    this.getPricePayUser();
    this.paymentForm = new FormGroup({
      payId: new FormControl(''),
      userId: new FormControl(''),
      payDate: new FormControl(''),
      priceId: new FormControl(''),
      payMethod: new FormControl(''),
    });
  }

  savePayment() {
    // guardar el pago
    console.log(this.paymentForm.value);

    this.pagosService.updatePayment(this.paymentForm.value).subscribe(
      (rs) => {
        if (rs) {
          console.log('pago actualizado');
          console.log(rs);
          this.getPricePayUser()
          this.getTypesServicesPrice();

          this.showPaymentForm = false;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getTypesServicesPrice() {
    this.pagosService.getTypesServicesPrice().subscribe(
      (rs) => {
        if (rs) {
          this.typeServices = rs;
          console.log("precios y nombres")
          console.log(this.typeServices)
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  createPaymentForm(payment) {

    if (this.typeServices.length > 0) {
      this.paymentForm = new FormGroup({
        payId: new FormControl(payment.payId),
        userId: new FormControl(payment.userId),
        payDate: new FormControl(payment.payDate),
        priceId: new FormControl(payment.priceId),
        payMethod: new FormControl(payment.payMethod)
      });
      console.log(this.paymentForm.value)

      this.showPaymentForm = true;
    } 
  }
  getPricePayUser() {
    this.pagosService.getPricePayUser().subscribe((rs) => {
      this.nombresPagos=  rs
      
    });
  }
  clear(table) {
    table.clear();
  }
}
