import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const guestGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authService = inject(Auth);

    return authService.isAuthenticated()
        ? router.createUrlTree(['/home']) : true;
};