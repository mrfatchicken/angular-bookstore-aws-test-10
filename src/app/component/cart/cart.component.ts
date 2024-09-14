import { Component, OnInit } from '@angular/core';
import { Bookservice } from '../../services/book.service';
import { Book } from '../../models/book';
import { Order } from '../../models/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  orders: Order[] = [];
  books: { [key: string]: Book } = {};
  isLoaded = false;
  checkingOut = false;

  constructor(private bookService: Bookservice) {}

  ngOnInit() {
    // Load cart orders and book data
    this.loadCart();
  }

  loadCart() {
    this.bookService.listOrderInCart().then((orders) => {
      this.orders = orders;
      if (!this.orders.length) {
        this.isLoaded = true;
      } else {
        orders.forEach((order) => {
          this.bookService.getBook(order.bookId).then((book) => {
            this.books[order.bookId] = book;
            if (Object.keys(this.books).length === this.orders.length) {
              this.isLoaded = true;
            }
          });
        });
      }
    });
  }

  updateQuantity(bookId: string, quantity: number) {
    if (quantity < 1) return;
    this.bookService.changeBookQuantity(bookId, quantity).then(() => {
      const order = this.orders.find((o) => o.bookId === bookId);
      if (order) order.quantity = quantity;
    });
  }

  removeItem(bookId: string) {
    this.isLoaded = false;
    this.bookService
      .removeFromCart(bookId)
      .then(() => {
        this.orders = this.orders.filter((o) => o.bookId !== bookId);
      })
      .finally(() => (this.isLoaded = true));
  }

  getTotalPrice(): number {
    return this.orders.reduce((total, order) => {
      const bookPrice = this.books[order.bookId]?.price || 0;
      return total + bookPrice * order.quantity;
    }, 0);
  }

  checkout() {
    this.bookService.checkout(this.orders).then(() => {
      alert('Checkout successful!');
      this.orders = [];
    });
  }
}
