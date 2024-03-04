import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  userData:any=null

  constructor( private login:LoginService) { }

  ngOnInit(): void {
    this.userData = this.login.getUser();
  }

}
