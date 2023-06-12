import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuBarService {
  baseUrl: string = 'https://localhost:7089';
  constructor(private http: HttpClient) {}

  public getAllMenus(){
    let url = `${this.baseUrl}/MenuBar`;
      return this.http.get<any[]>(url) ;
   }
   public updateMenu(id,menu){
    let url = `${this.baseUrl}/MenuBar/${id}`;
      return this.http.put<boolean>(url, menu) ;
   }
}
