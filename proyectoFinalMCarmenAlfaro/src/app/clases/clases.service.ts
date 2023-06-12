import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  baseUrl : string = "https://localhost:7089";
  
  constructor(private http: HttpClient) { }

  public getAllClassesByLevel(level){
    let url= this.baseUrl+`/Class/filterByLevel?classLevel=${level}`;
    return this.http.get<any[]>(
      url
    )
  }

  public getAllClassesOrderBy(){
    let url= this.baseUrl+`/Class/orderBy`;
    return this.http.get<any[]>(
      url
    )
  }
  
  public getUsersByClassId(classDay: string, classHour: string) {
    let url = this.baseUrl + `/Class/userByClassId?classDay=${classDay}&classHour=${classHour}`;
    return this.http.get<any[]>(url);
  }
  public deleteClassUser(id){
    let url= this.baseUrl+`/ClassUser/${id}`;
    return this.http.delete<boolean>(
      url
    )
  }

  public insertUserToClass(ClassUser){
    let url= this.baseUrl+`/ClassUser`;
    return this.http.post<boolean>(
      url, ClassUser
    )
  }
}
