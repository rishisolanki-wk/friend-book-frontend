import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { LoginRequest } from './login-request';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


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

}
