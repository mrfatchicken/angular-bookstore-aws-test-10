import { Component, NgModule } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Bookservice } from '../../services/book.service';
import { categories } from '../../models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isAuthenticated: boolean;
  books = [];
  categoryToQuery: string;
  categoryToDisplay: string;

  constructor(
    private auth: AuthenticationService,
    private bookService: Bookservice,
    private router: Router
  ) {
    this.auth.isAuthenticated$.subscribe(
      (result) => (this.isAuthenticated = result)
    );

    this.categoryToQuery = this.getCategoryToDisplay();
    this.categoryToDisplay = categories[this.categoryToQuery];
    this.bookService.listBook(this.categoryToDisplay).then((books) => {
      console.log(this.categoryToDisplay);
      console.log(books);
      this.books = books.slice(0, 6);
    });
  }

  private getCategoryToDisplay(): string {
    // Convert the object to an array of entries (key-value pairs)
    const categoriesArray = Object.keys(categories);

    // Generate a random index based on the length of the array
    const randomIndex = Math.floor(Math.random() * categoriesArray.length);

    // Retrieve and return the random category (both key and value)
    return categoriesArray[randomIndex]; // [key, value]
  }

  public browseCategory() {
    this.router.navigateByUrl(`/category/${this.categoryToQuery}`);
  }
}
