import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private snack:MatSnackBar, private logService:LoginService, private router:Router) { }
  public dataUserLogin ={
    username : '',
    password : '',
  }
  ngOnInit(): void {
  }
  hide = true;
  formSubmit(){

    if(this.dataUserLogin.username.trim() == "" || this.dataUserLogin.username.trim() == null){
      this.snack.open("Por favor, ingrese el ID del usuario", 'Aceptar',{duration:3000})
      return;
    }

    if(this.dataUserLogin.password.trim() == "" || this.dataUserLogin.password.trim() == null){
      this.snack.open("Por favor, ingrese la contraseña del usuario", 'Aceptar',{duration:3000})
      return;
    }

    this.logService.generateToken(this.dataUserLogin).subscribe(
      (data:any)=>{
        console.log(data);
        this.logService.loginUser(data.token);
        this.logService.getCurrentUser().subscribe((user:any)=>{
          this.logService.setUser(user);
          console.log(user);
          if (this.logService.getUserRol() == 'Admin'){
            this.router.navigate(["/admin"]);
            this.logService.loginStatusSubject.next(true);
          }else if (this.logService.getUserRol() == 'User'){
            this.router.navigate(["/user"]);
            this.logService.loginStatusSubject.next(true);
          }
        })
      },
      (error) => {
        console.log(error);
        this.snack.open('Detalles inválidos , vuelva a intentar !!','Aceptar',{
          duration:3000
        })
      }
    )
  }
}

