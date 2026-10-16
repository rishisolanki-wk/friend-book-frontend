import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { LoginRequest } from './login-request';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RegisterRequest } from './register-request';


export interface LoginResponse {
    jwt: string;
    email: string;
    name: string;
}
@Injectable({
    providedIn: 'root'
})

export class Auth {

    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/auth/login`;

    login(request: LoginRequest): Observable<LoginResponse> {
        console.log('Auth service initialized with API URL:', this.apiUrl);
        return this.http.post<LoginResponse>(this.apiUrl, request);
    }

    register(request: RegisterRequest) {
        return this.http.post(
            `${environment.apiUrl}/register`,
            request, { responseType: 'text' }
        );
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('friendbook_token');

        if (!token) {
            return false;
        }

        try {
            const payload = token.split('.')[1];

            if (!payload) {
                throw new Error('Invalid JWT');
            }

            const base64 = payload
                .replace(/-/g, '+')
                .replace(/_/g, '/');

            const decoded = JSON.parse(
                atob(base64)
            );

            const expiry = decoded.exp;

            if (typeof expiry !== 'number' || expiry * 1000 <= Date.now()) {
                this.logout();
                return false;
            }

            return true;
        } catch {
            this.logout();
            return false;
        }
    }

    logout(): void {
        localStorage.removeItem('friendbook_token');
    }

}
