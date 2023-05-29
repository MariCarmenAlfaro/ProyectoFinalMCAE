import { Component, OnInit } from '@angular/core';
import { PagosService } from './pagos.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class PagosComponent implements OnInit {
  //payments = [];
  typeServices = [];
  showPaymentForm = false;
  paymentForm: FormGroup;
  nombresPagos=[];
  payMethods = [ { name: 'Pendiente' },{ name: 'Efectivo' }, { name: 'Tarjeta' }];

  constructor(
    public pagosService: PagosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    //this.readAllPayments();
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

          this.getTypesServicesPrice();

          this.showPaymentForm = false;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // readAllPayments() {
  //   this.pagosService.getAllPayments().subscribe((rs) => {
  //     this.payments = rs;
  //   });
 
  // }

  getTypesServicesPrice() {
    this.pagosService.getTypesServicesPrice().subscribe(
      (rs) => {
        if (rs) {
          this.typeServices = rs;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  createPaymentForm(payment) {
    // obtener tipos de pago
console.log(payment)
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
   console.log(this.nombresPagos)
    });
  }
  clear(table) {
    table.clear();
  }
}
