import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bookservice } from '../../services/book.service';
import { categories } from '../../models/category';
import { Book } from '../../models/book';

@Component({
  selector: 'app-category-book-list',
  templateUrl: './category-book-list.component.html',
})
export class CategoryBookListComponent {
  public loaded: boolean = false;
  public books: Book[];
  public categoryToDisplay: string;

  constructor(private route: ActivatedRoute, private bookService: Bookservice) {
    this.route.params.subscribe((params) => {
      this.loaded = false;
      this.categoryToDisplay = categories[params['category']];
      this.bookService.listBook(this.categoryToDisplay).then((books) => {
        this.books = books;
        this.loaded = true;
      });
    });
  }
}
