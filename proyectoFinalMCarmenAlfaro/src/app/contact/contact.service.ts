import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl : string = "https://localhost:7089";
  constructor( private http: HttpClient) {
   
   }

}


