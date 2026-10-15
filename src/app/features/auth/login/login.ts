import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../../core/auth/login-request';
import { Auth } from '../../../core/auth/auth';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {


  loginForm = new FormGroup({
    userNameOrEmail: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  authService = inject(Auth);

  onLogin() {
    if (this.loginForm.invalid) { console.log('Form is invalid'); return; }
    const request: LoginRequest = this.loginForm.getRawValue();
    this.authService.login(request).subscribe({
      next: (response) => {
        localStorage.setItem('friendbook_token', response.jwt);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

}
