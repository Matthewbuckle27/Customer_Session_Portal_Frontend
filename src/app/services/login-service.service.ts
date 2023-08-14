import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  
  logged =false;
  private loginDataurl;
  user: string | undefined;

  
  
  constructor(private httpConnection:HttpClient){
    this.loginDataurl="../../assets/logindetails.json";
  }


  login():Observable<UserData[]>{
    return this.httpConnection.get<UserData[]>(this.loginDataurl);
  }

  loggedintrue(username1:string){
    this.logged=true;
    this.user=username1;
  }

  logout(){
     this.logged=false;
     localStorage.clear(); 
  }

}

interface UserData {
  username: string;
  password: string;
}
