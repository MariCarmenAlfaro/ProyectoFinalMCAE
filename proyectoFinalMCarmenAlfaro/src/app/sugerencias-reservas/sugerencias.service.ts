import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SugerenciasService {
  baseUrl : string = "https://localhost:7089";
  constructor( private http: HttpClient) {
   
   }
   public deleteSuggestion(id){
    const url = `${this.baseUrl}/Suggestion/${id}`;
    return this.http.delete<any>(url);
  }

  public updateSuggestion(id, suggestion){
    const url = `${this.baseUrl}/Suggestion?id=${id}`;
    return this.http.put<any>(url, suggestion);
  }

  public deleteReserva(id){
    const url = `${this.baseUrl}/ReservationExc/${id}`;
    return this.http.delete<any>(url);
  }

  public updateReserva(id, reserva){
    const url = `${this.baseUrl}/ReservationExc/${id}`;
    return this.http.put<any>(url, reserva);
  }
}
