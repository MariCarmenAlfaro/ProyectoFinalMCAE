import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SugerenciasService {
  baseUrl: string = 'https://localhost:7089';
  constructor(private http: HttpClient) {}
  
  public insertSuggestions(comment) {
    let url = `${this.baseUrl}/Suggestion`;
    return this.http.post<boolean>(url, comment);
  }

  public deleteSuggestion(id) {
    let url = `${this.baseUrl}/Suggestion/${id}`;
    return this.http.delete<any>(url);
  }

  public updateSuggestion(id, suggestion) {
    let url = `${this.baseUrl}/Suggestion?id=${id}`;
    return this.http.put<any>(url, suggestion);
  }

  public deleteReserva(id) {
    let url = `${this.baseUrl}/ReservationExc/${id}`;
    return this.http.delete<any>(url);
  }

  public updateReserva(id, reserva) {
    let url = `${this.baseUrl}/ReservationExc/${id}`;
    return this.http.put<any>(url, reserva);
  }
}
