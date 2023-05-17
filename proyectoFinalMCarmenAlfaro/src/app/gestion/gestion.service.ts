import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
 public readAllUser(){
  var url = `${this.baseUrl}/User`;
    return this.http.get<any>(url) ;
 }

 public getTypesServicesPrice(){
  var url = `${this.baseUrl}/Price`;
    return this.http.get<any>(url) ;
 }

 public createNewPayment(body:any) {
  var url = `${this.baseUrl}/Payment`;
  return this.http.post<any>(url,body) ;
}
public deleteUser(id){
var url = `${this.baseUrl}/User/${id}`;
return this.http.delete<any>(url) ;
}
public readSuggestions(){
  var url = `${this.baseUrl}/Suggestion`;
    return this.http.get<any>(url) ;
 }
 public readReservas(){
  var url = `${this.baseUrl}/ReservationExc`;
    return this.http.get<any>(url) ;
 }

 public updateUser(user){
  var url= this.baseUrl+`/User/${user.userId}`;
  return this.http.put<boolean>(
    url,user
  )
}

public getHorsesByUserId(userId){
  var url = `${this.baseUrl}/Horse/owner/${userId}`;
    return this.http.get<any>(url) ;
 }


}
