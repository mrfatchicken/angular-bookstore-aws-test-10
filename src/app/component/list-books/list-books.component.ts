import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { Bookservice } from '../../services/book.service';
import { categories } from '../../models/category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css'],
})
export class ListBooksComponent {
  @Input() books: Book[];
  public loaded = true;

  constructor(private bookService: Bookservice, private router: Router) {}

  public addToCart(book: Book) {
    this.loaded = false;
    this.bookService.addToCart(book.id, book.price).then(() => {
      this.router.navigateByUrl('cart').finally(() => (this.loaded = true));
    });
  }
}
