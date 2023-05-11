import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaballosService {
  baseUrl : string = "https://localhost:7089";
  
  constructor(private http: HttpClient) { }

  public getAllHorses(){

    var url= this.baseUrl+`/Horse`;
    return this.http.get<any[]>(
      url
    )
  }

  public deleteHorse(idHorse){
    var url= this.baseUrl+`/Horse/${idHorse}`;
    return this.http.delete<boolean>(
      url
    )
  }
}
