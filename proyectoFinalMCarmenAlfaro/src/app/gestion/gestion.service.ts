import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  baseUrl: string = 'https://localhost:7089';
  constructor(private http: HttpClient) {}

  public postNewUser(body:any) {
    var url = `${this.baseUrl}/User`;
    return this.http.post<any>(url,body) ;
  }
 
}
