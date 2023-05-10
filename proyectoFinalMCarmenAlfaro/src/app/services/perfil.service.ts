import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../entities/userProfile/userProfile.interface';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  baseUrl : string = "https://localhost:7089";
  constructor(private http: HttpClient) { }

public getReadById(id: number){
  var url= this.baseUrl+`/User/${id}`;
    return this.http.get<UserProfile>(
      url
    )
}

}
