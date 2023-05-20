import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  baseUrl: string = 'https://localhost:7089';

  constructor(private http: HttpClient) {}

  public getTypesServicesPrice(){
    var url = `${this.baseUrl}/Price`;
      return this.http.get<any>(url) ;
   }
   public getPricePayUser(){
    var url = `${this.baseUrl}/precioPagoUser`;
      return this.http.get<any>(url) ;
   }
   
  public getAllPayments(){
    var url = `${this.baseUrl}/Payment`;
      return this.http.get<any>(url) ;
   }

   public createNewPayment(body:any) {
    var url = `${this.baseUrl}/Payment`;
    return this.http.post<any>(url,body) ;
  }

  public updatePayment(body:any) {
    var url = `${this.baseUrl}/Payment/${body.payId}`;
    return this.http.put<any>(url,body) ;
  }

}
