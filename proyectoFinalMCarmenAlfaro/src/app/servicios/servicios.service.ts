import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReservationExcService {
  user;
  baseUrl: string = 'https://localhost:7089';
  constructor(private http: HttpClient) {}
  
  public postReservation(name, email, people, date, type) {
    let url = `${this.baseUrl}/ReservationExc`;
    let reserv = {
      reservationName: name,
      emailAddress: email,
      numPeople: people,
      dateExcursion: date,
      excursionType: type,
    };
    return this.http.post<boolean>(url, reserv);
  }
}
