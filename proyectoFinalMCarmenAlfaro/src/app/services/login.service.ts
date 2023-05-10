import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../entities/userProfile/userProfile.interface';


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
    return this.http.get<UserProfile[]>(
      url
    )
  }

    public authenticateLogin(emailAddress: string, password: string): Observable<UserProfile> {
      const url = `${this.baseUrl}/login?emailAddress=${emailAddress}&password=${password}`;
      
      const body = {
        emailAddress: emailAddress,
        password: password
      };

      return this.http.post<UserProfile>(url, body);
       }
    
  // getUserRole(){
  //   return this.user.role;
  // }
}
