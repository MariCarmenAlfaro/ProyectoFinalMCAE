import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  baseUrl: string = 'https://localhost:7089';

  constructor(private http: HttpClient) {}

  public getTypesServicesPrice(){
    let url = `${this.baseUrl}/Price`;
      return this.http.get<any>(url) ;
   }
   public getPricePayUser(){
    let url = `${this.baseUrl}/Payment/pricePaymentUser`;
      return this.http.get<any>(url) ;
   }
   
  public getAllPayments(){
    let url = `${this.baseUrl}/Payment`;
      return this.http.get<any>(url) ;
   }

   public createNewPayment(body:any) {
    let url = `${this.baseUrl}/Payment`;
    return this.http.post<any>(url,body) ;
  }

  public updatePayment(body:any) {
    let url = `${this.baseUrl}/Payment/${body.payId}`;
    return this.http.put<any>(url,body) ;
  }
}
