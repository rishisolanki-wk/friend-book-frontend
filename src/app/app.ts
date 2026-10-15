import { Component, inject, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Profile } from './features/profile/profile/profile';

@Component({
  imports: [RouterOutlet, RouterLink, Profile],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  api = `${environment.apiUrl}/auth/test`;
  private http = inject(HttpClient);
  ngOnInit() {
    this.http.get(this.api, { responseType: 'text' }).subscribe({
      next: (data) => {
        console.log('API is working:', data);
      },
      error: (error) => {
        console.error('API is not working:', error);
      }
    });
  }
}
