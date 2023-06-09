import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  baseUrl: string = 'https://localhost:7089';
  constructor(private http: HttpClient) {}

  public getReadById(id: number) {
    let url = this.baseUrl + `/User/${id}`;
    return this.http.get<any>(url);
  }

  public getReadByIdExtendedAlumno(id: number) {
    let url = this.baseUrl + `/User/userExtendedClasses/${id}`;
    return this.http.get<any[]>(url);
  }

  public getReadMoneyMonthById(id: number) {
    let url = this.baseUrl + `/User/priceForServiceUser/${id}`;
    return this.http.get<any>(url);
  } 
}
