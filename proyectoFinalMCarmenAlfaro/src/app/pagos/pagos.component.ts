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
  nombresPagos = [];

  constructor(public pagosService: PagosService, protected injector: Injector) {
    super(injector);
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
    this.pagosService.updatePayment(this.paymentForm.value).subscribe(
      (rs) => {
        if (rs) {
          this.getPricePayUser();
          this.getTypesServicesPrice();
          this.showPaymentForm = false;
        } else {
          this.showMessage('error', 'Error al modificar el pago');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }

  getTypesServicesPrice() {
    this.pagosService.getTypesServicesPrice().subscribe(
      (rs) => {
        if (rs) {
          this.typeServices = rs;
        } else {
          this.showMessage('error', 'Error al obtener los servicios');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
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
        payMethod: new FormControl(payment.payMethod),
      });
      this.showPaymentForm = true;
    }
  }
  getPricePayUser() {
    this.pagosService.getPricePayUser().subscribe(
      (rs) => {
        if (rs) {
          this.nombresPagos = rs;
        } else {
          this.showMessage('error', 'Error al obtener los pagos');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }
  clear(table) {
    table.clear();
  }
}
