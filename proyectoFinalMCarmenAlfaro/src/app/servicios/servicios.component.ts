import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationExcService } from '../services/reservation-exc.service';
import { ReservationExc } from '../entities/reservationExc.interface';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent implements OnInit {
  respuestaOk: boolean;
  mnjConfirm:boolean=false;

  excursionForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    people: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });
  constructor(public reservationService: ReservationExcService) {}

  ngOnInit(): void {
    
   
  }

  reservarExcursion() {
    var name = this.excursionForm.get('name').value;
    var email = this.excursionForm.get('email').value;
    var people = this.excursionForm.get('people').value;
    var date = this.excursionForm.get('date').value;
    var type = this.excursionForm.get('type').value;

    this.reservationService
      .postReservation(name, email, people, date, type)
      .subscribe(
        (rs) => {
          this.respuestaOk = rs;
          console.log(rs)
          if(rs == true){
          this.mnjConfirm=true;
     }
        });
        
    
    console.log(this.excursionForm.value);
  }
}
