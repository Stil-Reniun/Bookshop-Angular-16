import { Injectable } from '@angular/core';
import urlbase from './helper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();
  constructor(private httpClient:HttpClient) {
  }
  public generateToken (datalogin:any){
    return this.httpClient.post(`${urlbase}/authentication/generateToken`,datalogin);
  }
  public loginUser (token:any){
    localStorage.setItem('token',token);
    return true;
  }
  public getCurrentUser (){
    return this.httpClient.get(`${urlbase}/authentication/userloggin`,{
      headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
  });
  }
  public getToken(){
    localStorage.getItem('token')
  }
  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if (userStr != null){
      return JSON.parse(userStr);
    }else{
        this.logout();
        return null
    }
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public isloggin (){
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == null || tokenStr == undefined || tokenStr == ''){
      return false;
    }else{
      return true;
    }
  }

  public getUserRol(){
    let userrol = this.getUser();
    return userrol.authorities[0].authority;
  }
}
