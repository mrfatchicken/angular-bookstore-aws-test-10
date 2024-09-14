import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  private isAuth: boolean;
  constructor(private router: Router, private auth: AuthenticationService) {
    this.auth.isAuthenticated$.subscribe((result) => (this.isAuth = result));
  }

  canActivate(): boolean {
    if (!this.isAuth) {
      this.router.navigateByUrl('/login').then();
      return false;
    }

    return true;
  }
}
