import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GestionService {
  baseUrl: string = 'https://localhost:7089';
  constructor(private http: HttpClient) {}

  public getOwnerById(id) {
    let url = this.baseUrl + `/User/${id}`;
    return this.http.get<any>(url);
  }
  public postNewUser(body: any) {
    let url = `${this.baseUrl}/User`;
    return this.http.post<any>(url, body);
  }

  public readAllUser() {
    let url = `${this.baseUrl}/User`;
    return this.http.get<any>(url);
  }

  public deleteUser(id) {
    let url = `${this.baseUrl}/User/${id}`;
    return this.http.delete<any>(url);
  }

  public readSuggestions() {
    let url = `${this.baseUrl}/Suggestion`;
    return this.http.get<any>(url);
  }
  public readReservas() {
    let url = `${this.baseUrl}/ReservationExc`;
    return this.http.get<any>(url);
  }

  public updateUser(user) {
    let url = this.baseUrl + `/User/${user.userId}`;
    return this.http.put<boolean>(url, user);
  }
}
