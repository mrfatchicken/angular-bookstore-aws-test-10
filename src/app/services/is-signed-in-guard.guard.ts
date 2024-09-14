import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';

@Injectable({ providedIn: 'root' })
export class IsSignedInGuardGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService) {}
  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated$.pipe(
      take(1),
      map((result: boolean) => {
        console.log(result);
        if (result == true) {
          this.router.navigateByUrl('');
          return false;
        }
        return true;
      })
    );
  }
}
