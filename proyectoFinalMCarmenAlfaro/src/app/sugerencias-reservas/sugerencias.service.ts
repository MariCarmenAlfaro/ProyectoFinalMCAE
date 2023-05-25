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
    const url = `${this.baseUrl}/Suggestion${id}`;
    return this.http.delete<any>(url);
  }

  public updateSuggestion(suggestion){
    const url = `${this.baseUrl}/Suggestion`;
    return this.http.delete<any>(url, suggestion);
  }
}
