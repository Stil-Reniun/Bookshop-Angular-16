import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nadvar',
  templateUrl: './nadvar.component.html',
  styleUrls: ['./nadvar.component.css']
})
export class NadvarComponent implements OnInit {
  isloginEst=false;
  user:any=null;
  constructor(private login:LoginService, private router: Router) { }

  ngOnInit(): void {
    this.isloginEst = this.login.isloggin();
    this.user = this.login.getUser();
    console.log(this.isloginEst);
    console.log(this.user);
    this.login.loginStatusSubject.asObservable().subscribe(data =>{
      this.isloginEst = this.login.isloggin();
      this.user = this.login.getUser();
      console.log(this.isloginEst);
    })
  }

  public logout(){
    this.login.logout();
    window.location.reload();
    window.location.href = '/';
  }


  isUser(): boolean {
    return this.login.getUserRol() === 'User';
  }
  isAdmin(): boolean {
    return this.login.getUserRol() === 'Admin';
  }

}
