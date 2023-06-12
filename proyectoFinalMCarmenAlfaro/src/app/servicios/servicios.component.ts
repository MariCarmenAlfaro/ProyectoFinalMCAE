import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationExcService } from './servicios.service';
import { ClasesService } from '../clases/clases.service';
import { CommonComponent } from '../common/common.component';
import { PreciosService } from '../precios/precios.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent extends CommonComponent implements OnInit {
  respuestaOk: boolean;
  mnjConfirm: boolean = false;
  clases: any = [];
  precios;
  priceExcPlaya;
  priceExcMontana;
  priceClase;
  priceEstablo;
  priceCumple;
  excursionForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    people: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });
  constructor(
    public reservationService: ReservationExcService,
    public clasesService: ClasesService,
    public preciosService: PreciosService,
    protected injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.clasesService.getAllClassesOrderBy().subscribe(
      (rs) => {
        if (rs) {
          this.clases = rs;
        } else {
          this.showMessage('error', 'Error al obtener las clases');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
    this.readPrices();
  }

  reserveExcursion() {
    let name = this.excursionForm.get('name').value;
    let email = this.excursionForm.get('email').value;
    let people = this.excursionForm.get('people').value;
    let date = this.excursionForm.get('date').value;
    let type = this.excursionForm.get('type').value;

    this.reservationService
      .postReservation(name, email, people, date, type)
      .subscribe(
        (rs) => {
          if (rs) {
            this.respuestaOk = rs;
            this.mnjConfirm = true;
          } else {
            this.showMessage('error', 'Error al reservar la excursión');
          }
        },
        (error) => {
          this.showMessage('error', error.error);
        }
      );
  }
  
  readPrices() {
    this.preciosService.getReadAllPrices().subscribe(
      (rs) => {
        if (rs) {
          this.precios = rs;
          this.precios.forEach((precio) => {
            switch (precio.typeService) {
              case 'Excursion Playa':
                this.priceExcPlaya = precio.price;
                break;
              case 'Excursion Montaña':
                this.priceExcMontana = precio.price;
                break;
              case 'Establo':
                this.priceEstablo = precio.price;
                break;
              case 'Clase':
                this.priceClase = precio.price;
                break;
              case 'Fiesta Cumpleaños':
                this.priceCumple = precio.price;
                break;
            }
          });
        } else {
          this.showMessage('error', 'Error al obtener los precios');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }
}
