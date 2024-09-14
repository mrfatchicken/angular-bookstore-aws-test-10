import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  public authenticated$: Observable<boolean>;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.authenticated$ = this.auth.isAuthenticated$;
  }

  logout(): void {
    this.auth.logout().then(() => this.router.navigateByUrl('/login'));
  }
}
