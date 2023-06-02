import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationExcService {
  user
 baseUrl : string = "https://localhost:7089";
  constructor( private http: HttpClient) {
   
   }
  public postReservation( name, email, people, date, type) {
    const url = `${this.baseUrl}/ReservationExc`;
    var reserv={
     reservationName: name,
      emailAddress: email,
      numPeople: people,
      dateExcursion: date,
      excursionType: type    }
    return this.http.post<boolean>(url, reserv);
   }
public readPrices(){
  const url = `${this.baseUrl}/Price`;
  return this.http.get<any>(url);
}
}
