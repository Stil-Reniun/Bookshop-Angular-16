import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import urlbase from './helper';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }
  public addNewUser(user: any) {
    return this.httpClient.post(`${urlbase}/user/register`, user);
  }

  public getAllUsers() {
    const currentUser = this.loginService.getUser();
    const currentUserId = currentUser ? currentUser.idUser : null;
    return this.httpClient.get<any[]>(`${urlbase}/user/AllUsers`).pipe(
      map(users => users.filter(user => user.idUser !== currentUserId))
    );
  }
}
