import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  userData: any[] = [];
  displayedColumns: string[] = ['#','Nombres', 'Apellidos', 'ID', 'Email', 'Teléfono', 'Perfil', 'Acciones'];
  dataSourceUser = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(
      (data: any[]) => {
        this.userData = data;
        this.dataSourceUser.data = this.userData;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSourceUser.paginator = this.paginator;
  }
}