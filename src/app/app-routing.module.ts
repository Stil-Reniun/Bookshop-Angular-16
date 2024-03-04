import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './Pages/index/index.component';
import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AdminComponent } from './Pages/Admin/admin/admin.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { PerfilComponent } from './Pages/Admin/perfil/perfil.component';
import { UsersComponent } from './Pages/Admin/users/users.component';
import { BooksManagementComponent } from './Pages/Admin/Books/books-management/books-management.component';
import { BooksEditComponent } from './Pages/Admin/Books/books-edit/books-edit.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: IndexComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'signup', component: SignupComponent, pathMatch: 'full'},



  {path: 'admin', component: DashboardComponent,
  children:[
    {
      path: '', component: AdminComponent,
    },

    {
      path: 'sidebar', component: SidebarComponent,
    },

    {
      path : 'perfil' ,component : PerfilComponent,
    },

    {
      path : 'users' , component : UsersComponent,
    },

    {
      path : 'books' , component : BooksManagementComponent,
    },

    {
      path : 'books-edit' , component :BooksEditComponent,
    },
  ]},


  {path: '**', component: PageNotFoundComponent, pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
