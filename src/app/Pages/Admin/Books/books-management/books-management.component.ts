import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BooksService } from 'src/app/Services/books.service';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-books-management',
  templateUrl: './books-management.component.html',
  styleUrls: ['./books-management.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BooksManagementComponent implements OnInit {
  booksData: any[] = [];
  booksDelete: any[] = [];
  newBookData = {
    img: '',
    title: '',
    author: '',
    editorial: '',
    dayPublication: '',
    pages: '',
    formats: '',
    isbn: '',
    genreLiterary: '',
    document: '',
    language: '',
    cost: '',
    status: '',
    synopsis: ''
  };
  closeResult = '';
  columnsToDisplay: string[] = ['title','title', 'author', 'editorial', 'dayPublication',
  'pages', 'formats', 'isbn', 'genreLiterary', 'document', 'language', 'cost', 'status', 'synopsis'];
  dataSourceBooks = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private booksServices: BooksService, private snack: MatSnackBar, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.booksServices.getAllBooks().subscribe(
      (data: any) => {
        this.booksData = data;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSourceBooks.paginator = this.paginator;
  }
  formSubmitBook() {
    this.booksServices.addNewBook(this.newBookData).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Nuevo libro agregado',
          showConfirmButton: false,
          timer: 1500
        });
        location.reload();
      }
    );
  }

  deleteByIdBook(id: any) {
    this.booksServices.deleteBookById(id).subscribe(
      () => {
        console.log('Libro eliminado');
        this.snack.open('Libro eliminado', 'Cerrar', {
          duration: 2000,
        });
        this.booksServices.getAllBooks().subscribe(
          (data: any) => {
            this.booksDelete = data;
          }
        );
        location.reload();
      },
      (error) => {
        console.error('Error al eliminar el libro:', error);
        this.snack.open('Error al eliminar el libro', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}