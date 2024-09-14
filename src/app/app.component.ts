import { Component } from '@angular/core';
import Amplify, { API } from 'aws-amplify';
import { categories } from './models/category';
import { AuthenticationService } from './services/authentication.service';
import { Bookservice } from './services/book.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  public authenticated$: Observable<boolean>;

  constructor(
    private auth: AuthenticationService,
    private bookSvc: Bookservice
  ) {
    this.authenticated$ = this.auth.isAuthenticated$;
  }
}
