import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  imports: [],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile {
  http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/profile`;

  profileCall() {
    this.http.get(this.apiUrl).subscribe({
      next: (response) => {
        console.log('Profile data:', response);
      },
      error: (error) => {
        console.error('Error fetching profile data:', error);
      }
    });
  }
}
