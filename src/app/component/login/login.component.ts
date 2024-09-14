import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public authenticated$: Observable<boolean>;
  loginForm: FormGroup;
  loading: boolean;

  constructor(
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.authenticated$ = this.auth.isAuthenticated$;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.auth.login(this.f.email.value, this.f.password.value).then(() => {
      this.loading = false;
      this.router.navigateByUrl('/');
    });
  }
}
