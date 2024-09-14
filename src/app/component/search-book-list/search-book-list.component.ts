import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bookservice } from '../../services/book.service';
import { categories } from '../../models/category';
import { Book } from '../../models/book';

@Component({
  selector: 'app-search-book-list',
  templateUrl: './search-book-list.component.html',
  styleUrls: ['./search-book-list.component.css'],
})
export class SearchBookListComponent {
  public loaded: boolean = false;
  public bookQuery: string;
  public books: Book[];
  constructor(private route: ActivatedRoute, private bookservice: Bookservice) {
    this.route.params.subscribe((params) => {
      this.bookQuery = params['bookQuery'];
      this.bookservice
        .search(this.bookQuery)
        .then((books) => (this.books = books))
        .finally(() => (this.loaded = true));
    });
  }
}
