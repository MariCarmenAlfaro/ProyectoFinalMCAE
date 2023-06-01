import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {
  baseUrl: string = 'https://localhost:7089';
  constructor(private http: HttpClient) {}

  public getReadAllPrices() {
    var url = this.baseUrl + `/Price`;
    return this.http.get<any[]>(url);
  }
  public postInsertNewService(service) {
    var url = this.baseUrl + `/Price`;
    return this.http.post<any>(url, service);
  }
  public deleteService(id) {
    var url = this.baseUrl + `/Price/${id}`;
    return this.http.delete<any>(url);
  }
  public readServiceById(id) {
    var url = this.baseUrl + `/Price/${id}`;
    return this.http.get<any>(url);
  }
  public updatePrice(price) {
    var url = this.baseUrl + `/Price/${price.priceId}`;
    return this.http.put<any>(url,price);
  }
}
