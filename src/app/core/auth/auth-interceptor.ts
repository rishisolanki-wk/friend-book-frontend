import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(Auth);
  const router = inject(Router);

  const token = localStorage.getItem('friendbook_token');

  const publicUrls = ['/auth/login', '/register'];
  const isPublicApi = publicUrls.some(url => req.url.includes(url));

  const authReq = token && !isPublicApi
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isPublicApi) {
        authService.logout();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
