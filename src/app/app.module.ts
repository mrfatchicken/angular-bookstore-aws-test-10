import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { LoginGuard } from './services/loginGuard.service';
import { CategoriesBarComponent } from './component/categories-bar/categories-bar.component';
import { IsSignedInGuardGuard } from './services/is-signed-in-guard.guard';
import { ListBooksComponent } from './component/list-books/list-books.component';
import { CategoryBookListComponent } from './component/category-book-list/category-book-list.component';
import { BestSellerBookListComponent } from './component/best-seller-book-list/best-seller-book-list.component';
import { CartComponent } from './component/cart/cart.component';
import { LoadingSpinnerComponent } from './component/loading-spinner/loading-spinner.component';
import { PastOrderComponent } from './component/past-order/past-order.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { SearchBookListComponent } from './component/search-book-list/search-book-list.component';
import { RatingComponent } from './component/rating/rating.component';

const appRoute: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsSignedInGuardGuard],
  },
  {
    path: 'category/:category',
    component: CategoryBookListComponent,
  },
  {
    path: 'best-seller',
    component: BestSellerBookListComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'past-order',
    component: PastOrderComponent,
  },
  {
    path: 'search/:bookQuery',
    component: SearchBookListComponent,
  },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoute, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    CategoriesBarComponent,
    ListBooksComponent,
    CategoryBookListComponent,
    BestSellerBookListComponent,
    CartComponent,
    LoadingSpinnerComponent,
    PastOrderComponent,
    SearchBarComponent,
    SearchBookListComponent,
    RatingComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
