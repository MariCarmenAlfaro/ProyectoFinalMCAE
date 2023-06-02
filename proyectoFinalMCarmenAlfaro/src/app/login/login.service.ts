import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  user
  showModal
 baseUrl : string = "https://localhost:7089";
  constructor( private http: HttpClient) {
   
   }
  public getAllUsers(){

    var url= this.baseUrl+`/User`;
    return this.http.get<any[]>(
      url
    )
  }

    public authenticateLogin(emailAddress: string, password: string): Observable<any> {
      const url = `${this.baseUrl}/login?emailAddress=${emailAddress}&password=${password}`;
      
      const body = {
        emailAddress: emailAddress,
        password: password
      };

      return this.http.post<any>(url, body);
       }

}
