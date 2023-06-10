import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  baseUrl: string = 'https://localhost:7089';
  constructor(private http: HttpClient) {}
  
  public getOwnerById(id){

    var url= this.baseUrl+`/User/${id}`;
    return this.http.get<any>(
      url
    )
  }
  public postNewUser(body:any) {
    var url = `${this.baseUrl}/User`;
    var rs= this.http.post<any>(url,body) ;
    console.log(rs)
    return rs;
  }
 public readAllUser(){
  var url = `${this.baseUrl}/User`;
    return this.http.get<any>(url) ;
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

// public getHorsesByUserId(userId){
//   var url = `${this.baseUrl}/Horse/owner/${userId}`;
//     return this.http.get<any>(url) ;
//  }


}
