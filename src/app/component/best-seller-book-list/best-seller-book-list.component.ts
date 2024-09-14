import { Component, OnInit } from '@angular/core';
import { Bookservice } from '../../services/book.service';
import { categories } from '../../models/category';
import { Book } from '../../models/book';

@Component({
  selector: 'app-best-seller-book-list',
  templateUrl: './best-seller-book-list.component.html',
  styleUrls: ['./best-seller-book-list.component.css'],
})
export class BestSellerBookListComponent implements OnInit {
  public books: Book[] = [];
  public loaded: boolean = false;

  constructor(private bookService: Bookservice) {
    this.bookService.getBestSellers().then((bookIds) => {
      bookIds.slice(0, 20).forEach((result) => {
        {
          let bookId = result.replace(/^"(.*)"$/, '$1');
          bookService
            .getBook(bookId)
            .then((book) => this.books.push(book))
            .finally(() => {
              if (this.books.length === 20) {
                this.loaded = true;
              }
            });
        }
      });
    });
  }

  ngOnInit() {}
}
