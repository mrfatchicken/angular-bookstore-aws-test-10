import { Component, OnInit } from '@angular/core';
import { Bookservice } from '../../services/book.service';
import { Book } from '../../models/book';
import { PastOrder } from '../../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-past-order',
  templateUrl: './past-order.component.html',
  styleUrls: ['./past-order.component.css'],
})
export class PastOrderComponent implements OnInit {
  pastOrders: PastOrder[] = [];
  books: { [key: string]: Book } = {};
  isLoaded = false;

  constructor(private bookService: Bookservice, private router: Router) {}

  ngOnInit() {
    // Load past orders and book data
    this.loadPastOrders();
  }

  loadPastOrders() {
    this.bookService
      .getPastOrders()
      .then((orders) => {
        this.pastOrders = orders;

        // Fetch all books for the orders
        orders.forEach((pastOrder) => {
          pastOrder.books.forEach((order) => {
            this.bookService.getBook(order.bookId).then((book) => {
              this.books[order.bookId] = book;
            });
          });
        });
      })
      .finally(() => (this.isLoaded = true));
  }

  buyAgain(bookId: string, price: number) {
    this.bookService.addToCart(bookId, price).then(() => {
      this.router.navigateByUrl('cart').finally(() => (this.isLoaded = true));
    });
  }
}
