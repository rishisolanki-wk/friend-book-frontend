import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/auth/auth';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {


  authService = inject(Auth);
  router = inject(Router);

  registerForm = new FormGroup({
    userName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    mobile: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    gender: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    console.log("Form Data:", this.registerForm.getRawValue());
    const formData = this.registerForm.getRawValue();
    this.authService.register(formData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
      }
    });
  }

}
