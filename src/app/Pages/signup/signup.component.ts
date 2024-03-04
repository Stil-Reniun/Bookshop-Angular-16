import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  images = [944, 1011, 984].map((n) => ``);
  defaultProfileImageURL = 'https://res.cloudinary.com/dxrn8ww6t/image/upload/v1670737965/MongoDB/1630688249876_mzmn3p.jpg';
  public userFormData  = {
    username:'',
    password:'',
    name:'',
    lastName:'',
    email:'',
    phone:'',
    perfil: '',
    img: '',
  }
  hide = true;
  constructor(private usersService:UsersService, private snack:MatSnackBar,private router: Router) { }
  ngOnInit(): void {
  }
  formRegisterSubmit(): void {
    if (!this.userFormData.img) {
      this.userFormData.img = this.defaultProfileImageURL;
    }

    if (!this.userFormData.username.trim()) {
      this.snack.open('El nombre del usuario es requerido', 'Aceptar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      return;
    }

    this.usersService.addNewUser(this.userFormData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario Registrado', 'Usuario Guardado Correctamente', 'success');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        if (error && error.error && error.error.message === this.userFormData.username)   {
          this.snack.open('El nombre de usuario ya está registrado. Por favor, elija otro.', 'Aceptar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
        } else {
          this.snack.open('Error al registrar, vuelva a intentar !!', 'Aceptar', {
            duration: 3000
          });
        }
      }
    );
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Ingrese su correo electrónico';
    }
    return this.email.hasError('email') ? 'Formato de Email no valido' : '';
  }
  cancelRegister(){
    this.router.navigate(['/login']);
  }
}
