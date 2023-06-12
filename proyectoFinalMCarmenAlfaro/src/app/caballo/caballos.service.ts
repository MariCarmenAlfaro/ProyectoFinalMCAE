import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CaballosService {
  baseUrl: string = 'https://localhost:7089';

  constructor(private http: HttpClient) {}

  public getAllHorses() {
    let url = this.baseUrl + `/Horse`;
    return this.http.get<any[]>(url);
  }

  public getHorseByOnwerId(id) {
    let url = this.baseUrl + `/Horse/owner/${id}`;
    return this.http.get<any[]>(url);
  }

  public createHorse(horse) {
    let url = this.baseUrl + `/Horse`;
    return this.http.post<boolean>(url, horse);
  }

  public updateHorse(horse) {
    let url = this.baseUrl + `/Horse/${horse.horseId}`;
    return this.http.put<boolean>(url, horse);
  }

  public deleteHorse(idHorse) {
    let url = this.baseUrl + `/Horse/${idHorse}`;
    return this.http.delete<boolean>(url);
  }
}
