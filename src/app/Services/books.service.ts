import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import urlbase from './helper';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http:HttpClient) { }
  public getAllBooks(){
    return this.http.get(`${urlbase}/books/allBooks`,{
      headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
    });
  }

  public addNewBook(books:any){
    return this.http.post(`${urlbase}/books/add`,books,{
      headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
    });
  }
  public updateBook(books:any){
    return this.http.put(`${urlbase}/books/update`,books,{
      headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
    });
  }
  public getBookById(id:any){
    return this.http.get(`${urlbase}/books/${id}`,{
      headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
    });
  }

  public deleteBookById(id:any){
    return this.http.delete(`${urlbase}/books/delete/${id}`,{
      headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
    });
  }

}
